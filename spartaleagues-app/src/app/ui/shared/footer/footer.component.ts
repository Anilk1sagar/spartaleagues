import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/api';
import { Competetion } from '../../../models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	competetion:any;

	// Social Icons
	facebook:String = "https://www.facebook.com/spartaleagues/";
	twitter:String = "https://twitter.com/spartaleagues";
	youtube:String = "https://www.youtube.com/channel/UCCTAjknbYCRI2z1RnjZ7zNg";
	insta:String = "https://www.instagram.com/spartaleagues/";
	
	constructor(private postService: PostService) {
		//Get Competetion
		this.postService.getCompetetion()
		.subscribe(data => {
			this.competetion = data;
		});
	}

	ngOnInit() {
	}

}
