import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
   return this.db.list('/products').push(product);
  }


  //Getting the products form firebase
  getAll(){
    return this.db.list('/products');
  }

  //Getting this products id from firebase
  get(productId){
    return this.db.object('/products/' + productId);
  }

  //Updating the existing product
  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

}
