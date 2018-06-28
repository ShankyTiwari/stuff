import { TestBed, inject } from '@angular/core/testing';

import { NgMaterialMultilevelMenuService } from './ng-material-multilevel-menu.service';

describe('NgMaterialMultilevelMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgMaterialMultilevelMenuService]
    });
  });

  it('should be created', inject([NgMaterialMultilevelMenuService], (service: NgMaterialMultilevelMenuService) => {
    expect(service).toBeTruthy();
  }));
});
