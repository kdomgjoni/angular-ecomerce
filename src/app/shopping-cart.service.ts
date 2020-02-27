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

  
  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges();
  }

  //"async - awit" is the same like "then" promises
  private async getOrCreateCartId(): Promise<String>{
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId
    
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    
  }

  private getItem(cartId, producId){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + producId);

  }

  // Because the "getOrCreateCartId()" method is observable and return a promise we can use async or "then"
  async addToCart(product: Product){
    this.updateItemQuantity(product, 1);

  }

  async removeFromCart(product: Product){
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number){
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$.valueChanges().pipe(take(1))
    .subscribe(item => {
      if (item) {
        item$.update({product: product, quantity: item['quantity'] + change});
      } else {
        item$.set({ product: product, 
          quantity: 1 });
      }
    });
  }
}


