import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class UpdateSubDepartmentInput {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  id: number;

  @Field({ nullable: true })
  @MinLength(2, {
    message: 'SubDepartment name must be at least 2 characters long',
  })
  name?: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  departmentId?: number;
}
