import {Component} from '@angular/core';
import {ScrollTopOptions} from '@drop-shipping/shared/models/public-api';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent {
  scrollTopOptions: ScrollTopOptions = {
    offset: 300,
    speed: 600
  };

}
