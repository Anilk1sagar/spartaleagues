import { Component, OnInit } from '@angular/core';
import { UserService, AuthService } from '../../../services/api';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../../services/validate.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

	email: String;
	key: String;
	reset: String;

	constructor(private userService: UserService, 
		private authService: AuthService, 
		private validateService: ValidateService, 
		private router: Router,
		private flashMessage:FlashMessagesService) {

    	if(this.authService.loggedIn()) {
			this.router.navigate(['/']);
		}
  	}

	ngOnInit() {}

	// Sending Email for Password reset
	onResetPasswordSubmit() {
		// Animating Login button
		var reset_btn = document.getElementById('reset_btn');
		reset_btn.innerHTML = "<i class='fa fa-circle-notch fa-spin'></i> Sending...";


		// Required Fields
		if(!this.validateService.validateResetPassword(this.email)) {
			this.flashMessage.show('Please fill in all fields!', {cssClass: 'flashMeassage-danger', timeout: 3000});
			reset_btn.innerHTML = "Send password reset email";
			return false;
		}

		// Validate Email
		if(!this.validateService.validateEmail(this.email)) {
			this.flashMessage.show('Please use a valid email!', {cssClass: 'flashMeassage-danger', timeout: 3000});
			reset_btn.innerHTML = "Send password reset email";
			return false;
		}

		this.userService.resetPassword(this.email).subscribe(data => {
			// Displaying result
			if(data.success) {
				reset_btn.innerHTML = "Send password reset email";
				this.flashMessage.show('Email Sent!', {cssClass: 'flashMeassage-success', timeout: 3000});
				this.router.navigate(['/login']);
			} else {
				reset_btn.innerHTML = "Send password reset email";
				this.flashMessage.show(data.msg, {cssClass: 'flashMeassage-danger', timeout: 5000});
				this.router.navigate(['login']);
			}
		});
	}

}
