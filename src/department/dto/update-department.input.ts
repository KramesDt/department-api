import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  MinLength,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class SubDepartmentUpdateInput {
  @Field()
  @IsNotEmpty()
  @MinLength(2, {
    message: 'SubDepartment name must be at least 2 characters long',
  })
  name: string;
}

@InputType()
export class UpdateDepartmentInput {
  @Field({ nullable: true })
  @IsOptional()
  @MinLength(2, {
    message: 'Department name must be at least 2 characters long',
  })
  name?: string;

  @Field(() => [SubDepartmentUpdateInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubDepartmentUpdateInput)
  subDepartments?: SubDepartmentUpdateInput[];
}
