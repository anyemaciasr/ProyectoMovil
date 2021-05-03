import { TestBed } from '@angular/core/testing';

import { GestionAnimalService } from './gestion-animal.service';

describe('GestionAnimalService', () => {
  let service: GestionAnimalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionAnimalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
