import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecontratComponent } from './createcontrat.component';

describe('CreatecontratComponent', () => {
  let component: CreatecontratComponent;
  let fixture: ComponentFixture<CreatecontratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatecontratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatecontratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
