import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilsalarieComponent } from './profilsalarie.component';

describe('ProfilsalarieComponent', () => {
  let component: ProfilsalarieComponent;
  let fixture: ComponentFixture<ProfilsalarieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilsalarieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilsalarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
