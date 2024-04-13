import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/api/auth.service';
import { PostService } from '../../services/api/post.service';
import { Competetion } from '../../models';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	_competetions: Competetion;

	constructor(public authService: AuthService, private postService: PostService) {
		
		//Get Competetion
		this.postService.getCompetetion()
		.subscribe(data => {
			this._competetions = data;
		});
	}

	ngOnInit() {}

}
