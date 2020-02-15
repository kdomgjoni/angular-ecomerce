import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Product } from './models/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
   return this.db.list('/products').push(product);
  }


  //Getting the products form firebase
  getAll() : Observable<Product[]>{  return this.db.list('/products').snapshotChanges().pipe(
    map(changes => 
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Product }))
    )
  );
  }

  //Getting this products id from firebase
  get(productId){
    return this.db.object('/products/' + productId);
  }

  //Updating the existing product
  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  //delte the product
  delete(productId){
    return this.db.object('/productId' + productId).remove();
  }

}
