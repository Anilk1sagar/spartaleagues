import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PasswordResetComponent } from './password-reset.component';

const routes: Routes = [
	{ path: '', component: PasswordResetComponent }
]

@NgModule({
	declarations: [
		PasswordResetComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
	]
})

export class PasswordResetModule { }