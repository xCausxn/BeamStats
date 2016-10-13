import { resolve } from 'path';

export const root = resolve(__dirname, '..');
export const appRoot = resolve(root, 'src');
export const distRoot = resolve(root, 'dist');
export const tmpRoot = resolve(root, 'tmp');
export const stylesRoot = resolve(appRoot, 'styles');

export const tsconfig = resolve(root, 'tsconfig.json');
export const appEntry = resolve(appRoot, 'bundles/main.ts');
export const polyfillEntry = resolve(appRoot, 'bundles/polyfill.ts');
export const indexTemplate = resolve(appRoot, 'index.ejs')
