import { AngularFireDatabase, AngularFireObject, AngularFireList} from '@angular/fire/database';
import { FirebaseObjectObservable } from '@angular/fire/database-deprecated';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  //saving a new use object to firebase
  save(user: firebase.User){
  	this.db.object('/users/' + user.uid).update({
  		name: user.displayName,
  		email: user.email
  	});
  }

  //get the user. this method can test if the user is admin or not
  get(uid: string): AngularFireObject<AppUser>{
  	return this.db.object('/users/' + uid);
  }
}
