import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBusinessComponent } from './product-business.component';

describe('ProductBusinessComponent', () => {
  let component: ProductBusinessComponent;
  let fixture: ComponentFixture<ProductBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
