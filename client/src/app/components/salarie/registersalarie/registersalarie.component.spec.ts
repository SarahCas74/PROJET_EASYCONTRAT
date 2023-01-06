import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistersalarieComponent } from './registersalarie.component';

describe('RegistersalarieComponent', () => {
  let component: RegistersalarieComponent;
  let fixture: ComponentFixture<RegistersalarieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistersalarieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistersalarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
