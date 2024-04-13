import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../../services/api/auth.service';
import { Router } from '@angular/router';
import { moveIn } from '../../../router.animations';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
	animations: [moveIn()],
	host: {'[@moveIn]': ''}
})
export class RegisterComponent implements OnInit {

	// Social Icons
	facebook:String = "https://www.facebook.com/spartaleagues/";
	twitter:String = "https://twitter.com/spartaleagues";
	youtube:String = "https://www.youtube.com/channel/UCCTAjknbYCRI2z1RnjZ7zNg";
	insta:String = "https://www.instagram.com/spartaleagues/";

	name: String;
	username: String;
	email: String;
	password: String;

	constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService, private authService: AuthService, private router: Router) {
		// Redirect if already logged in
		if(this.authService.loggedIn()) {
			this.router.navigate(['/']);
		}
	}

	ngOnInit() {
	}

	onRegisterSubmit() {
		//Animating Login button
		var register_btn = document.getElementById('register_btn');
		register_btn.innerHTML = "<i class='fa fa-circle-notch fa-spin'></i> Registering";

		let userModel = {
			name: this.name,
			password: this.password
		}

		if(this.username) {
			userModel['username'] = this.username.toString().toLowerCase()
		}

		if(this.email) {
			userModel['email'] = this.email.toString().toLowerCase()
		}

		console.log("Register User Model: ", userModel);

		// Required Fields
		if(!this.validateService.validateRegister(userModel)) {
			const err = this.validateService.err;
			this.flashMessage.show(err, {cssClass: 'flashMeassage-danger', timeout: 3000});
			register_btn.innerHTML = "Register";
			return false;
		}

		// Validate Email
		if(!this.validateService.validateEmail(this.email)) {
			this.flashMessage.show('Please use a valid email', {cssClass: 'flashMeassage-danger', timeout: 3000});
			register_btn.innerHTML = "Register";
			return false;
		}


		// Register User
		this.authService.registerUser(userModel).subscribe(data => {

			if(data.success) {
				register_btn.innerHTML = "Register";
				this.flashMessage.show('You are now registered and you can login', {cssClass: 'flashMeassage-success', timeout: 3000});
				//console.log(data.msg);
				this.router.navigate(['/login']);

			} else {
				register_btn.innerHTML = "Register";
				this.flashMessage.show(data.msg, {cssClass: 'flashMeassage-danger', timeout: 3000});
				//console.log(data.msg);
				this.router.navigate(['/register']);
			}
		});
	}

}
