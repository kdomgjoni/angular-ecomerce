import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }


  canActivate(){
  	return this.auth.user$.pipe(map(user => {
  		if (user) return true;

  		this.router.navigate(['/login']);
  		return false;
  	}));
  }
}
