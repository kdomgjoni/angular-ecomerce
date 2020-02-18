import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent{
  products: Product[] = [];
  filteredProduct: Product[] = [];
  categories$;
  category: string;

  constructor(private productService: ProductService, 
    private categoryService: CategoryService,
    private route: ActivatedRoute) 
    { 
      this.productService.getAll().subscribe(products => this.products = products);
      this.categories$ = this.categoryService.getCategories();

    //We can't use snapshot here becaus the url changes in the DOM so we have to subscribe
      this.route.queryParamMap.subscribe(param => {
        this.category = param.get('category');
        this.filteredProduct = (this.category) ?
          this.products.filter(p => p.category === this.category) : 
          this.products;
        console.log(this.filteredProduct)
      })
  }

}
