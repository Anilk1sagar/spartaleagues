import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CsgoComponent } from './csgo.component';

import { PaginationModule } from 'ngx-bootstrap';

const routes: Routes = [
	{ path: '', component: CsgoComponent }
]

@NgModule({
	declarations: [
		CsgoComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		PaginationModule.forRoot(),
	]
})

export class CsgoModule { }