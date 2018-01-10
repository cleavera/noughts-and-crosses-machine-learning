import 'reflect-metadata';
import 'zone.js';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UiModule } from './ui.module';

platformBrowserDynamic().bootstrapModule(UiModule)
    .catch((err: Error) => {
        console.error(err); // tslint:disable-line no-console
    });
