import { TestBed } from '@angular/core/testing';

import { AddLabelToTableService } from './add-label-to-table.service';

describe('AddLabelToTableService', () => {
  let service: AddLabelToTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddLabelToTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
