import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewentrepriseComponent } from './overviewentreprise.component';

describe('OverviewentrepriseComponent', () => {
  let component: OverviewentrepriseComponent;
  let fixture: ComponentFixture<OverviewentrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewentrepriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewentrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
