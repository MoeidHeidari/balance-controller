import { anyTypeAnnotation } from '@babel/types';
import * as fs from 'fs';

/**
 * Reads a file asynchronously
 * @param path address of the file
 * @returns string
 */
export async function readFile(path: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
