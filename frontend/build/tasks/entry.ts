import * as path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { appRoot, tmpRoot } from '../paths';

export default () => {
    let file = readFileSync(path.resolve(appRoot, `bundles/main.ts`)).toString();
    file = file.replace(/platformBrowserDynamic/g, "platformBrowser");
    file = file.replace(/bootstrapModule/g, "bootstrapModuleFactory");
    file = file.replace(/@angular\/platform-browser-dynamic/g, "@angular/platform-browser");
    file = file.replace(/([a-zA-Z]+Module)(\s*[})])/g, "$1NgFactory$2");
    file = file.replace(/([a-zA-Z].module)/g, "$1.ngfactory");
    writeFileSync(path.resolve(tmpRoot, `bundles/main.aot.ts`), file);
};
