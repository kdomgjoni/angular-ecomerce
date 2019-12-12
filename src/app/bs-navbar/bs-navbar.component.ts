import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

	user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) { 
  	this.user$ = afAuth.authState;
  	
  }

  ngOnInit(){

  }
  logout(){
  	this.afAuth.auth.signOut(); 
  }
}
