import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private departmentService: DepartmentService) {}

  @Mutation(() => Department)
  @UseGuards(GqlAuthGuard)
  createDepartment(
    @Args('input') createDepartmentInput: CreateDepartmentInput,
  ) {
    return this.departmentService.createDepartment(createDepartmentInput);
  }

  @Query(() => [Department], { name: 'departments' })
  @UseGuards(GqlAuthGuard)
  findAllDepartments() {
    return this.departmentService.findAllDepartments();
  }

  @Query(() => Department, { name: 'department' })
  @UseGuards(GqlAuthGuard)
  findDepartmentById(@Args('id', { type: () => Int }) id: number) {
    return this.departmentService.findDepartmentById(id);
  }

  @Mutation(() => Department)
  @UseGuards(GqlAuthGuard)
  updateDepartment(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') updateDepartmentInput: UpdateDepartmentInput,
  ) {
    return this.departmentService.updateDepartment(id, updateDepartmentInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  deleteDepartment(@Args('id', { type: () => Int }) id: number) {
    return this.departmentService.deleteDepartment(id);
  }
}
