import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of} from 'rxjs';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
	user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    
    //getting the state of the user. This is an Observale.
  	this.user$ = afAuth.authState;
  }


  login(){
    //get the url and save it to local Storage
  	let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  	localStorage.setItem('returnUrl', returnUrl);
    
    
  	this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout(){
  	this.afAuth.auth.signOut(); 
  }

  //We have an observable that returns AppUser Object
  //We are using sitchMap to map a new(other) observable ore to switch to another one
  get appUser$(): Observable<AppUser>{
    return this.user$ 
      .pipe(switchMap(user => {
        //Check if there is a User because will thrwo error for null user.
        if(user) return this.userService.get(user.uid).valueChanges();


        return of(null);
      }));
  }
}
