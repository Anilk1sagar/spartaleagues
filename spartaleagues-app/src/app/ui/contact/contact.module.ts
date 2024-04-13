import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NguiMapModule} from '@ngui/map';

import { ContactComponent } from './contact.component';

const routes: Routes = [
	{ path: '', component: ContactComponent }
]

@NgModule({
	declarations: [
		ContactComponent,
	],
	imports: [
        CommonModule,
        FormsModule,
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCBhHnGnwB38MI1Uza9RVkZ-LTYssF59Oo'}),
		RouterModule.forChild(routes),
	]
})

export class ContactModule { }
