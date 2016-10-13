import 'core-js/es7/reflect';
import * as path from 'path';
import { writeFileSync, readFileSync } from 'fs';
import * as ts from 'typescript';
import * as tsc from '@angular/tsc-wrapped';
import { CodeGenerator } from '@angular/compiler-cli';

import { root, appRoot, tmpRoot } from '../paths';
import { bundles } from '../config';

function codegen(ngOptions: tsc.AngularCompilerOptions, cliOptions: tsc.NgcCliOptions, program: ts.Program, host: ts.CompilerHost) {
  return CodeGenerator.create(ngOptions, cliOptions, program, host).codegen();
}

const copyFile = (name: string, from: string, to: string, mod: any = (f: string) => f) => {
  const file = readFileSync(path.join(from, name));
  writeFileSync(path.join(to, name), mod(file.toString()));
};

export default done => {
    copyFile('tsconfig.json', root, tmpRoot, (content: string) => {
        const parsed = JSON.parse(content);
        parsed.files = ['bundles/polyfill.ts', 'bundles/main.ts'];
        bundles.forEach(bundle => {
            parsed.files.push(`bundles/${bundle}/${bundle}.module.ts`);
        });
        return JSON.stringify(parsed, null, 2);
    });
    const cliOptions = new tsc.NgcCliOptions({});
    tsc.main(tmpRoot, cliOptions, codegen)
        .then(done)
        .catch(e => {
            console.error(e.stack);
            console.error('Compilation failed');
            process.exit(1);
        });
};
