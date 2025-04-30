import { Test, TestingModule } from '@nestjs/testing';
import { SubDepartmentService } from './sub-department.service';

describe('SubDepartmentService', () => {
  let service: SubDepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubDepartmentService],
    }).compile();

    service = module.get<SubDepartmentService>(SubDepartmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
