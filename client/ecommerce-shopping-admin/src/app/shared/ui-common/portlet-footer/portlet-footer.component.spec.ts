import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortletFooterComponent } from './portlet-footer.component';

describe('PortletFooterComponent', () => {
  let component: PortletFooterComponent;
  let fixture: ComponentFixture<PortletFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortletFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortletFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
