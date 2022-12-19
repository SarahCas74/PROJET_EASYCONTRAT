import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginsalarieComponent } from './loginsalarie.component';

describe('LoginsalarieComponent', () => {
  let component: LoginsalarieComponent;
  let fixture: ComponentFixture<LoginsalarieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginsalarieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginsalarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
