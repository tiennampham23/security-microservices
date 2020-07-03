import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrdersStatusComponent } from './update-orders-status.component';

describe('UpdateOrdersStatusComponent', () => {
  let component: UpdateOrdersStatusComponent;
  let fixture: ComponentFixture<UpdateOrdersStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateOrdersStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrdersStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
