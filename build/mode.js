/**
 * Массив аргументов командной строки.
 *
 * @type Array<any>
 */
export const { argv } = process;

/**
 * Значение перенемнной, означающей продакшн-режим.
 *
 * @type {string}
 */
export const prodEnv = 'production';

/**
 * Режим работы сборщика (из параметра --mode).
 *
 * @type {string}
 */
export const mode = argv.indexOf('--mode') !== -1 ? argv[argv.indexOf('--mode') + 1] : prodEnv;

/**
 * Запущена ли сборка в продакшн-режиме.
 *
 * @type {string}
 */
export const isProduction = mode === prodEnv;
