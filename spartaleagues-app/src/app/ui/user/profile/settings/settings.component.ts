import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../../../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

	name: String;
	username: String;
	city: String;
	phone: Number;
	gameRank: String;
	steamProfile: String;
	imgLink: String;
	coverImgLink: String;
	email: String;
	password: String;

	selectedGame: String;
	GameRanks:any;
	csgoGameRanks = [
		{value: 'SILVER 1 (S1)'},
		{value: 'SILVER 2 (S2)'},
		{value: 'SILVER 3 (S3)'},
		{value: 'SILVER 4 (S4)'},
		{value: 'SILVER ELITE (SE)'},
		{value: 'SILVER ELITE MASTER (SEM)'},
		{value: 'GOLD NOVA 1 (GN1)'},
		{value: 'GOLD NOVA 2 (GN2)'},
		{value: 'GOLD NOVA 3 (GN3)'},
		{value: 'GOLD NOVA MASTER (GNM)'},
		{value: 'MASTER GUARDIAN 1 (MG1)'},
		{value: 'MASTER GUARDIAN 2 (MG2)'},
		{value: 'MASTER GUARDIAN ELITE (MGE)'},
		{value: 'DISTINGUISHED MASTER GUARDIAN (DMG)'},
		{value: 'LEGENDARY EAGLE (LE)'},
		{value: 'LEGENDARY EAGLE MASTER (LEM)'},
		{value: 'SUPREME MASTER FIRST CLASS (SMFC)'},
		{value: 'GLOBAL ELITE (GE)'}
	];
	badmintonGameRanks = []

	constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService, private userService: UserService, private router: Router) {

	}

	ngOnInit() {

		this.userService.getProfile().subscribe(profile => {
			// For Updating Pre filled
			this.name = profile.name;
			this.city = profile.city;
			this.phone = profile.phone;
			this.steamProfile = profile.steamProfile;
			this.imgLink = profile.imgLink;
			this.coverImgLink = profile.coverImgLink;
		},
		err => {
			console.log(err);
			return false;
		});
	}

	onUserUpdateSubmit() {
		//Animating Login button
		var update_btn = document.getElementById('update_btn');
		update_btn.innerHTML = "<i class='fa fa-circle-notch fa-spin'></i> Updating...";

		let user = {
			name: this.name,
			city: this.city,
			phone: this.phone,
			steamProfile: this.steamProfile,
			imgLink: this.imgLink,
			coverImgLink: this.coverImgLink,
			password: this.password
		}

		if(this.username) {
			user['username'] = this.username.toString().toLowerCase()
		}
		if(this.gameRank) {
			user['gameRank'] = this.gameRank.toString().toLowerCase()
		}
		if(this.email) {
			user['email'] = this.email.toString().toLowerCase()
		}

		console.log("Updating User Model: ", user);

		// Validate Email
		if(this.email) {
			if(!this.validateService.validateEmail(this.email)) {
				this.dangerAlert('Please use a valid email');
				update_btn.innerHTML = "Update";
				return false;
			}
		}

		// Validate Steam Profile
		if(user.steamProfile) {
			if(!this.validateService.validateSteamProfile(user.steamProfile)) {
				this.dangerAlert('Please use a valid Steam Profile URL');
				update_btn.innerHTML = "Update";
				return false;
			}
		}

		// Update User
		this.userService.updateUser(user).subscribe(data => {
			if(data.success) {

				update_btn.innerHTML = "Update";
				this.flashMessage.show('Your profile updated successfully!', {cssClass: 'flashMeassage-success', timeout: 3000});
				this.refresh();
				
			} else {

				update_btn.innerHTML = "Update";
				this.dangerAlert(data.msg);
				this.router.navigate(['/profile/settings']);
			}
		});
	}
	

	// Change Game Selected Options
	selectGame() {
		//console.log(this.selectedGame);
		if(this.selectedGame == 'None') {
			this.GameRanks = null;
		}
		if(this.selectedGame == 'CS:GO') {
			this.GameRanks = this.csgoGameRanks;
		}
		if(this.selectedGame == 'Badminton') {
			this.GameRanks = this.badmintonGameRanks;
		}

		//console.log(this.GameRanks);
	}

	// Valdation Alert
	dangerAlert(msg) {
		this.flashMessage.show(msg, {cssClass: 'flashMeassage-danger', timeout: 3000});
	}


	refresh(): void {
		window.location.reload();
	}
}
