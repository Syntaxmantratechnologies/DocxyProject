const mix = require('laravel-mix');
const exec = require('child_process').exec;
require('dotenv').config();

/*
 |--------------------------------------------------------------------------
 | Mix Backend Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
const glob = require('glob')
const path = require('path')

/*
 |--------------------------------------------------------------------------
 | Vendor assets
 |--------------------------------------------------------------------------
 */

function mixAssetsDir(query, cb) {
  (glob.sync('resources/backend_files/' + query) || []).forEach(f => {
    f = f.replace(/[\\\/]+/g, '/');
    cb(f, f.replace('resources', 'public'));
  });
}

// themes Core stylesheets
mixAssetsDir('sass/core/**/!(_)*.scss', (src, dest) => mix.sass(src, dest.replace(/(\\|\/)sass(\\|\/)/, '$1css$2').replace(/\.scss$/, '.css')));

// pages Core stylesheets
mixAssetsDir('sass/pages/**/!(_)*.scss', (src, dest) => mix.sass(src, dest.replace(/(\\|\/)sass(\\|\/)/, '$1css$2').replace(/\.scss$/, '.css')));

// Themescss task
mixAssetsDir('sass/plugins/**/!(_)*.scss', (src, dest) => mix.sass(src, dest.replace(/(\\|\/)sass(\\|\/)/, '$1css$2').replace(/\.scss$/, '.css')));

// Core stylesheets
mixAssetsDir('sass/themes/**/!(_)*.scss', (src, dest) => mix.sass(src, dest.replace(/(\\|\/)sass(\\|\/)/, '$1css$2').replace(/\.scss$/, '.css')));

// custom blank file for users
mixAssetsDir('assets/scss/**/!(_)*.scss', (src, dest) => mix.sass(src, dest.replace(/(\\|\/)sass(\\|\/)/, '$1css$2').replace(/(\\|\/)scss(\\|\/)/, '$1css$2').replace(/\.scss$/, '.css')));

// script js
mixAssetsDir('js/core/**/*.js', (src, dest) => mix.scripts(src, dest));

// custom script js
mixAssetsDir('js/scripts/**/*.js', (src, dest) => mix.scripts(src, dest));

// custom script js for users
mixAssetsDir('assets/js/**/*.js', (src, dest) => mix.scripts(src, dest));

mix.js('resources/backend_files/js/app.js', 'public/backend_files/js')
.sass('resources/backend_files/sass/app.scss', 'public/backend_files/css');


mix.sass('resources/backend_files/sass/bootstrap-extended.scss', 'public/backend_files/css')
  .sass('resources/backend_files/sass/bootstrap.scss', 'public/backend_files/css')
  .sass('resources/backend_files/sass/colors.scss', 'public/backend_files/css')
  .sass('resources/backend_files/sass/components.scss', 'public/backend_files/css')
  .sass('resources/backend_files/sass/custom-rtl.scss', 'public/backend_files/css')


/*
 |--------------------------------------------------------------------------
 | Application assets
 |--------------------------------------------------------------------------
 */

// -----------copy folders to public -------------//

mix.copyDirectory('resources/backend_files/images', 'public/backend_files/images');
mix.copyDirectory('resources/backend_files/vendors', 'public/backend_files/vendors');
mix.copyDirectory('resources/backend_files/fonts', 'public/backend_files/fonts');
mix.copyDirectory('resources/backend_files/data', 'public/backend_files/data');



mix.copyDirectory('resources/frontend_files/frontend_assets/css', 'public/frontend_files/css');
mix.copyDirectory('resources/frontend_files/frontend_assets/fonts', 'public/frontend_files/fonts');
mix.copyDirectory('resources/frontend_files/frontend_assets/img', 'public/frontend_files/img');
mix.copyDirectory('resources/frontend_files/frontend_assets/img2', 'public/frontend_files/img2');
mix.copyDirectory('resources/frontend_files/frontend_assets/img3', 'public/frontend_files/img3');
mix.copyDirectory('resources/frontend_files/frontend_assets/js', 'public/frontend_files/js');



/*
mix.copyDirectory('resources/frontend_files/frontend_assets/js', 'public/frontend_files/js');
mix.copyDirectory('resources/frontend_files/frontend_assets/js', 'public/frontend_files/js');
 |--------------------------------------------------------------------------
 | Mix Frontend Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */