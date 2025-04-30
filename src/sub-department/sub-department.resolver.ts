import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { SubDepartmentService } from './sub-department.service';
import { SubDepartment } from '../department/entities/sub-department.entity';
import { CreateSubDepartmentInput } from './dto/create-sub-department.input';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';

@Resolver(() => SubDepartment)
export class SubDepartmentResolver {
  constructor(private readonly subDepartmentService: SubDepartmentService) {}

  @Mutation(() => SubDepartment)
  @UseGuards(GqlAuthGuard)
  createSubDepartment(
    @Args('createSubDepartmentInput')
    createSubDepartmentInput: CreateSubDepartmentInput,
  ): Promise<SubDepartment> {
    return this.subDepartmentService.createSubDepartment(
      createSubDepartmentInput,
    );
  }

  @Query(() => [SubDepartment], { name: 'findAllSubDepartments' })
  @UseGuards(GqlAuthGuard)
  findAllSubDepartments(): Promise<SubDepartment[]> {
    return this.subDepartmentService.findAllSubDepartments();
  }

  @Query(() => [SubDepartment], { name: 'findSubDepartmentsByDepartmentId' })
  @UseGuards(GqlAuthGuard)
  findSubDepartmentsByDepartmentId(
    @Args('departmentId', { type: () => Int }) departmentId: number,
  ): Promise<SubDepartment[]> {
    return this.subDepartmentService.findSubDepartmentsByDepartmentId(
      departmentId,
    );
  }

  @Query(() => SubDepartment, { name: 'findSubDepartmentById' })
  @UseGuards(GqlAuthGuard)
  findSubDepartmentById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<SubDepartment> {
    return this.subDepartmentService.findSubDepartmentById(id);
  }

  @Mutation(() => SubDepartment)
  @UseGuards(GqlAuthGuard)
  updateSubDepartment(
    @Args('updateSubDepartmentInput')
    updateSubDepartmentInput: UpdateSubDepartmentInput,
  ): Promise<SubDepartment> {
    return this.subDepartmentService.updateSubDepartment(
      updateSubDepartmentInput.id,
      updateSubDepartmentInput,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  deleteSubDepartment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.subDepartmentService.deleteSubDepartment(id);
  }
}
