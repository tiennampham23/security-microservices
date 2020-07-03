import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {ToggleOptions} from '../models/public-api';

declare var KTToggle;
@Directive({
  selector: '[ktToggle]',
  exportAs: 'ktToggle'
})
export class ToggleDirective implements AfterViewInit{
  @Input() options: ToggleOptions;
  toggle: any;
  constructor(
    private el: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.toggle = new KTToggle(this.el.nativeElement, this.options);
  }

}
