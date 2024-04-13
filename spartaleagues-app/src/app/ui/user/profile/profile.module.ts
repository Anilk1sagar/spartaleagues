import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from '../../../guards/auth.guard';

import { ProfileComponent } from './profile.component';
import { SettingsComponent } from './settings/settings.component';
import { StatusComponent } from './status/status.component';

// Module


const routes: Routes = [
    { path: '', component: ProfileComponent, canActivate:[AuthGuard],
        children: [
            { path: '', component: StatusComponent },
            { path: 'settings', component: SettingsComponent }
        ]
    },
]

@NgModule({
	declarations: [
        ProfileComponent,
        SettingsComponent,
        StatusComponent
	],
	imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
	]
})

export class ProfileModule { }
