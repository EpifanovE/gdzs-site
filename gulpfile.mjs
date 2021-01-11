import gulp from 'gulp';
import concat from 'gulp-concat';
import autoprefixer from 'autoprefixer';
import debug from 'gulp-debug';
import cssnano from 'cssnano';
import sourcemaps from 'gulp-sourcemaps';
import gulpIf from 'gulp-if';
import del from 'del';
import postCss from 'gulp-postcss';
import postCssReporter from 'postcss-reporter';
import uglify from 'gulp-uglify';
import pipeline from 'readable-stream';
import sass from 'gulp-dart-sass';
import rename from "gulp-rename";

const isProd = process.env.NODE_ENV === 'prod';

const paths = {
    distRoot: './assets/',
    distCss: './assets/css/',
    distJs: './assets/js/',
    distFonts: './assets/fonts/',
};

export const clean = () => {
    return del(['assets/css/**', 'assets/js/**']);
};

export const fonts = () => {
    return gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*')
        .pipe(gulp.dest(paths.distFonts))
};

export const jsLibs = () => {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/wow.js/dist/wow.min.js',
        // './node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest(paths.distJs))
};

export const cssLibs = () => {

    const plugins = [
        postCssReporter(),
        autoprefixer(),
        cssnano(),
    ];

    return gulp.src([
        '_resources/scss/libs.scss',
    ])
        .pipe(concat('libs.min.css'))
        .pipe(sass())
        .pipe(postCss(plugins))
        .pipe(gulp.dest(paths.distCss))
};

export const css = () => {

    const plugins = [
        postCssReporter(),
        autoprefixer(),
    ];

    if (isProd) {
        plugins.push(cssnano());
    }

    return gulp.src(['_resources/scss/styles.scss'])
        .pipe(gulpIf(!isProd, sourcemaps.init()))
        .pipe(sass())
        .pipe(postCss(plugins))
        .on('error', console.error)
        .pipe(debug())
        .pipe(rename(function (path) {
            path.extname = ".min.css";
        }))
        .pipe(gulpIf(!isProd, sourcemaps.write('.')))
        .pipe(gulp.dest(paths.distCss))
};

export const watch = () => {
    gulp.watch(['_resources/scss/**/*', '!./_resources/scss/vendor/**/*', '!./_resources/scss/libs.scss'], {}, gulp.series(css));
    gulp.watch('_resources/scss/libs.scss', {}, gulp.parallel(cssLibs));
};

export const build = gulp.series(clean, gulp.parallel(css, fonts, jsLibs, cssLibs));

export const dev = gulp.series(build, watch);

export default gulp.series(dev);