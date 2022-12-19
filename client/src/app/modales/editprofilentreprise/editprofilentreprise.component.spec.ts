import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofilentrepriseComponent } from './editprofilentreprise.component';

describe('EditprofilentrepriseComponent', () => {
  let component: EditprofilentrepriseComponent;
  let fixture: ComponentFixture<EditprofilentrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditprofilentrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditprofilentrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
