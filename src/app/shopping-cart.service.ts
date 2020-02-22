import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { create } from 'domain';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private getCart(cartId){
    this.db.object('/shopping-cart' + cartId);
  }

  private async getOrCreateCart(){
    let cartId = localStorage.getItem('cartId');

    if(!cartId){
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return this.getCart(cartId);
    }
    return this.getCart(cartId);
  }
}


