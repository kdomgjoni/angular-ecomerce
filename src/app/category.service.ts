import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Product } from './models/products';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { 
  }
  // getCategories() {
  //   return this.db.list('/categories').valueChanges();
    
  // }
  getCategories() : Observable<Product[]>{  return this.db.list('/categories').snapshotChanges().pipe(
    map(changes => 
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Product }))
    )
  );
  }
}
