import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewsalarieComponent } from './overviewsalarie.component';

describe('OverviewsalarieComponent', () => {
  let component: OverviewsalarieComponent;
  let fixture: ComponentFixture<OverviewsalarieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewsalarieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewsalarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
