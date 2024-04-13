import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/api/post.service';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

	heading: String;
	post: any;
	postHeading: String;

	constructor(public sanitizer: DomSanitizer, private route: ActivatedRoute, private postService: PostService) { }

	ngOnInit() {
		// Getting parameter
		this.route.params.subscribe(params => {
			this.heading = params['heading'];
		});
		
		// Getting Single Post
		this.postService.getSinglePost(this.heading)
		.subscribe(post => {
			this.post = post;
			const str = post.heading; 
			this.postHeading = this.toTitleCase(str);
		});
	}

	// Text To upper case
	toTitleCase(str) {
    	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}

}
