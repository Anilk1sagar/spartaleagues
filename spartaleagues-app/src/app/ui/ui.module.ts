import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

// Routes
import { PoliciesRoutingModule } from './policies/policies.routes';
import { UserRoutingModule } from './user/user.routes';

//Modules
import { BsDropdownModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
    declarations: [
        // Components
        HeaderComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        PoliciesRoutingModule,
        UserRoutingModule,
        BsDropdownModule,
        BsDropdownModule.forRoot(),
        PaginationModule.forRoot()
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
    ],
})

export class UiModule {}
