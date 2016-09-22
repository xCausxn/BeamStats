import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './main/app.module';

// Global Styles
require('../styles/base.scss');

platformBrowserDynamic().bootstrapModule(AppModule);
