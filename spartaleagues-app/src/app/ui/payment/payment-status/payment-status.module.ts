import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard';

import { PaymentStatusComponent } from './payment-status.component';

const routes: Routes = [
	{ path: '', component: PaymentStatusComponent, canActivate:[AuthGuard] }
]

@NgModule({
	declarations: [
		PaymentStatusComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
	]
})

export class PaymentStatusModule { }
