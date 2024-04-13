import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PostService } from '../../../../services/api';
import { Post } from '../../../../models/post';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-badminton',
  templateUrl: './badminton.component.html',
  styleUrls: ['./badminton.component.scss']
})
export class BadmintonComponent implements OnInit {

	posts: Observable<Post[]>;
	maxSize: number = 5;
	TotalItems: number;
	CurrentPage: number = 0;
	numPages: number = 0;
	itemsPerPage: number;

	constructor(public sanitizer: DomSanitizer, private postService: PostService) {
		// Get All Posts
		this.postService.getBadmintonPosts(this.CurrentPage).subscribe(posts => {
			this.posts = posts.docs;
			this.TotalItems = posts.total;
			this.itemsPerPage = posts.limit;
		});
	}

	ngOnInit() {
	}

	pageChanged(event: any): void {
		const offset = event.page -1;
		
		this.postService.getBadmintonPosts(offset)
		.subscribe(posts => {
			this.posts = posts.docs;
		});
	}

}
