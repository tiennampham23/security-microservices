import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-portlet-footer',
  templateUrl: './portlet-footer.component.html',
  styleUrls: ['./portlet-footer.component.scss']
})
export class PortletFooterComponent implements OnInit {
  @HostBinding('class') classList = 'kt-portlet__foot';
  @Input() class: string;
  ngOnInit() {
    if (this.class) {
      this.classList += ' ' + this.class;
    }
  }

}
