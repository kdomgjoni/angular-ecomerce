import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { create } from 'domain';
import { Product } from './models/products';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  
  private getCart(cartId){
    this.db.object('/shopping-cart' + cartId);
  }

  //"async - awit" is the same like "then" promises
  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId
    
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    
  }

  // Because the "getOrCreateCartId()" method is observable and return a promise we can use async or "then"
  async addToCart(product: Product){
    const cartId = await this.getOrCreateCartId();
    const item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);

    item$.valueChanges().pipe(take(1))
    .subscribe(item => {
      if (item) {
        item$.update({quantity: item['quantity'] + 1});
      } else {
        item$.set({ product: product, 
          quantity: 1 });
      }
    });

  }
}


