import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ParticipateService } from '../../../services/api/participate.service';
import { LocalStorageService } from '../../../services/localstorage.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

	searchQuery: String;
	users: any;

	constructor(private partiService: ParticipateService, private router: Router, private flashMessage:FlashMessagesService, private localSS: LocalStorageService) {}

	ngOnInit() {
	}

	onSearchPlayerSubmit() {
		//Animating Login button
		var search_btn = document.getElementById('search_btn');
		search_btn.innerHTML = "<i class='fa fa-circle-notch fa-spin'></i> Searching...";

		// Required Fields
		if(this.searchQuery == "" || this.searchQuery == undefined) {
			this.flashMessage.show('Please fill in all fields!', {cssClass: 'flashMeassage-danger', timeout: 3000});
			search_btn.innerHTML = "Search Players";
			return false;
		}

		const user = {
			search: this.searchQuery
		}

		this.partiService.searchUser(user).subscribe(users => {
			if(users.length > 0) {
				search_btn.innerHTML = "Search Players";
				this.users = users;
			} else {
				search_btn.innerHTML = "Search Players";
				this.flashMessage.show('Users Not Found!', {cssClass: 'flashMeassage-danger', timeout: 3000});
			}
		});
	}

	// Send Invite
	sendInvite(event ,toEmail) {
		// Animating Login button
		var invite_btn = document.getElementById(event.target.id);
		event.target.innerHTML = "<i class='fa fa-circle-notch fa-spin'></i> Inviting...";

		const profile = this.localSS.getUser();
		const user = {
			name: profile.name,
			email: profile.email.toLowerCase(),
			gameRank: profile.gameRank,
			steamProfile: profile.steamProfile,
			toEmail: toEmail.toLowerCase()
		}

		this.partiService.sendTeamInvite(user).subscribe(data => {
			if(data.success) {
				event.target.innerHTML = "Invite";
				this.flashMessage.show('Invitation sent successfully!', {cssClass: 'flashMeassage-success', timeout: 3000});
			} else {
				event.target.innerHTML = "Invite";
				this.flashMessage.show(data.msg, {cssClass: 'flashMeassage-danger', timeout: 5000});
			}
		});
	}

}
