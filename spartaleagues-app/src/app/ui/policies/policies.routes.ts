import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullContainerComponent } from '../../containers';

const routes: Routes = [
    
    //Full Containers Routes
	{ path: '', component: FullContainerComponent,
        children: [
            //Privacy
            {
                path: 'privacy', 
                loadChildren: './privacy-policy/privacy-policy.module#PrivacyPolicyModule'
            },

            // Terms
            {
                path: 'terms', 
                loadChildren: './terms-conditions/terms-conditions.module#TermsConditionsPolicyModule'
            },

            // Refund policy
            {
                path: 'refund-poliacy', 
                loadChildren: './refund-policy/refund-policy.module#RefundPolicyModule'
            },

            // Pricing-Policy
            {
                path: 'pricing-policy', 
                loadChildren: './pricing-policy/pricing-policy.module#PricingPolicyModule'
            }
        ]
    },

]

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { useHash: false, enableTracing: true }),
	],
	exports: [
		RouterModule
	]
})

export class PoliciesRoutingModule { }