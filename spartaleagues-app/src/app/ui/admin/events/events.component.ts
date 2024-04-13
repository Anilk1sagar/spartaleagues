import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PostService } from '../../../services/api/post.service';

@Component({
	selector: 'app-events',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

	name: String;
	description: String;
	gameName: String;
	location: String;
	singlePlayerMode: Number;
	multiPlayerMode: Number;
	date: String;

	constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService, private postService: PostService, private router: Router) { }

	ngOnInit() {
	}

	// =====================   Upload Competetions ==============================//
	onCompetetionSubmit() {
		// Animating Login button
		var compi_btn = document.getElementById('compi_btn');
		compi_btn.innerHTML = "<i class='fa fa-circle-notch fa-spin'></i> Uploading Competetion..";

		let entryFees = {
			singlePlayerMode: this.singlePlayerMode,
			multiPlayerMode: this.multiPlayerMode
		}

		let eventModel = {
			competetionName: this.name,
			competetionDescription: this.description,
			competetionGameName: this.gameName,
			competetionLocation: this.location,
			competetionEntryFees: entryFees,
			competetionDate: this.date
		}

		//Required Fields
		if(!this.validateService.validateCompetetion(eventModel)) {
			const err = this.validateService.err;
			this.flashMessage.show(err, {cssClass: 'flashMeassage-danger', timeout: 3000});
			compi_btn.innerHTML = "Upload Competetion";
			return false;
		}

		console.log(eventModel);

		// Upload Post
		this.postService.addCompetetion(eventModel).subscribe(data => {
			if(data.success) {
				compi_btn.innerHTML = "Upload Competetion";
				this.flashMessage.show(data.msg, {cssClass: 'flashMeassage-success', timeout: 3000});
				// Clear Fields after Upload
				this.name = null;
				this.description = null;
				this.gameName = null;
				this.location = null;
				this.singlePlayerMode = null;
				this.multiPlayerMode = null;
				this.date = null;
				//this.router.navigate(['/dashboard']);
			} else {
				this.flashMessage.show(data.msg, {cssClass: 'flashMeassage-danger', timeout: 3000});
				compi_btn.innerHTML = "Upload Competetion";
			}
		});
	}

}
