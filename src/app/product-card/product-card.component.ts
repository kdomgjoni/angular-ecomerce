import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/products';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  constructor() { }


}
