import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class UpdateDepartmentInput {
  @Field()
  @IsNotEmpty()
  @MinLength(2, {
    message: 'Department name must be at least 2 characters long',
  })
  name: string;
}
