import {Component, OnInit} from '@angular/core';
import {Logger} from '@drop-shipping/core/logger/public-api';
import {OrderModel} from '@drop-shipping/shared/data-transform-objects/public-api';
import {MatDialog} from '@angular/material/dialog';
import {OrderDetailComponent} from '../../components/order-detail/order-detail.component';

const logger = new Logger('OrderListComponent');

@Component({
  selector: 'app-orders',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  constructor(
  ) {
  }

  ngOnInit() {
  }
}
