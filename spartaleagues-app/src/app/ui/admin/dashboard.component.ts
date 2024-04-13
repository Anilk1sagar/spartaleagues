import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


	constructor() {

		// Get All Posts
		// this.postService.getPosts()
		// .subscribe(posts => {
		// 	this.posts = posts;
		// });
	}

	ngOnInit() {
	}

}
