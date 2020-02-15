import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/products';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy{
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;
  constructor(private productService: ProductService) { 
    //We using snapshotChanges to access the ID and values from template
    this.subscription = this.productService.getAll().snapshotChanges().subscribe(products => this.filteredProducts = this.products = products);
  }


  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query)
    ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
    : this.products;
  }

}
