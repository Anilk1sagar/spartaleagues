import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BadmintonComponent } from './badminton.component';

const routes: Routes = [
    { path: '', component: BadmintonComponent }
]

@NgModule({
	declarations: [
        BadmintonComponent
	],
	imports: [
        CommonModule,
        FormsModule,
		RouterModule.forChild(routes),
	]
})

export class BadmintonModule { }
