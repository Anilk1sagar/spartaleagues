import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceIn } from 'ng-animate';

import { PostService, AuthService } from '../../../services/api';
import { NguCarousel } from '@ngu/carousel';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('doAnimate', [transition('* => *', useAnimation(bounceIn))])
  ]
})
export class SliderComponent implements OnInit {

	doAnimate: any;
	
	public carouselOne: NguCarousel;

	_competetion1: any;
	_competetion2: any;

	constructor(public authService: AuthService, private postService: PostService) {
		
		//Get Competetion
		this.postService.getCompetetion().subscribe(data => {

			console.log("Posts: ", data);

			this._competetion1 = data[0];
			this._competetion2 = data[1];
		});
	}

	ngOnInit() {
		this.carouselOne = {
			grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
			slide: 1,
			speed: 3000,
			interval: 2000,
			point: {
			  visible: true,
			  pointStyles: `
				.ngucarouselPoint {
					list-style-type: none;
					text-align: center;
					padding: 10px;
					margin: 0;
					white-space: nowrap;
					overflow: auto;
					position: absolute;
					width: 100%;
					bottom: 0px;
					left: 0;
					box-sizing: border-box;
				}
				.ngucarouselPoint li {
					display: inline-block;
					border-radius: 999px;
					background: rgba(255, 255, 255, 0.55);
					padding: 5px;
					margin: 0 3px;
					transition: .4s ease all;
				}
				.ngucarouselPoint li.active {
					background: white;
					width: 10px;
				}
				@media (max-width: 575.98px) {
					.ngucarouselPoint {
						display: none;
					}
				}
				`
			},
			load: 2,
			touch: false,
			loop: true,
			custom: 'banner'
		}
	}

	public myfunc(event: Event) {
		//console.log(event);
	}

}
