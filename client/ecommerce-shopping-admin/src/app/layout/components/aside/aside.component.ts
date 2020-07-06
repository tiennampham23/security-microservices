import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MenuOptions, OffCanvasOptions} from '@drop-shipping/shared/models/public-api';
import {HtmlClassService, LayoutConfigService} from '@drop-shipping/shared/services/public-api';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import * as objectPath from 'object-path';
import {AuthenticationService} from '@drop-shipping/shared/https/authentication.service';
import {UserLevel} from '@drop-shipping/core/constants/app.constant';
import {MenuConfig} from '@drop-shipping/core/configs/menu.config';
import {Logger} from '@drop-shipping/core/logger/public-api';
import {UserModel} from "@drop-shipping/shared/data-transform-objects/user.model";


declare var KTUtil;

const logger = new Logger('AsideComponent');

@Component({
  selector: 'app-aside-left',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideComponent implements OnInit {
  @ViewChild('asideMenu', {static: true}) asideMenu: ElementRef;
  currentRouteUrl = '';
  insideTm: any;
  outsideTm: any;
  menuCanvasOptions: OffCanvasOptions = {
    baseClass: 'kt-aside',
    overlay: true,
    closeBy: 'kt_aside_close_btn',
    toggleBy: {
      target: 'kt_aside_mobile_toggler',
      state: 'kt-header-mobile__toolbar-toggler--active'
    }
  };

  menuList = [];

  menuOptions: MenuOptions = {
    scroll: null,
    submenu: {
      desktop: {
        default: 'dropdown',
      },
      tablet: 'accordion',
      mobile: 'accordion'
    },

    accordion: {
      expandAll: false
    }
  };

  constructor(
    public htmlClassService: HtmlClassService,
    public layoutConfigService: LayoutConfigService,
    private authService: AuthenticationService,
    private router: Router,
    private render: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.currentRouteUrl = this.router.url.split(/[?#]/)[0];

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.currentRouteUrl = this.router.url.split(/[?#]/)[0];
        this.cdr.markForCheck();
      });

    const config = this.layoutConfigService.getConfig();

    if (objectPath.get(config, 'aside.menu.dropdown')) {
      this.render.setAttribute(this.asideMenu.nativeElement, 'data-ktmenu-dropdown', '1');
      this.render.setAttribute(
        this.asideMenu.nativeElement, 'data-ktmenu-dropdown-timeout',
        objectPath.get(config, 'aside.menu.submenu.dropdown.hover-timeout')
      );
    }

    this.menuList = objectPath.get(new MenuConfig().getMenus, 'aside.items');
  }

  isMenuItemIsActive(item): boolean {
    if (item.submenu) {
      return this.isMenuRootItemIsActive(item);
    }

    if (!item.page) {
      return false;
    }

    return this.currentRouteUrl.indexOf(item.page) !== -1;
  }

  isMenuRootItemIsActive(item): boolean {
    let result = false;

    for (const subItem of item.submenu) {
      result = this.isMenuItemIsActive(subItem);
      if (result) {
        return true;
      }
    }

    return false;
  }

  mouseEnter(e: Event) {
    // check if the left aside menu is fixed
    if (document.body.classList.contains('kt-aside--fixed')) {
      if (this.outsideTm) {
        clearTimeout(this.outsideTm);
        this.outsideTm = null;
      }

      this.insideTm = setTimeout(() => {
        // if the left aside menu is minimized
        if (document.body.classList.contains('kt-aside--minimize') && KTUtil.isInResponsiveRange('desktop')) {
          // show the left aside menu
          this.render.removeClass(document.body, 'kt-aside--minimize');
          this.render.addClass(document.body, 'kt-aside--minimize-hover');
        }
      }, 50);
    }
  }

  mouseLeave(e: Event) {
    if (document.body.classList.contains('kt-aside--fixed')) {
      if (this.insideTm) {
        clearTimeout(this.insideTm);
        this.insideTm = null;
      }

      this.outsideTm = setTimeout(() => {
        // if the left aside menu is expand
        if (document.body.classList.contains('kt-aside--minimize-hover') && KTUtil.isInResponsiveRange('desktop')) {
          // hide back the left aside menu
          this.render.removeClass(document.body, 'kt-aside--minimize-hover');
          this.render.addClass(document.body, 'kt-aside--minimize');
        }
      }, 100);
    }
  }

  getItemCssClasses(item) {
    let classes = 'kt-menu__item';

    if (objectPath.get(item, 'submenu')) {
      classes += ' kt-menu__item--submenu';
    }

    if (!item.submenu && this.isMenuItemIsActive(item)) {
      classes += ' kt-menu__item--active kt-menu__item--here';
    }

    if (item.submenu && this.isMenuItemIsActive(item)) {
      classes += ' kt-menu__item--open kt-menu__item--here';
    }

    // custom class for menu item
    const customClass = objectPath.get(item, 'custom-class');
    if (customClass) {
      classes += ' ' + customClass;
    }

    if (objectPath.get(item, 'icon-only')) {
      classes += ' kt-menu__item--icon-only';
    }

    return classes;
  }

  getItemAttrSubmenuToggle(item) {
    let toggle = 'hover';
    if (objectPath.get(item, 'toggle') === 'click') {
      toggle = 'click';
    } else if (objectPath.get(item, 'submenu.type') === 'tabs') {
      toggle = 'tabs';
    } else {
      // submenu toggle default to 'hover'
    }

    return toggle;
  }

}
