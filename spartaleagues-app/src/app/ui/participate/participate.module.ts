import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';

import { ParticipateComponent } from './participate.component';

const routes: Routes = [
    { path: '', component: ParticipateComponent, canActivate:[AuthGuard] },
    { path: 'csgo', loadChildren: './games/csgo/csgo.module#CsgoModule' },
    { path: 'badminton', loadChildren: './games/badminton/badminton.module#BadmintonModule' },
    { path: 'create-team', loadChildren: './create-team/create-team.module#CreateTeamModule' }
]

@NgModule({
	declarations: [
        ParticipateComponent
	],
	imports: [
        CommonModule,
		RouterModule.forChild(routes),
	]
})

export class ParticipateModule { }
