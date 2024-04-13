import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PaymentService, PostService, ParticipateService } from '../../../../services/api';
import { LocalStorageService, ValidateService } from '../../../../services';
import { Competetion } from '../../../../models';

@Component({
  selector: 'app-csgo',
  templateUrl: './csgo.component.html',
  styleUrls: ['./csgo.component.scss']
})
export class CsgoComponent implements OnInit {

	_selectedPlayerMode: String;

	competetion: any;
	totalTeams: any;

	teamName: String;
	phone: Number;
	PlayerMode: String = 'multiPlayerMode';
	email: string;
	_emails: string[] = [];


	constructor(private validateService: ValidateService, private router: Router, private flashMessage:FlashMessagesService, private paymentS: PaymentService, private postService: PostService, private participateS:ParticipateService, private localSS: LocalStorageService) {
		
		//Get Competetion
		this.postService.getCompetetion().subscribe(data => {

			console.log(data);

			this.competetion = this.filterData(data, 'CS:GO', 1)[0];

			console.log(this.competetion);
			
			// Store Copetetion Data into Local Storage
			this.localSS.storeCompetetion(this.competetion);
		});


		//Get Teams
		this.participateS.getTeams().subscribe(teams => {
			console.log("Teams: ",teams);

			if(teams.length == 0) {
				console.log("No teams Found!");
				this.totalTeams = 0;
			} else {
				this.totalTeams = this.filterData(teams, 'CS:GO', 1).length;
			}
		});
	}

	ngOnInit() {
		// Initializing Player Mode
		this.getPlayerMode();
	}

	// Get Player Mode
	getPlayerMode() {
		this._selectedPlayerMode = this.PlayerMode;
		this._emails = [];
		//console.log(this.PlayerMode);
	}


	// Filter Competetion Data
	filterData(pData, pKey: string, pLength): any[] {

		console.log("Filter Data: ",pData, pKey, pLength);

		let count = 0;
		let data = [];

		for(let i = 0; i <= pData.length; i++) {

			let name: string = pData[i].gameName;

			if(name.toLowerCase().includes(pKey.toLowerCase())) {
				count++;

				data.push(pData[i]);

				if(count == pLength){

					return data;
				}
				
			}

		}
		
		return data;
	}

	// Add Emails In Array
	addEmails() {

		if(this.email != undefined) {

			// Validate Emails
			if(!this.validateService.validateEmail(this.email)) {
		
				this.dangerAlert("Please use a valid email");
				return false;
			}

			if(this._emails.length <5) {

				for(let i = 0; i < this._emails.length; i++){
					if(this._emails[i] == this.email) {
						this.dangerAlert("Email Already Added!");
						return false;
					}
				}

				//Add Email in Array
				this._emails.unshift(this.email);
				
				console.log(this._emails);
				this.email = null;
				
			} else {
				this.dangerAlert('You can not add more than 5 emails');
				return false;
			}
		} else {
			this.dangerAlert('Please fill in Email field!');
			return false;
		}
	}

	// Delete Email From Array
	deleteEmail(email) {
		console.log("Deleted Email: " + email);

		for(let i = 0; i < this._emails.length; i++){
			if(this._emails[i] == email) {
				this._emails.splice(i, 1);
			}
		}

		console.log("Updated Emails: ", this._emails);
	}


	// Check team name avalability
	checkTeamName() {
		// Required Fields
		if(!this.validateService.validateTeamName(this.teamName)) {
			this.dangerAlert('Please fill in all fields!');
			return false;
		}

		this.paymentS.checkTeamName(this.teamName).subscribe(data => {
			if(data.success) {
				this.flashMessage.show(data.msg, {cssClass: 'flashMeassage-success', timeout: 2000});
			} else {
				this.dangerAlert(data.msg);
				return false;
			}
		});
	}


	onParticipateSubmit() {

		this.dangerAlert('We will inform you when we organize event!');

		// // Required Fields
		// if(!this.validateService.validateTeamName(this.teamName)) {
		// 	this.dangerAlert('Please fill in all fields!');
		// 	return false;
		// }

		// this.paymentS.checkTeamName(this.teamName).subscribe(data => {
		// 	if(data.success) {
		// 		const participantUser = {
		// 			mode: this._selectedPlayerMode,
		// 			teamName: this.teamName,
		// 			contact: this.phone,
		// 			emails: this._emails
		// 		}
		
		// 		//console.log(participateUser);
		
		// 		// Required Fields
		// 		if(!this.validateService.validateParticipate(participantUser)) {
		// 			this.flashMessage.show('Please fill in all fields!', {cssClass: 'flashMeassage-danger', timeout: 3000});
		// 			return false;
		// 		}

		// 		// In Single Player Mode
		// 		// if(this._selectedPlayerMode == 'singlePlayerMode') {
		// 		// 	//Add Email in Array
		// 		// 	if(this.email != undefined) {
		// 		// 		this._emails.unshift(this.email);
		// 		// 	} else {
		// 		// 		this.dangerAlert('Please fill in all fields!');
		// 		// 		return false;
		// 		// 	}
		// 		// }
		
		// 		// Check Emails Array is not empty
		// 		if(this._emails.length == 0) {
		// 			this.dangerAlert("Please Add Players Emails!");
		// 			return false;
		// 		}

		// 		console.log(participantUser);

		// 		// Remove Previous added Partcipant user data
		// 		localStorage.removeItem('ParticipateUser');

		// 		// Store New Participant User Data in Local Storage
		// 		this.localSS.storeParticipantUser(participantUser);

		// 		// Redirect To checkout page for payment
		// 		this.router.navigate(['/checkout']);

		// 	} else {
		// 		this.dangerAlert(data.msg);
		// 		return false;
		// 	}
		// });
	}
	

	// Flash Alert
	dangerAlert(msg) {
		this.flashMessage.show(msg, {cssClass: 'flashMeassage-danger', timeout: 4000});
	}

}
