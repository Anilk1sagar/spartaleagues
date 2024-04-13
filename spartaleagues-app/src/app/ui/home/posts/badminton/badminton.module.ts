import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BadmintonComponent } from './badminton.component';

import { PaginationModule } from 'ngx-bootstrap';

const routes: Routes = [
	{ path: '', component: BadmintonComponent }
]

@NgModule({
	declarations: [
		BadmintonComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		PaginationModule.forRoot(),
	]
})

export class BadmintonModule { }
