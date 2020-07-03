import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {MenuOptions} from '@drop-shipping/shared/models/public-api';
import * as objectPath from 'object-path';

declare var KTMenu;

@Directive({
  selector: '[ktMenu]',
  exportAs: 'ktMenu'
})
export class MenuDirective implements AfterViewInit {
  @Input() options: MenuOptions;
  private menu: any;
  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.setupOptions();
    this.menu = new KTMenu(this.el.nativeElement, this.options);
  }

  private setupOptions() {
    // init aside menu
    let menuDesktopMode = 'accordion';
    if (this.el.nativeElement.getAttribute('data-ktmenu-dropdown') === '1') {
      menuDesktopMode = 'dropdown';
    }

    if (typeof objectPath.get(this.options, 'submenu.desktop') === 'object') {
      objectPath.set(this.options, 'submenu.desktop', menuDesktopMode);
    }
  }

}
