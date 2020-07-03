import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {OffCanvasOptions} from '@drop-shipping/shared/models/public-api';

declare var KTOffcanvas;

@Directive({
  selector: '[ktOffCanvas]',
  exportAs: 'ktOffCanvas'
})
export class OffCanvasDirective implements AfterViewInit{
  @Input() options: OffCanvasOptions;
  private offCanvas: any;

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.offCanvas = new KTOffcanvas(this.el.nativeElement, this.options);
    });
  }

}
