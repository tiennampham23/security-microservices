import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-display-report-number',
  templateUrl: './display-report-number.component.html',
  styleUrls: ['./display-report-number.component.scss']
})
export class DisplayReportNumberComponent implements OnInit {
  @Input() value: string | number;
  @Input() desc: string;
  constructor() { }

  ngOnInit(): void {
  }

}
