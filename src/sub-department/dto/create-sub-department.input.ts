import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateSubDepartmentInput {
  @Field()
  @IsNotEmpty()
  @MinLength(2, {
    message: 'SubDepartment name must be at least 2 characters long',
  })
  name: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  departmentId: number;
}
