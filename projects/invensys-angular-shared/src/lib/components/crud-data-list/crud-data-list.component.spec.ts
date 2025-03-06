import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDataListComponent } from './crud-data-list.component';

describe('CrudDataListComponent', () => {
  let component: CrudDataListComponent;
  let fixture: ComponentFixture<CrudDataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudDataListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
