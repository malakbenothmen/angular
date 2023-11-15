import { TestBed } from '@angular/core/testing';

import { ServiceNotesService } from './service-notes.service';

describe('ServiceNotesService', () => {
  let service: ServiceNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
