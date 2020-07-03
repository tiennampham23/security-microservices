import {Component, OnInit, ElementRef, Input, ViewChild} from '@angular/core';
import { LayoutConfigService } from '@drop-shipping/shared/services/public-api';
import { LoadingBarService } from '@ngx-loading-bar/core';
import {PortletBodyComponent} from '../portlet-body/portlet-body.component';
import {PortletHeaderComponent} from '../portlet-header/portlet-header.component';
import {Observable} from 'rxjs';
import {PortletFooterComponent} from '../portlet-footer/portlet-footer.component';

interface PortletOptions {
  test?: any;
}
@Component({
  selector: 'app-portlet',
  templateUrl: './portlet.component.html',
  styleUrls: ['./portlet.component.scss']
})
export class PortletComponent implements OnInit {
  @Input() loading$: Observable<boolean>;
  @Input() options: PortletOptions;
  @Input() class: string;

  @ViewChild('portlet', {static: true}) portlet: ElementRef;

  @ViewChild(PortletHeaderComponent, {static: true}) header: PortletHeaderComponent;
  @ViewChild(PortletBodyComponent, {static: true}) body: PortletBodyComponent;
  @ViewChild(PortletFooterComponent, {static: true}) footer: PortletFooterComponent;

  constructor(private el: ElementRef, public loader: LoadingBarService,
              private layoutConfigService: LayoutConfigService) {
    this.loader.complete();
  }

  ngOnInit() {
  }
}
