import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {TransactionModel} from "@drop-shipping/shared/data-transform-objects/transaction.model";

@Component({
  selector: 'app-transaction-timeline',
  templateUrl: './transaction-timeline.component.html',
  styleUrls: ['./transaction-timeline.component.scss']
})
export class TransactionTimelineComponent implements OnInit {
  @Input() transactions: TransactionModel[];
  constructor() { }

  @ContentChild('actionTemplate', {static: true}) actionTemplate: TemplateRef<any>;
  ngOnInit(): void {
  }

}
