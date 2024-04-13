import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/api/contact.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

	name: String;
	email: String;
	message: String;

	// Social Icons
	facebook:String = "https://www.facebook.com/spartaleagues/";
	twitter:String = "https://twitter.com/spartaleagues";
	youtube:String = "https://www.youtube.com/channel/UCCTAjknbYCRI2z1RnjZ7zNg";
	insta:String = "https://www.instagram.com/spartaleagues/";

	constructor(private contactService: ContactService, private validateService: ValidateService, private router: Router, private flashMessage:FlashMessagesService) { }

	ngOnInit() {
	}

	// Contact send message function
	onSendSubmit() {

		var send_btn = document.getElementById('send_btn');
		send_btn.innerHTML = "<i class='fa fa-circle-notch fa-spin'></i> Sending";
		
		const data = {
			name: this.name,
			email: this.email,
			message: this.message
		}

		// Required Fields
		if(!this.validateService.validateContact(data)) {
			this.flashMessage.show('Please fill in all fields!', {cssClass: 'flashMeassage-danger', timeout: 3000});
			send_btn.innerHTML = "Send";
			return false;
		}

		// Validate Email
		if(!this.validateService.validateEmail(data.email)) {
			this.flashMessage.show('Please use a valid email!', {cssClass: 'flashMeassage-danger', timeout: 3000});
			send_btn.innerHTML = "Send";
			return false;
		}

		//console.log(data);
		
		this.contactService.sendEmail(data).subscribe(data => {
			// Displaying result
			if(data.success) {
				this.flashMessage.show('Your Message has been sent successfully!', {cssClass: 'flashMeassage-success', timeout: 3000});
				this.name = null;
				this.email = null;
				this.message = null;
				send_btn.innerHTML = "Send";
			} else {
				this.flashMessage.show(data.msg, {cssClass: 'flashMeassage-danger', timeout: 5000});
			}
		})
	}

	// log(event, str) {
	// 	if (event instanceof MouseEvent) {
	// 		return false;
	// 	}
	// 	console.log('event .... > ', event,str);
	// }

}
