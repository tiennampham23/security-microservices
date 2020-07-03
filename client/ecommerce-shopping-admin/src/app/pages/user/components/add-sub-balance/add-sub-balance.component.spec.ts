import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubBalanceComponent } from './add-sub-balance.component';

describe('AddSubBalanceComponent', () => {
  let component: AddSubBalanceComponent;
  let fixture: ComponentFixture<AddSubBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
