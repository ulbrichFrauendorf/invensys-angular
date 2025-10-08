import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IButton } from './button.component';

describe('IButtonComponent', () => {
  let component: IButton;
  let fixture: ComponentFixture<IButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IButton],
    }).compileComponents();

    fixture = TestBed.createComponent(IButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
