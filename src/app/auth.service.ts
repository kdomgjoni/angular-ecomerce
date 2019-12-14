import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
	user$: Obserbavble<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
  	this.user$ = afAuth.authState;
  }


  login(){
  	this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout(){
  	this.afAuth.auth.signOut(); 
  }
}
