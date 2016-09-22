import { Component } from '@angular/core';
import { appRoutes } from './app.routing';

@Component({
    selector: 'beamstats-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {

    preloadBundle(path: string) {
        const bundle = appRoutes.find((item) => item.path === path);
        if(typeof bundle.loadChildren === 'function') return bundle.loadChildren();
    }
}
