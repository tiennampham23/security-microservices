import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ToggleOptions} from '@drop-shipping/shared/models/public-api';
import {HtmlClassService, LayoutConfigService} from '@drop-shipping/shared/services/public-api';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit, AfterViewInit {
// Public properties
  headerLogo: string;
  headerStickyLogo: string;

  toggleOptions: ToggleOptions = {
    target: 'body',
    targetState: 'kt-aside--minimize',
    togglerState: 'kt-aside__brand-aside-toggler--active'
  };
  constructor(
    private layoutConfigService: LayoutConfigService,
    public htmlClassService: HtmlClassService) {
  }

  ngOnInit(): void {
    this.headerLogo = this.layoutConfigService.getLogo();
    this.headerStickyLogo = this.layoutConfigService.getStickyLogo();
  }

  ngAfterViewInit(): void {
  }
}
