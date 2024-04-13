import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	constructor(private flashMessage: FlashMessagesService) {

	}

	ngOnInit() {

		this.flashMessage.show("Website is in Maintenance condition!!", {cssClass: 'flashMeassage-danger', timeout: 5000});

	}
}
