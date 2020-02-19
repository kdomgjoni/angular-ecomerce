import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/products';
import { switchMap } from 'rxjs/operators';

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

      this.categories$ = this.categoryService.getCategories();
      //with switchMap we can switch from one observable to another
      this.productService.getAll().pipe(switchMap(products => {
        this.products = products;
        //after first subscribe switch to this one and return the results of secons observable
        return route.queryParamMap;
        }))

        //We can't use snapshot here becaus the url changes in the DOM so we have to subscribe
        .subscribe(param => {
          this.category = param.get('category');
          this.filteredProduct = (this.category) ?
            this.products.filter(p => p.category === this.category) : 
            this.products;
        });
      
      
  }

}
