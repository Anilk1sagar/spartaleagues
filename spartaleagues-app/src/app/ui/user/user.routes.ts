import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullContainerComponent, SimpleContainerComponent } from '../../containers';

const routes: Routes = [

    //Full Containers Routes
	{ path: '', component: FullContainerComponent,
        children: [
            // Profile
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },

            // Password Reset
            {
                path: 'password_reset',
                loadChildren: './password-reset/password-reset.module#PasswordResetModule'
            },

            // Update Password
            { 
                path: 'update_password/:key/:reset',
                loadChildren: './update-password/update-password.module#UpdatePasswordModule' 
            }
        ]
    },

    //Simple Routes
	{ path: '', component: SimpleContainerComponent,
        children: [
            //Login
            { path: 'login', loadChildren: './login/login.module#LoginModule' },

            // Register
            { path: 'register', loadChildren: './register/register.module#RegisterModule' }
        ]
    }

]

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { useHash: false, enableTracing: true }),
	],
	exports: [
		RouterModule
	]
})

export class UserRoutingModule { }