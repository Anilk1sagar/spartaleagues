import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/api/auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		//return true;
		if(this.authService.adminAuthentication()) {
			return true;
		} else {
			this.router.navigate(['/']);
			return false;
		}
		
	}
}
