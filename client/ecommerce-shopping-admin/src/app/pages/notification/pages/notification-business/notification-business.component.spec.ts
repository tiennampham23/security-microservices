import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBusinessComponent } from './notification-business.component';

describe('NotificationBusinessComponent', () => {
  let component: NotificationBusinessComponent;
  let fixture: ComponentFixture<NotificationBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
