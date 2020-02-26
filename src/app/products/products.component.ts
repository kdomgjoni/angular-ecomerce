import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/products';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  

  products: Product[] = [];
  filteredProduct: Product[] = [];
  categories$;
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
    ) 
    { 

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

    async ngOnInit() {
      this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart);
     }
     
     ngOnDestroy() {
       this.subscription.unsubscribe();
     }

}
