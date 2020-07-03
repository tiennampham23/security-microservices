import {Component, Input, OnInit, HostBinding} from '@angular/core';

@Component({
  selector: 'app-portlet-body',
  templateUrl: './portlet-body.component.html',
  styleUrls: ['./portlet-body.component.scss']
})
export class PortletBodyComponent implements OnInit {
// Public properties
  @HostBinding('class') classList = 'kt-portlet__body';
  @Input() class: string;

  ngOnInit() {
    if (this.class) {
      this.classList += ' ' + this.class;
    }
  }
}
