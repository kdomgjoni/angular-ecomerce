import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from './../models/app-user';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  constructor(private auth: AuthService) { 
    //Subcribe user here and we dont have to use the pipe in template
  	auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit(){

  }
  logout(){
  	this.auth.logout();
  }
}
