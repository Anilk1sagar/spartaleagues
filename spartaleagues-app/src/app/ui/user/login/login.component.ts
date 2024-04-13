import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/api/auth.service';
import { ValidateService } from '../../../services/validate.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { moveIn } from '../../../router.animations';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	animations: [moveIn()],
	host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

	// Social Icons
	facebook:String = "https://www.facebook.com/spartaleagues/";
	twitter:String = "https://twitter.com/spartaleagues";
	youtube:String = "https://www.youtube.com/channel/UCCTAjknbYCRI2z1RnjZ7zNg";
	insta:String = "https://www.instagram.com/spartaleagues/";

	email: string;
	password: string;

	constructor(private authService: AuthService, private validateService: ValidateService, private router: Router, private flashMessage:FlashMessagesService) {
		if(this.authService.loggedIn()) {
			this.router.navigate(['/']);
		}
	}

	ngOnInit() {
	}

	onLoginSubmit() {
		// Animating Login button
		var login_btn = document.getElementById('login_btn');
		login_btn.innerHTML = "<i class='fa fa-circle-notch fa-spin'></i> Singing in";

		let userModel = {
			email : this.email,
			password: this.password
		}


		// Required Fields
		if(!this.validateService.validateLogin(userModel)) {
			this.flashMessage.show('Please fill in all fields!', {cssClass: 'flashMeassage-danger', timeout: 3000});
			login_btn.innerHTML = "Sign in";
			return false;
		}

		// Validate Email
		if(!this.validateService.validateEmail(this.email)) {
			this.flashMessage.show('Please use a valid email!', {cssClass: 'flashMeassage-danger', timeout: 3000});
			login_btn.innerHTML = "Sign in";
			return false;
		}


		this.authService.authenticateUser(userModel).subscribe(data => {
			
			console.log("Login User Info: ", data);

			if(data.success) {

				login_btn.innerHTML = "Sign in";
				
				this.authService.storeUserData(data.token, data.user);

				this.flashMessage.show('You are now logged in', {cssClass: 'flashMeassage-success', timeout: 3000});
				this.refresh();	
				this.router.navigate(['/home']);
			} else {

				login_btn.innerHTML = "Sign in";
				this.flashMessage.show(data.msg, {cssClass: 'flashMeassage-danger', timeout: 5000});
				this.router.navigate(['login']);
			}
		});
		
	}


	refresh(): void {
		window.location.reload();
	}

}
