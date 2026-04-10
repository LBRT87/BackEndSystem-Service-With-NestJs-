import { Test, TestingModule } from '@nestjs/testing';
import { ManageContentController } from './manage-content.controller';

describe('ManageContentController', () => {
  let controller: ManageContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageContentController],
    }).compile();

    controller = module.get<ManageContentController>(ManageContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
