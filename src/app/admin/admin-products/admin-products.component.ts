import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$;
  constructor(private productService: ProductService) { 
    //We using snapshotChanges to access the ID and values from template
    this.products$ = productService.getAll().snapshotChanges();
  }

  ngOnInit() {
  }

}
