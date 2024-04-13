import { Component, OnInit } from '@angular/core';
import { AuthService, UserService } from '../../../services/api';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../../services/validate.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

	key: String;
	reset: String;
	password: String;
	confirmPassword: String;

	constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute, private validateService: ValidateService, private router: Router, private flashMessage:FlashMessagesService) { }

	ngOnInit() {
		// Getting parameter
		this.route.params.subscribe(params => {
			this.key = params['key'];
			this.reset = params['reset'];
		});
	}

	// Update Password
	onUpdatePasswordSubmit() {
		// Animating Login button
		var update_btn = document.getElementById('update_btn');
		update_btn.innerHTML = "<i class='fa fa-circle-notch fa-spin'></i> Updating...";

		//Check if feilds is not empty
		if(this.password == undefined || this.confirmPassword == undefined) {
			this.flashMessage.show('Please fill in all fields!', {cssClass: 'flashMeassage-danger', timeout: 3000});
			update_btn.innerHTML = "Update Password";
			return false;
		}

		// Check if both passwords same
		if(this.password != this.confirmPassword) {
			this.flashMessage.show('Password should be same in both fields!', {cssClass: 'flashMeassage-danger', timeout: 3000});
			update_btn.innerHTML = "Update Password";
			return false;
		}

		// Checking password length
		if(this.password.length < 8) {
			this.flashMessage.show('Password should be atleast 8 characters long!', {cssClass: 'flashMeassage-danger', timeout: 3000});
			update_btn.innerHTML = "Update Password";
			return false;
		} 

		const user = {
			password: this.password,
			email: this.key
		}

		this.userService.updatePassword(user).subscribe(data => {
			// Displaying result
			if(data.success) {
				update_btn.innerHTML = "Update Password";
				this.flashMessage.show('Password updated successfully! you can sign in now.', {cssClass: 'flashMeassage-success', timeout: 5000});
				this.router.navigate(['/login']);
			} else {
				update_btn.innerHTML = "Update Password";
				this.flashMessage.show(data.msg, {cssClass: 'flashMeassage-danger', timeout: 5000});
				this.router.navigate(['login']);
			}
		});
	}

}
