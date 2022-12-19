import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratentrepriseComponent } from './contratentreprise.component';

describe('ContratentrepriseComponent', () => {
  let component: ContratentrepriseComponent;
  let fixture: ComponentFixture<ContratentrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratentrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratentrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
