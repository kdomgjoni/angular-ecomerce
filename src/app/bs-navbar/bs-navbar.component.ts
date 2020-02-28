import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from './../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService, private shoppingCartSerevice: ShoppingCartService) { 
    
  }

  async ngOnInit(){
      //Subcribe user here and we dont have to use the pipe in template
      this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
      
      this.cart$ = await this.shoppingCartSerevice.getCart();

     
      
  }
  logout(){
  	this.auth.logout();
  }
}
