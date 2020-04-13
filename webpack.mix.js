const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

//Configurar path chuncks
mix.webpackConfig({
        output: {
            chunkFilename: 'js/chuncks/[name].[contenthash].js',
        },
    });

//React
mix.react('resources/react/app.js', 'public/js');

//Sass
mix.sass('resources/react/assets/scss/app.scss', 'public/css');

//Versionar
if (mix.inProduction()) {
  mix.version();
}
