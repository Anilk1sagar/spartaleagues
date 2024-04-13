import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard';

import { CheckoutComponent } from './checkout.component';

const routes: Routes = [
	{ path: '', component: CheckoutComponent, canActivate:[AuthGuard] }
]

@NgModule({
	declarations: [
		CheckoutComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
	]
})

export class CheckoutModule { }
