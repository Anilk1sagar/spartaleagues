import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CsgoComponent } from './csgo.component';

const routes: Routes = [
    { path: '', component: CsgoComponent
        // children: [
        //     { path: '', loadChildren: './have-team/have-team.module#HaveTeamModule' },
        //     { path: 'create-team', loadChildren: './create-team/create-team.module#CreateTeamModule' }
        // ]
    }
]

@NgModule({
	declarations: [
        CsgoComponent
	],
	imports: [
        CommonModule,
        FormsModule,
		RouterModule.forChild(routes),
	]
})

export class CsgoModule { }
