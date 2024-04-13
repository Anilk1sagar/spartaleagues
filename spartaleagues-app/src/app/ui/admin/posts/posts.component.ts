import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PostService } from '../../../services/api/post.service';
import { Post } from '../../../models/post';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

	// Interface
	posts: Post[];

	gameName: String;
	heading: String;
	imgLink: String;
	videoLink: String;
	description: String;

	constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService, private postService: PostService, private router: Router) { }

	ngOnInit() {
	}

	
	onPostSubmit() {
		// Animating Login button
		let post_btn = document.getElementById('post_btn');
		post_btn.innerHTML = "<i class='fa fa-circle-notch fa-spin'></i> Uploading Post..";

		let post = {
			gameName: this.gameName,
			heading: this.heading,
			imgLink: this.imgLink,
			videoLink: this.videoLink,
			description: this.description
		}

		// Required Fields
		if(!this.validateService.validatePost(post)) {
			let err = this.validateService.err;
			this.flashMessage.show(err, {cssClass: 'flashMeassage-danger', timeout: 3000});
			post_btn.innerHTML = "Upload Post";
			return false;
		}

		// Upload Post
		this.postService.addPost(post).subscribe(data => {
			if(data.success) {
				post_btn.innerHTML = "Upload Post";
				this.flashMessage.show(data.msg, {cssClass: 'flashMeassage-success', timeout: 3000});
				this.gameName = null;
				this.heading = null;
				this.imgLink = null;
				this.videoLink = null;
				this.description = null;
				this.router.navigate(['/dashboard']);
			} else {
				this.flashMessage.show(data.msg, {cssClass: 'flashMeassage-danger', timeout: 3000});
				post_btn.innerHTML = "Upload Post";
			}
		});
	}

}
