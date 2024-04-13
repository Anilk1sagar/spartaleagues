import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PostService } from '../../../services/api/post.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-faqs',
	templateUrl: './faqs.component.html',
	styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {


	faqQuestion: String;
	faqAns: String;

	constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService, private postService: PostService, private router: Router) { }

	ngOnInit() {
	}

	// ================================  Upload Faq Questions  ======================================//
	onFaqSubmit() {
		// Animating Login button
		let faq_btn = document.getElementById('faq_btn');
		faq_btn.innerHTML = "<i class='fa fa-circle-notch fa-spin'></i> Uploading Faq...";

		let faqModel = {
			faqQuestion: this.faqQuestion,
			faqAns: this.faqAns
		}

		// Required Fields
		if(!this.validateService.validateFaq(faqModel)) {
			const err = this.validateService.err;
			this.flashMessage.show(err, {cssClass: 'flashMeassage-danger', timeout: 3000});
			faq_btn.innerHTML = "Upload Faq";
			return false;
		}

		// Upload Post
		this.postService.addFaq(faqModel).subscribe(data => {
			if(data.success) {
				faq_btn.innerHTML = "Upload Faq";
				this.flashMessage.show(data.msg, {cssClass: 'flashMeassage-success', timeout: 3000});
				// Clear Fields after Upload
				this.faqQuestion = null;
				this.faqAns = null;
				//this.router.navigate(['/dashboard']);
			} else {
				this.flashMessage.show(data.msg, {cssClass: 'flashMeassage-danger', timeout: 3000});
				faq_btn.innerHTML = "Upload Faq";
			}
		});
	}

}
