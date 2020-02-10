import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-from',
  templateUrl: './product-from.component.html',
  styleUrls: ['./product-from.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  constructor(categoryService: CategoryService, private productService: ProductService) { 
    this.categories$ = categoryService.getCategories();
  }

  save(product){
    this.productService.create(product);
    console.log(product);
  }

  
  ngOnInit() {
  }

}
