import { NgModuleFactoryLoader, NgModuleFactory, Injectable, Compiler } from '@angular/core';

declare const System: {
    import<T>(name: string): Promise<T>;
};

@Injectable()
export class WebpackModuleLoader implements NgModuleFactoryLoader {
    private isOffline: boolean;

    constructor(private compiler: Compiler) {
        this.isOffline = compiler instanceof Compiler;
    }

    load(path: string): Promise<NgModuleFactory<any>> {
        const [moduleName, exportName] = path.split('#');

        if (this.isOffline) {
            return this.loadFactory(moduleName, exportName);
        }

        return this.loadAndCompiler(moduleName, exportName);
    }

    /**
     * Load a module factory. Used in AoT mode.
     */
    loadFactory(moduleName: string, exportName: string): Promise<NgModuleFactory<any>> {
        return System.import(`../${moduleName}/${moduleName}.module.ngfactory`)
            .then(res => res[`${exportName}NgFactory`])
    }

    /**
     * Load and compile a module. Used in JiT mode.
     */
    loadAndCompiler(moduleName: string, exportName: string): Promise<NgModuleFactory<any>> {
        return System.import(`../${moduleName}/${moduleName}.module`)
            .then(res => res[exportName])
            .then(type => this.compiler.compileModuleAsync(type));
    }
}

export const WebpackModuleLoaderProvider = {
    provide: NgModuleFactoryLoader,
    useClass: WebpackModuleLoader
};