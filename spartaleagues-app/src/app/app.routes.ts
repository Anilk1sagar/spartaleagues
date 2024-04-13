import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullContainerComponent, SimpleContainerComponent } from './containers';

const routes: Routes = [

    //{ path: '', pathMatch: 'full', redirectTo: 'home'},

    // Full Container Routes
    { path: '', component: FullContainerComponent,
		children: [
            //Home
            { path: '', loadChildren: './ui/home/home.module#HomeModule' },

            // Faq
            { path: 'faq', loadChildren: './ui/faq/faq.module#FaqModule' },

            // About
            { path: 'about', loadChildren: './ui/about/about.module#AboutModule' },

            // Contact
            { path: 'contact', loadChildren: './ui/contact/contact.module#ContactModule' },

            // Post
            { path: 'post/:heading', loadChildren: './ui/post/post.module#PostModule' },

            // participate
            {
                path: 'participate',
                loadChildren: './ui/participate/participate.module#ParticipateModule'
            },

            // checkout
            {
                path: 'checkout',
                loadChildren: './ui/payment/checkout/checkout.module#CheckoutModule'
            },

            // Payment Status
            { 
                path: 'payment-status/:status/:payment_id/:txnId', 
                loadChildren: './ui/payment/payment-status/payment-status.module#PaymentStatusModule' 
            },

            // Dashboard
            { path: 'dashboard', loadChildren: './ui/admin/dashboard.module#DashboardModule' },

            // Invalid Redirect
            // { path: '**', redirectTo:'' }
		]
    },

    // // Default
	// { path: '', component: FullContainerComponent,
	// 	children: [
	// 		{ path: '**', loadChildren: './ui/home/home.module#HomeModule' }
	// 	]
	// },

]

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { useHash: false, enableTracing: true }),
	],
	exports: [
		RouterModule
	]
})

export class AppRoutingModule { }