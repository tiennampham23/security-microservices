import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router} from '@angular/router';
import {HtmlClassService, LayoutConfigService} from '@drop-shipping/shared/services/public-api';
import {LoadingBarService} from '@ngx-loading-bar/core';
import * as objectPath from 'object-path';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuHeaderDisplay: boolean;
  fluid: boolean;
  @ViewChild('ktHeader', {static: true}) ktHeader: ElementRef;
  constructor(
    private router: Router,
    private layoutConfigService: LayoutConfigService,
    public loader: LoadingBarService,
    public htmlClassService: HtmlClassService
  ) {
    // page progress bar percentage
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // set page progress bar loading to start on NavigationStart event router
        this.loader.start();
      }
      if (event instanceof RouteConfigLoadStart) {
        this.loader.increment(35);
      }
      if (event instanceof RouteConfigLoadEnd) {
        this.loader.increment(75);
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        // set page progress bar loading to end on NavigationEnd event router
        this.loader.complete();
      }
    });
  }

  ngOnInit(): void {
    const config = this.layoutConfigService.getConfig();

    // get menu header display option
    this.menuHeaderDisplay = objectPath.get(config, 'header.menu.self.display');

    // header width fluid
    this.fluid = objectPath.get(config, 'header.self.width') === 'fluid';
  }
}
