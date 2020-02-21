var { src, dest, watch, series, parallel } = require("gulp");
var concat = require('gulp-concat');
var sass = require("gulp-sass");
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var babelify = require("babelify");
var browserify = require("browserify");
var buffer = require("vinyl-buffer");
var source = require("vinyl-source-stream");

var paths = {
    scss: {
        src: './src/sass/*.scss',
        dest: './src/css/'
    },
    css: {
        src: './src/css/*.css',
        dest: './dist/css/'
    },
    png: {
        src: 'src/img/**/*.png',
        dest: 'dist/img/'
    },
    jpg: {
        src: 'src/img/**/*.jpg',
        dest: 'dist/img/'
    },
    gif: {
        src: 'src/img/**/*.gif',
        dest: 'dist/img/'
    },
    model: {
        src: 'src/models/**/*.glb',
        dest: 'dist/models/'
    },
    js: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/'
    },
    scripts: {
        entries: ['./src/index.js'],
        output: 'mychart.js',
        output_src: 'mychart.src.js',
        dest: 'dist/js/'
    },
    html: {
        src: 'src/*.html',
        dest: 'dist/'
    },
    libs: {
        src: 'src/libs/*.*',
        dest: 'dist/libs/'
    }
};


function js() {
    return browserify({
            entries: paths.scripts.entries
        }).transform(babelify)
        .bundle()
        .pipe(source(paths.scripts.output))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        //.pipe(uglify())
        .pipe(dest(paths.scripts.dest));
}


function scss() {
    return src(paths.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest(paths.scss.dest));
}

function css() {
    return src(paths.css.src)
        .pipe(concat('index.css')) //병합하고
        .pipe(dest(paths.css.dest));
}

function html() {
    return src(paths.html.src)
        .pipe(dest(paths.html.dest));
}


function watchFiles() {

    watch(paths.scss.src, scss);
    watch(paths.css.src, css);
    watch(paths.html.src, html);
    watch(paths.scripts.entries[0], js);
}

function clean() {
    return del(['dist']);
}

exports.clean = series(clean);
exports.scss = parallel(scss);
exports.default = parallel(watchFiles, series(js, scss, css, html));