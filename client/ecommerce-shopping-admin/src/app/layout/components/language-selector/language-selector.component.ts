import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {TranslationService} from '@drop-shipping/shared/services/public-api';
import {NavigationStart, Router} from '@angular/router';
import {LanguageFlag} from '@drop-shipping/shared/models/public-api';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  @HostBinding('class') classes = '';
  @Input() iconType: '' | 'brand';

  language: LanguageFlag;
  languages: LanguageFlag[] = [
    {
      lang: 'en',
      name: 'English',
      flag: './assets/media/flags/260-united-kingdom.svg'
    },
    {
      lang: 'fr',
      name: 'French',
      flag: './assets/media/flags/195-france.svg'
    },
  ];

  constructor(private translationService: TranslationService, private router: Router) {
  }

  ngOnInit() {
    this.setSelectedLanguage();
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.setSelectedLanguage();
      });
  }

  setLanguage(lang) {
    this.languages.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
    console.log(lang);
    this.translationService.setLanguage(lang);
  }

  setSelectedLanguage(): any {
    this.setLanguage(this.translationService.getSelectedLanguage());
  }
}
