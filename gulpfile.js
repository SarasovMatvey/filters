const { src, dest, parallel, series, watch } = require("gulp");

// GENERAL
const jsDoc = require("gulp-jsdoc3");
const include = require("gulp-include");
const browserSync = require("browser-sync").create();
const del = require("del");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const gulpif = require("gulp-if");

// STYLES
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const sassGlob = require("gulp-sass-glob");

// SCRIPTS
const uglify = require("gulp-uglify-es").default;

// MEDIA
const ttf2woff2 = require("gulp-ttf2woff2");
const imagemin = require("gulp-imagemin");
const iconfontCss = require("gulp-iconfont-css");
const iconfont = require("gulp-iconfont");

// VARS
const config = {
  isDevelopment: true,
  isIconfontUsed: false,
  documentation: true,
};

// CHECK PROD OR DEV
config.isDevelopment = !(process.argv[2] === "build") || !process.argv[2];

const paths = {
  baseDir: "dist/",
  html: "./src/**/*.html",
  styles: "./src/sass/**/*.scss",
  js: "./src/js/**/*.js",
  img: "./src/img/**/*",
  fonts: "./src/fonts/**/*.*",
  forIconfont: "./src/fonts/for-iconfont/*.svg",
  outputCssDir: "./dist/css",
  outputJsDir: "./dist/js",
  outputImgDir: "./dist/img",
  outputFontsDir: "./dist/fonts",
  outputIconfontDir: "./dist/fonts/iconfont",
};

const names = {
  outputCssFile: "style.css",
  outputJsFile: "main.js",
  iconfontName: "iconfont",
};

function browsersync(done) {
  browserSync.init({
    server: { baseDir: paths.baseDir },
    notify: false,
    online: true,
  });
  done();
}

async function clean() {
  return await del.sync(paths.baseDir);
}

function html() {
  return src(paths.html).pipe(dest(paths.baseDir)).pipe(browserSync.stream());
}

function styles() {
  return src([paths.styles, "!_*.scss"])
    .pipe(gulpif(config.isDevelopment, sourcemaps.init()))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(concat(names.outputCssFile))
    .pipe(
      cleanCss({
        level: 2,
      })
    )
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true })
    )
    .pipe(gulpif(config.isDevelopment, sourcemaps.write()))
    .pipe(dest(paths.outputCssDir))
    .pipe(browserSync.stream());
}

// sourcemaps не работают если файлы заканчиваются на crlf
function scripts() {
  return src([paths.js, "!./src/js/**/_*.js"])
    .pipe(gulpif(config.isDevelopment, sourcemaps.init()))
    .pipe(include())
    .pipe(gulpif(!config.isDevelopment, uglify()))
    .pipe(gulpif(config.isDevelopment, sourcemaps.write()))
    .pipe(dest(paths.outputJsDir))
    .pipe(browserSync.stream());
}

function images() {
  return src(paths.img)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(paths.outputImgDir));
}

function fonts() {
  return src(paths.fonts).pipe(ttf2woff2()).pipe(dest(paths.outputFontsDir));
}

function iconFont(done) {
  if (config.isIconfontUsed) {
    return src(paths.forIconfont)
      .pipe(
        iconfontCss({
          fontName: names.iconfontName,
        })
      )
      .pipe(
        iconfont({
          fontName: names.iconfontName,
        })
      )
      .pipe(dest(paths.outputIconfontDir));
  }

  done();
}

function doc(done) {
  if (config.documentation) {
    return src(paths.js, { read: false }).pipe(jsDoc(done));
  }

  done();
}

function watcher(done) {
  watch([paths.js], series(scripts, doc));
  watch([paths.styles], styles);
  watch([paths.html], series(html));
  watch([paths.img], series(images));

  done();
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.html = html;
exports.clean = clean;
exports.watcher = watcher;
exports.images = images;
exports.fonts = fonts;
exports.iconFont = iconFont;
exports.doc = doc;

exports.doc = series(doc);

exports.build = series(
  clean,
  parallel(html, scripts, styles, fonts, images, iconFont)
);

exports.default = series(
  clean,
  parallel(html, scripts, styles, fonts, images, iconFont),
  browsersync,
  watcher
);
