import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TermsConditionsComponent } from './terms-conditions.component';

const routes: Routes = [
	{ path: '', component: TermsConditionsComponent }
]

@NgModule({
	declarations: [
		TermsConditionsComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
	]
})

export class TermsConditionsPolicyModule { }