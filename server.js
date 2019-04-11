/* eslint-disable no-console */
import { resolve }                from 'path';
import { readFileSync }           from 'fs';
import express                    from 'express';
import favicon                    from 'serve-favicon';
import LRU                        from 'lru-cache';
import { createBundleRenderer }   from 'vue-server-renderer';
import { version as expressVer }  from 'express/package.json';
import { version as rendererVer } from 'vue-server-renderer/package.json';

/**
 * Порт сервера.
 *
 * @type {number}
 */
const port = process.env.PORT || 3000;

/**
 * Экземпляр сервера express.
 *
 * @type {Object}
 */
const app = express();

/**
 * Информация о сервере.
 *
 * @type {string}
 */
const serverInfo = `express/${expressVer} vue-server-renderer/${rendererVer}`;

/**
 * Путь к файлу шаблона страницы.
 *
 * @type {string}
 */
const templatePath = resolve(__dirname, './src/index.template.html');

/**
 * Содержимое шаблона страницы.
 *
 * @type {string}
 */
const template = readFileSync(templatePath, 'utf-8');

/**
 * Серверный бандл.
 *
 * @type {Object}
 */
const bundle = require('./dist/vue-ssr-server-bundle.json');

/**
 * Файл манифеста.
 *
 * @type {Object}
 */
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

/**
 * Создаёт и возвращает экземпляр визуализатора.
 *
 * @type {BundleRenderer}
 */
const renderer = createBundleRenderer(bundle, {
    template,
    clientManifest,
    basedir:         resolve(__dirname, './dist'),
    runInNewContext: false,
    cache:           new LRU({
        max:    1000,
        maxAge: 1000 * 60 * 15,
    }),
});

/**
 * Коллбэк, обрабатывающий запросы к серверу.
 *
 * @param {Object} req
 * @param {Object} res
 */
const render = (req, res) => {
    /**
     * Время начала отрисовки.
     *
     * @type {number}
     */
    const s = Date.now();

    /**
     * Обработчик ошибок.
     *
     * @param {Object} err
     */
    const handleError = (err) => {
        if (err.url) {
            res.redirect(err.url);
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found');
        } else {
            res.status(500).send('500 | Internal Server Error');

            console.error(`Error during render: ${req.url}`);
            console.error(err.stack);
        }
    };

    /**
     * Контекст, передаваемый в визуализатор.
     *
     * @type {Object}
     */
    const context = {
        title: 'Vue SSR sample',
        url:   req.url,
    };

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Server', serverInfo);

    renderer.renderToString(context, (err, html) => {
        if (err) {
            handleError(err);
            return;
        }

        res.send(html);

        console.log(`Whole request: ${Date.now() - s}ms`);
    });
};

/**
 * Отдача статических файлов.
 *
 * @param {string}  servePath
 * @param {boolean} cache
 */
const serve = (servePath, cache) => express.static(resolve(__dirname, servePath), {
    maxAge: cache ? 1000 * 60 * 60 * 24 * 30 : 0,
});

app.use(favicon(resolve(__dirname, './public/favicon.png')));
app.use('/dist', serve('./dist', true));
app.use('/public', serve('./public', true));
app.use('/service-worker.js', serve('./dist/service-worker.js'));

app.get('*', render);

app.listen(port, () => {
    console.log(`Server started at localhost: ${port}`);
});
