import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Routes
import { AppRoutingModule } from './app.routes';

// Components
import { AppComponent } from './app.component';
import { FullContainerComponent, SimpleContainerComponent } from './containers';
import { UiModule } from './ui/ui.module';

// Services
import { RequestUtils } from './utils';
import { ApiService, AuthService, UserService, ContactService, PostService, ParticipateService, PaymentService, ValidateService, LocalStorageService } from './services';

import { AuthGuard } from './guards/auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';


@NgModule({
	declarations: [
		AppComponent,
		FullContainerComponent,
		SimpleContainerComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpModule,
		HttpClientModule,
		FormsModule,
		AppRoutingModule,
		UiModule,
		//SharedModule,
		FlashMessagesModule.forRoot()
	],
	providers: [RequestUtils, ApiService, AuthService, UserService, LocalStorageService, ValidateService, AuthGuard, AdminAuthGuard, FlashMessagesService, ContactService, PostService, ParticipateService, PaymentService],
	bootstrap: [AppComponent]
})
export class AppModule { }
