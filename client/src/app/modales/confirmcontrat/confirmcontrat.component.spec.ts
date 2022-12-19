import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmcontratComponent } from './confirmcontrat.component';

describe('ConfirmcontratComponent', () => {
  let component: ConfirmcontratComponent;
  let fixture: ComponentFixture<ConfirmcontratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmcontratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmcontratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
