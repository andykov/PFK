'use strict';

var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    connect = require('gulp-connect'),
    opn = require('opn');

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        jsVendor: 'build/js/vendor/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/css/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/*.js',//В стилях и скриптах нам понадобятся только main файлы
        jsVendor: 'src/js/vendor/*.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/scss/main.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/scss/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/*.js',
        jsVendor: 'src/js/vendor/*.js',
        style: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/scss/fonts/**/*.*'
    },
    clean: './build'
};

// Переменная с настройками локального сервера
var server = {
    host: 'localhost',
    port: '9000'
};

// Сборка HTML
gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        // .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(connect.reload()); //И перезагрузим наш сервер для обновлений
});

// Сборка CSS
gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        // .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        // .pipe(cssmin()) //Сожмем
        // .pipe(rename({suffix: '.min'})) // переименуем добавим суффикс .min
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И кинем в build
        .pipe(connect.reload());
});

// Сборка JS
gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        // .pipe(rigger()) //Прогоним через rigger
        // .pipe(sourcemaps.init()) //Инициализируем sourcemap
        // .pipe(uglify()) //Сожмем наш js
        // .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(connect.reload()); //И перезагрузим сервер
    
    // Перебрасываем библиотеки
    gulp.src(path.src.jsVendor)
        .pipe(gulp.dest(path.build.jsVendor))
        .pipe(connect.reload());
});

// Сборка IMG
gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(connect.reload());
});

// Просто копируем шрифты в папку build
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// Такс запускает одной командой все предыдущие таски
gulp.task('build', [
    'html:build',
    'style:build',
    'js:build',
    'image:build',
    'fonts:build'
]);

// Следим за изменениями в файлах
gulp.task('watch', function() {
    gulp.watch(path.watch.html, ['html:build']) // следим за файлами в path.watch.html и запускаем задачу html:build
    gulp.watch(path.watch.style, ['style:build'])
    gulp.watch(path.watch.js, ['js:build'])
    gulp.watch(path.watch.img, ['image:build'])
    gulp.watch(path.watch.fonts, ['fonts:build'])
});

// Поднимаем сервер
gulp.task('webserver', function() {
    connect.server({
        host: server.host,
        port: server.port,
        livereload: true
    });
});

// Если вы добавите какую-нибудь картинку, потом запустите задачу image:build и потом картинку удалите — она останется в папке build. 
// Так что было бы удобно — периодически подчищать ее. Создадим для этого простой таск
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

// Открываем проект в браузере
gulp.task('openbrowser', function() {
    opn( 'http://' + server.host + ':' + server.port + '/build' );
});

// Запускаем всю сборку одним таском
gulp.task('default', ['build', 'webserver', 'watch', 'openbrowser']);