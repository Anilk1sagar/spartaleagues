import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from 'ng2-ckeditor';
import { AdminAuthGuard } from '../../guards/admin-auth.guard';

import { DashboardComponent } from './dashboard.component';
import { EventsComponent } from './events/events.component';
import { FaqsComponent } from './faqs/faqs.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
	{ path: '', component: DashboardComponent, canActivate:[AdminAuthGuard],
		children: [
			{ path: '', component: PostsComponent },
			{ path: 'events', component: EventsComponent },
			{ path: 'faqs', component: FaqsComponent }
		]
	}
]

@NgModule({
	declarations: [
		DashboardComponent,
		EventsComponent,
		FaqsComponent,
		PostsComponent,
	],
	imports: [
        CommonModule,
        FormsModule,
        CKEditorModule,
		RouterModule.forChild(routes),
	]
})

export class DashboardModule { }
