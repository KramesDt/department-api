import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(SubDepartment)
    private subDepartmentRepository: Repository<SubDepartment>,
  ) {}

  async createDepartment(
    createDepartmentInput: CreateDepartmentInput,
  ): Promise<Department> {
    const department = this.departmentRepository.create({
      name: createDepartmentInput.name,
    });

    await this.departmentRepository.save(department);

    if (
      createDepartmentInput.subDepartments &&
      createDepartmentInput.subDepartments.length > 0
    ) {
      const subDepts = createDepartmentInput.subDepartments.map((subDept) => {
        return this.subDepartmentRepository.create({
          name: subDept.name,
          department,
        });
      });

      await this.subDepartmentRepository.save(subDepts);
      department.subDepartments = subDepts;
    } else {
      department.subDepartments = [];
    }

    return department;
  }

  async findAllDepartments(): Promise<Department[]> {
    return this.departmentRepository.find({
      relations: ['subDepartments'],
    });
  }

  async findDepartmentById(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return department;
  }

  async updateDepartment(
    id: number,
    updateDepartmentInput: UpdateDepartmentInput,
  ): Promise<Department> {
    const department = await this.findDepartmentById(id);

    department.name = updateDepartmentInput.name;
    await this.departmentRepository.save(department);

    return department;
  }

  async deleteDepartment(id: number): Promise<boolean> {
    const department = await this.findDepartmentById(id);
    await this.departmentRepository.remove(department);
    return true;
  }
}
