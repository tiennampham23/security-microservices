import {Component, OnInit} from '@angular/core';
import {Logger} from '@drop-shipping/core/logger/public-api';

const logger = new Logger('OrderListComponent');

@Component({
  selector: 'app-orders',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
