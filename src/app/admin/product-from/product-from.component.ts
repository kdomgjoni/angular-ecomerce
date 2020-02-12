import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-from',
  templateUrl: './product-from.component.html',
  styleUrls: ['./product-from.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  constructor(
    private router: Router,
    private categoryService: CategoryService, 
    private productService: ProductService) { 
    this.categories$ = categoryService.getCategories();
  }

  save(product){
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  
  ngOnInit() {
  }

}
