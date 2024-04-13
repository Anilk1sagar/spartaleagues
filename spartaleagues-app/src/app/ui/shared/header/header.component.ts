import { Component, OnInit } from '@angular/core';
import { AuthService, UserService } from '../../../services/api';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ModelUser } from '../../../models';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	user: ModelUser;
	//imgLink: Boolean;

	// Social Icons
	facebook:String = "https://www.facebook.com/spartaleagues/";
	twitter:String = "https://twitter.com/spartaleagues";
	youtube:String = "https://www.youtube.com/channel/UCCTAjknbYCRI2z1RnjZ7zNg";
	insta:String = "https://www.instagram.com/spartaleagues/";

	constructor(public authService: AuthService, private userService: UserService, private router: Router, private flashMessage: FlashMessagesService) {}

	ngOnInit() {
		this.userService.getProfile().subscribe(profile => {

			console.log("User Profile: ", profile);

			this.user = profile;

			// if(profile.imgLink == "" || profile.imgLink == null) {
			// 	this.imgLink = false;
			// } else {
			// 	this.imgLink = true;
			// }
		},
		err => {
			console.log(err);
			return false;
		});
	}

	openNavDrawer() {
		const navbar = document.getElementById('navbar-drawer');
		navbar.style.left = '0px';
  		document.getElementById('overlay').style.display = 'block';
	}

	closeNavDrawer() {
		const navbar = document.getElementById('navbar-drawer');
		navbar.style.left = '-270px';
  		document.getElementById('overlay').style.display = 'none';
	}

	onLogoutClick() {
		this.authService.logout();
		this.flashMessage.show('Logout Successfully!', {cssClass: 'flashMeassage-success', timeout: 3000});
		this.router.navigate(['/login']);
		return false;
	}

}
