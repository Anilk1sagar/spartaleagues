import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/api';
import { Router } from '@angular/router';
import { ModelUser } from '../../../models';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	user: ModelUser;
	gameRank: String;

	constructor(private userService: UserService, private router: Router) {}

	ngOnInit() {
		this.userService.getProfile().subscribe(profile => {

			this.user = profile;

			if(profile.gameRank) {
				const str = profile.gameRank; 
				const res = str.slice(0, 17);
				this.gameRank = this.toTitleCase(res);
			}

		},
		err => {

			console.log(err);
			return false;
		});
	}


	// Text To upper case
	toTitleCase(str) {
    	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}

}
