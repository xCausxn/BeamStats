import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routing, appRoutingProviders }  from './app/app.routing';

import { AppComponent } from './app';

import { BeamApiService } from './services';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        NgbModule,
        routing
    ],
    providers: [
        Title,
        appRoutingProviders,
        BeamApiService
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
