import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HtmlClassService, LayoutConfigService, MenuConfigService, PageConfigService} from '@drop-shipping/shared/services/public-api';
import {LayoutConfig, MenuConfig, PageConfig} from '@drop-shipping/core/configs/public-api';
import * as objectPath from 'object-path';
import {AuthenticationService} from '@drop-shipping/shared/https/authentication.service';
import {UserLevel} from '@drop-shipping/core/constants/app.constant';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  selfLayout: string;
  asideDisplay: boolean;
  subheaderDisplay: boolean;
  desktopHeaderDisplay: boolean;
  fitTop: boolean;
  fluid: boolean;

  private unsubscribe: Subscription[] = [];

  constructor(
    private layoutConfigService: LayoutConfigService,
    private menuConfigService: MenuConfigService,
    private htmlClassService: HtmlClassService,
    private pageConfigService: PageConfigService,
    private authService: AuthenticationService
  ) {
    this.layoutConfigService.loadConfigs(new LayoutConfig().configs);
    this.pageConfigService.loadConfigs(new PageConfig().configs);

    // setup element classes
    this.htmlClassService.setConfig(this.layoutConfigService.getConfig());

    const layoutConfigSub = this.layoutConfigService.onConfigUpdated$.subscribe(layoutConfig => {
      document.body.className = '';
      this.htmlClassService.setConfig(layoutConfig);
    });
    this.unsubscribe.push(layoutConfigSub);
  }

  ngOnInit(): void {
    const config = this.layoutConfigService.getConfig();
    this.selfLayout = objectPath.get(config, 'self.layout');
    this.asideDisplay = objectPath.get(config, 'aside.self.display');
    this.subheaderDisplay = objectPath.get(config, 'subheader.display');
    this.desktopHeaderDisplay = objectPath.get(config, 'header.self.fixed.desktop');
    this.fitTop = objectPath.get(config, 'content.fit-top');
    this.fluid = objectPath.get(config, 'content.width') === 'fluid';

    const subscription = this.layoutConfigService.onConfigUpdated$.subscribe(cfg => {
      setTimeout(() => {
        this.selfLayout = objectPath.get(cfg, 'self.layout');
      });
    });
    this.unsubscribe.push(subscription);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

}
