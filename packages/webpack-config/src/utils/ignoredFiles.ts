/**
 * Copyright (c) 2022 Expo, Inc.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Based on https://github.com/facebook/create-react-app/blob/a422bf2/packages/react-dev-utils/ignoredFiles.js
 * But with Node LTS support.
 */

import escape from 'escape-string-regexp';
import path from 'path';

export function ignoredFiles(appSrc: string) {
  return new RegExp(
    `^(?!${escape(path.normalize(appSrc + '/').replace(/[\\]+/g, '/'))}).+/node_modules/`,
    'g'
  );
}
