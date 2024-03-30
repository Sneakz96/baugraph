import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployerOverviewComponent } from './employer-overview.component';

describe('EmployerOverviewComponent', () => {
  let component: EmployerOverviewComponent;
  let fixture: ComponentFixture<EmployerOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
