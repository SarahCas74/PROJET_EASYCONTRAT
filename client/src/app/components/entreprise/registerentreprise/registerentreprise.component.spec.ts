import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterentrepriseComponent } from './registerentreprise.component';

describe('RegisterentrepriseComponent', () => {
  let component: RegisterentrepriseComponent;
  let fixture: ComponentFixture<RegisterentrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterentrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterentrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
