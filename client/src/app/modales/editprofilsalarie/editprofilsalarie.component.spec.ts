import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofilsalarieComponent } from './editprofilsalarie.component';

describe('EditprofilsalarieComponent', () => {
  let component: EditprofilsalarieComponent;
  let fixture: ComponentFixture<EditprofilsalarieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditprofilsalarieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditprofilsalarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
