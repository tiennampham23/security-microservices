import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {HeaderOptions} from '@drop-shipping/shared/models/public-api';
import * as objectPath from 'object-path';

declare var KTHeader;

@Directive({
  selector: '[ktHeader]',
  exportAs: 'ktHeader',
})
export class HeaderDirective implements AfterViewInit {
  @Input() options: HeaderOptions = {};
  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.setupOptions();

    const header = new KTHeader(this.el.nativeElement, this.options);
  }

  private setupOptions() {
    this.options = {
      classic: {
        desktop: true,
        mobile: false
      },
    };

    if (this.el.nativeElement.getAttribute('data-ktheader-minimize') == '1') {
      objectPath.set(this.options, 'minimize', {
        desktop: {
          on: 'kt-header--minimize'
        },
        mobile: {
          on: 'kt-header--minimize'
        }
      });
      objectPath.set(this.options, 'offset', {
        desktop: 200,
        mobile: 150
      });
    }
  }

}
