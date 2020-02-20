import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  @Input('category') category;
  categories$;
  constructor(private categoryService: CategoryService) { 
    this.categories$ = this.categoryService.getCategories();
  }

}
