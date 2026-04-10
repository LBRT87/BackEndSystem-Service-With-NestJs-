import { Test, TestingModule } from '@nestjs/testing';
import { ManageContentService } from './manage-content.service';

describe('ManageContentService', () => {
  let service: ManageContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageContentService],
    }).compile();

    service = module.get<ManageContentService>(ManageContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
