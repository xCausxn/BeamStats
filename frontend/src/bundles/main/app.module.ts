import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routing, appRoutingProviders }  from './app.routing';

import { AppComponent } from './app';

import { BeamApiService, BeamStatsApiService } from './services';
import { WebpackModuleLoaderProvider } from "./webpack-loader-module";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        NgbModule.forRoot(),
        routing
    ],
    providers: [
        Title,
        WebpackModuleLoaderProvider,
        appRoutingProviders,
        BeamApiService,
        BeamStatsApiService
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
