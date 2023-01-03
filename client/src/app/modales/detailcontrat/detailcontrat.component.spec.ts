import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailcontratComponent } from './detailcontrat.component';

describe('DetailcontratComponent', () => {
  let component: DetailcontratComponent;
  let fixture: ComponentFixture<DetailcontratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailcontratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailcontratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
