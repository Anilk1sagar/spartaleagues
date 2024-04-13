import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateTeamComponent } from './create-team.component';

const routes: Routes = [
    { path: '', component: CreateTeamComponent },
]

@NgModule({
	declarations: [
        CreateTeamComponent
	],
	imports: [
        CommonModule,
        FormsModule,
		RouterModule.forChild(routes),
	]
})

export class CreateTeamModule { }
