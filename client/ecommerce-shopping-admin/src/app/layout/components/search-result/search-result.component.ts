import {Component, Input} from '@angular/core';
import {SearchResult} from '@drop-shipping/shared/models/public-api';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
  @Input() data: SearchResult[];
  @Input() noRecordText: string;

}
