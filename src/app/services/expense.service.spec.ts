import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ExpenseService } from './expense.service';

describe('ExpenseService', () => {
  let service: ExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
