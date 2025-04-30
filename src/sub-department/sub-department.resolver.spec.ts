import { Test, TestingModule } from '@nestjs/testing';
import { SubDepartmentResolver } from './sub-department.resolver';
import { SubDepartmentService } from './sub-department.service';

describe('SubDepartmentResolver', () => {
  let resolver: SubDepartmentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubDepartmentResolver, SubDepartmentService],
    }).compile();

    resolver = module.get<SubDepartmentResolver>(SubDepartmentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
