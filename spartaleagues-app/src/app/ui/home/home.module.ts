import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { SliderComponent } from './slider/slider.component';

// Module
import { NguCarouselModule } from '@ngu/carousel';

const routes: Routes = [

	{ path: '', component: HomeComponent,
        children: [
            {  path: '', loadChildren: './posts/csgo/csgo.module#CsgoModule' },
            {  path: 'badminton', loadChildren: './posts/badminton/badminton.module#BadmintonModule' }
        ]
    },
]

@NgModule({
	declarations: [
		HomeComponent,
		SliderComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NguCarouselModule
	]
})

export class HomeModule { }
