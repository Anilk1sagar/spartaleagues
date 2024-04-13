import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';

const routes: Routes = [
	{ path: '', component: RegisterComponent }
]

@NgModule({
	declarations: [
		RegisterComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
	]
})

export class RegisterModule { }