import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PricingPolicyComponent } from './pricing-policy.component';

const routes: Routes = [
	{ path: '', component: PricingPolicyComponent }
]

@NgModule({
	declarations: [
		PricingPolicyComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
	]
})

export class PricingPolicyModule { }