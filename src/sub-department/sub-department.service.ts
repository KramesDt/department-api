import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubDepartment } from '../department/entities/sub-department.entity';
import { Department } from '../department/entities/department.entity';
import { CreateSubDepartmentInput } from './dto/create-sub-department.input';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';

@Injectable()
export class SubDepartmentService {
  constructor(
    @InjectRepository(SubDepartment)
    private subDepartmentRepository: Repository<SubDepartment>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async createSubDepartment(
    createSubDepartmentInput: CreateSubDepartmentInput,
  ): Promise<SubDepartment> {
    const department = await this.departmentRepository.findOne({
      where: { id: createSubDepartmentInput.departmentId },
    });

    if (!department) {
      throw new NotFoundException(
        `Department with ID ${createSubDepartmentInput.departmentId} not found`,
      );
    }

    // Create and save the sub-department
    const subDepartment = this.subDepartmentRepository.create({
      name: createSubDepartmentInput.name,
      departmentId: createSubDepartmentInput.departmentId,
      department: department,
    });

    return this.subDepartmentRepository.save(subDepartment);
  }

  async findAllSubDepartments(): Promise<SubDepartment[]> {
    return this.subDepartmentRepository.find({
      relations: ['department'],
    });
  }

  async findSubDepartmentsByDepartmentId(
    departmentId: number,
  ): Promise<SubDepartment[]> {
    return this.subDepartmentRepository.find({
      where: { departmentId },
      relations: ['department'],
    });
  }

  async findSubDepartmentById(id: number): Promise<SubDepartment> {
    const subDepartment = await this.subDepartmentRepository.findOne({
      where: { id },
      relations: ['department'],
    });

    if (!subDepartment) {
      throw new NotFoundException(`SubDepartment with ID ${id} not found`);
    }

    return subDepartment;
  }

  async updateSubDepartment(
    id: number,
    updateSubDepartmentInput: UpdateSubDepartmentInput,
  ): Promise<SubDepartment> {
    const subDepartment = await this.findSubDepartmentById(id);

    // Update name
    if (updateSubDepartmentInput.name) {
      subDepartment.name = updateSubDepartmentInput.name;
    }

    //Update department
    if (updateSubDepartmentInput.departmentId) {
      const newDepartment = await this.departmentRepository.findOne({
        where: { id: updateSubDepartmentInput.departmentId },
      });

      if (!newDepartment) {
        throw new NotFoundException(
          `Department with ID ${updateSubDepartmentInput.departmentId} not found`,
        );
      }

      subDepartment.department = newDepartment;
      subDepartment.departmentId = newDepartment.id;
    }

    return this.subDepartmentRepository.save(subDepartment);
  }

  async deleteSubDepartment(id: number): Promise<boolean> {
    const subDepartment = await this.findSubDepartmentById(id);
    await this.subDepartmentRepository.remove(subDepartment);
    return true;
  }
}
