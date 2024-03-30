import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewEmployersComponent } from './new-employers.component';

describe('NewEmployersComponent', () => {
  let component: NewEmployersComponent;
  let fixture: ComponentFixture<NewEmployersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEmployersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
