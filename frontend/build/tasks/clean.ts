import * as gulp from 'gulp';
import * as del from 'del';

import { tmpRoot, distRoot } from '../paths';

export default () => {
    return del([
        tmpRoot,
        distRoot,
    ])
};
