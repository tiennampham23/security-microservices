import { Component, OnInit } from '@angular/core';
import {CategoryModel} from "../../shared/models/category.model";
import {CategoryService} from "../../shared/https/category.service";
import {takeUntil} from "rxjs/operators";
import {ResponseHttp} from "../../shared/models/response-http.model";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  categories: CategoryModel[];
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories() {
    const categories$ = this.categoryService.loadCategories();
    categories$.subscribe((res: ResponseHttp<CategoryModel[]>) => {
      this.categories = res.data;
    });
  }

}
