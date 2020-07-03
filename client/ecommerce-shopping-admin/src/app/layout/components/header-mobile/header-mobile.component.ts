import {Component, OnInit} from '@angular/core';
import {ToggleOptions} from '@drop-shipping/shared/models/public-api';
import {LayoutConfigService} from '@drop-shipping/shared/services/public-api';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent implements OnInit {
  headerLogo: string;
  asideDisplay: boolean;
  toggleOptions: ToggleOptions = {
    target: 'body',
    targetState: 'kt-header__topbar--mobile-on',
    togglerState: 'kt-header-mobile__toolbar-topbar-toggler--active'
  };

  constructor(private layoutConfigService: LayoutConfigService) { }

  ngOnInit(): void {
    this.headerLogo = this.layoutConfigService.getStickyLogo();
    this.asideDisplay = this.layoutConfigService.getConfig('aside.self.display');
  }

}
