import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IInputText } from '@app/_core/components/input-text/input-text.component';

describe('InputTextComponent', () => {
  let component: IInputText;
  let fixture: ComponentFixture<IInputText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IInputText],
    }).compileComponents();

    fixture = TestBed.createComponent(IInputText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
