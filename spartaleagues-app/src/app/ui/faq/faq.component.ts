import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceIn } from 'ng-animate';

import { PostService } from '../../services/api/post.service';
import { Faq } from '../../models/faq';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [
    trigger('doAnimate', [transition('* => *', useAnimation(bounceIn))])
  ]
})
export class FaqComponent implements OnInit {

	doAnimate: any;

	faqs: Observable<Faq[]>;

	constructor(private postService: PostService) {
		//Get All Faqs
		this.postService.getFaqs()
		.subscribe(faqs => {
			this.faqs = faqs;
		});
	}

	ngOnInit() {
	}

}
