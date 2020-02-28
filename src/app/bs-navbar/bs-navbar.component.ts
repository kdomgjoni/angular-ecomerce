import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from './../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(private auth: AuthService, private shoppingCartSerevice: ShoppingCartService) { 
    
  }

  async ngOnInit(){
      //Subcribe user here and we dont have to use the pipe in template
      this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
      
      let cart$ = await this.shoppingCartSerevice.getCart();
      
      cart$.subscribe(cart => {
        this.shoppingCartItemCount = 0;
        
        for (let productId in cart.items){
          this.shoppingCartItemCount += cart.items[productId].quantity;
        }
      });
  }
  logout(){
  	this.auth.logout();
  }
}
