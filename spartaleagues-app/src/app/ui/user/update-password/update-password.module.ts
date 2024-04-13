import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UpdatePasswordComponent } from './update-password.component';

const routes: Routes = [
	{ path: '', component: UpdatePasswordComponent }
]

@NgModule({
	declarations: [
		UpdatePasswordComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
	]
})

export class UpdatePasswordModule { }