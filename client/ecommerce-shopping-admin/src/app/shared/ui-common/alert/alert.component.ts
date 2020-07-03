import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() type: 'primary | accent | warn';
  @Input() duration = 0;
  @Input() showCloseButton = true;
  @Output() close = new EventEmitter<boolean>();
  alertShowing = true;

  ngOnInit() {
    if (this.duration === 0) {
      return;
    }

    setTimeout(() => {
      this.closeAlert();
    }, this.duration);
  }

  closeAlert() {
    this.close.emit();
  }

}
