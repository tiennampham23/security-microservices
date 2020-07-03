import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {ScrollTopOptions} from '@drop-shipping/shared/models/public-api';

declare var KTScrolltop;

@Directive({
  selector: '[ktScrollTop]',
  exportAs: 'ktScrollTop'
})
export class ScrollTopDirective implements AfterViewInit{

  @Input() options: ScrollTopOptions;
  private scrollTop: any;

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.scrollTop = new KTScrolltop(this.el.nativeElement, this.options);
  }
}
