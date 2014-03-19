/* jshint node: true */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = require('regexp-quote')
  var btoa = require('btoa')
  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
              ' * Energy Inspctors, Inc. v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' */\n\n',
    jqueryCheck: 'if (typeof jQuery === "undefined") { throw new Error("Bootstrap requires jQuery") }\n\n',

    // Task configuration.
    clean: {
      build: ['build']
      ,test: ['test']
      ,dist: ['dist']
    },

    /*jshint: {
      options: {
        jshintrc: 'src/scripts/bootstrap/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['src/scripts/bootstrap/*.js']
      },
      test: {
        src: ['src/scripts/bootstrap/tests/unit/*.js']
      }
      assets: {
        src: ['archive/docs-assets/js/application.js', 'archive/docs-assets/js/customizer.js']
      }
    },*/

    /*jscs: {
      options: {
        config: 'src/scripts/bootstrap/.jscs.json',
      },
      gruntfile: {
        src: ['Gruntfile.js']
      },
      src: {
        src: ['src/scripts/bootstrap/*.js']
      },
      test: {
        src: ['src/scripts/bootstrap/tests/unit/*.js']
      }
    },*/

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: ['build/styles/main.css', 'build/styles/jquery.fancybox.css']
    },

    concat: {
      options: {
        stripBanners: true
      }
      ,plugins: {
        src: [
          'bower_components/html5-boilerplate/js/plugins.js'
          ,'bower_components/ResponsiveSlides.js/responsiveslides.min.js'
          ,'src/scripts/lib/jquery.fancybox.pack.js'
        ],
        dest: 'src/scripts/plugins.js'
      }
      ,less: {
        src: [
          'src/styles/less/jquery.fancybox.less'
          ,'src/styles/less/main.less'
        ],
        dest: 'src/styles/main.less'
      }
      ,html_index: {
        src: [
          'src/html/partials/_head.html'
          ,'src/html/partials/_header.html'
          ,'src/html/partials/_index.html'
          ,'src/html/partials/_footer-index.html'
          ,'src/html/partials/_foot.html'
        ],
        dest: 'build/index.html'
      }
      ,html_error: {
        src: [
          'src/html/partials/_head.html'
          ,'src/html/partials/_header-error.html'
          ,'src/html/partials/_error.html'
          ,'src/html/partials/_footer-error.html'
          ,'src/html/partials/_foot.html'
        ],
        dest: 'build/error.html'
      }
      ,html_solutions: {
        src: [
          'src/html/partials/_head.html'
          ,'src/html/partials/_header.html'
          ,'src/html/partials/_solutions.html'
          ,'src/html/partials/_footer.html'
          ,'src/html/partials/_foot.html'
        ],
        dest: 'build/solutions.html'
      }
      ,html_about: {
        src: [
          'src/html/partials/_head.html'
          ,'src/html/partials/_header.html'
          ,'src/html/partials/_about.html'
          ,'src/html/partials/_footer.html'
          ,'src/html/partials/_foot.html'
        ],
        dest: 'build/about.html'
      }
    },

    htmlmin: { 
      test: { 
        options: { // Target options: https://github.com/gruntjs/grunt-contrib-htmlmin
          removeComments: false
          ,collapseWhitespace: false
          ,removeCommentsFromCDATA: false
          ,removeCDATASectionsFromCDATA: false
          ,collapseBooleanAttributes: false
          ,removeAttributeQuotes: false
          ,removeRedundantAttributes: false
          ,useShortDoctype: false
          ,removeEmptyAttributes: true
          ,removeOptionalTags: false
          ,removeEmptyElements: false
        },
        files: { 
          'test/index.html': 'build/index.html'
          ,'test/about.html': 'build/about.html'
          ,'test/error.html': 'build/error.html'
          ,'test/solutions.html': 'build/solutions.html'
        }
      },
      dist: { 
        options: { // Target options: https://github.com/gruntjs/grunt-contrib-htmlmin
          removeComments: true
          ,collapseWhitespace: true 
          ,removeCommentsFromCDATA: true
          ,removeCDATASectionsFromCDATA: false
          ,collapseBooleanAttributes: false
          ,removeAttributeQuotes: false
          ,removeRedundantAttributes: false
          ,useShortDoctype: false
          ,removeEmptyAttributes: true
          ,removeOptionalTags: false
          ,removeEmptyElements: false
        },
        files: { 
          'dist/index.html': 'build/index.html' 
          ,'dist/about.html': 'build/about.html'
          ,'dist/error.html': 'build/error.html'
          ,'dist/solutions.html': 'build/solutions.html'
        }
      }
    },

    less: {
      build: {
        options: {
          strictMath: true
          ,sourceMap: false
        },
        files: {
          'build/styles/main.css': 'src/styles/main.less'
        }
      },
      test: {
        options: {
          strictMath: true
          ,sourceMap: true
        },
        files: {
          'test/styles/main.css': 'src/styles/main.less'
        }
      },
      dist: {
        options: {
          strictMath: true
          ,cleancss: true
          ,report: 'min'
        },
        files: {
          'dist/styles/main.css': 'src/styles/main.less'
        }
      },
      gzip: {
        options: {
          strictMath: true
          ,cleancss: true
          ,report: 'gzip'
        },
        files: {
          'dist/styles/main.css.gzip': 'src/styles/main.less'
        }
      }
    },

    csscomb: {
      test: {
        sort: {
          options: {
            sortOrder: '.csscomb.json'
          },
          files: {
            'test/styles/main.css': ['build/styles/main.css']
          }
        }
      },
      dist: {
        sort: {
          options: {
            sortOrder: '.csscomb.json'
          },
          files: {
            'dist/styles/main.css': ['build/styles/main.css']
          }
        }
      }
    },

    uglify: {
      build: {
        options: {
          mangle: false
          , compress: false
          , beautify: true
          , report: false
          , preserveComments: true
        },
        files: {
          'build/scripts/main.js':'src/scripts/main.js'
          ,'build/scripts/plugins.js':'src/scripts/plugins.js'
        }
      },
      test: {
        options: {
          mangle: false
          , compress: false
          , beautify: true
          , report: false
          , sourceMap: 'test/scripts/source-map.js'
          , sourceMapRoot: 'src/scripts/'
          , preserveComments: true
        },
        files: {
          'test/scripts/main.js':'build/scripts/main.js'
          ,'test/scripts/plugins.js':'build/scripts/plugins.js'
        }
      },
      dist: {
        options: {
          mangle: false //(only main.js, plugins.js)
          , compress: true
          , beautify: false
          , report: 'min'
          , sourceMap: 'dist/scripts/source-map.js'
          , sourceMapRoot: 'src/scripts/'
          , preserveComments: false
        },
        files: {
          'dist/scripts/main.js':'build/scripts/main.js'
          ,'dist/scripts/plugins.js':'build/scripts/plugins.js'
        }
      },
      gzip: {
        options: {
          mangle: false //(only main.js, plugins.js)
          , compress: true
          , beautify: false
          , report: 'gzip'
          , sourceMap: 'dist/scripts/source-map.js'
          , sourceMapRoot: 'src/scripts/'
          , preserveComments: false
        },
        files: {
          'dist/scripts/main.js':'build/scripts/main.js'
          ,'dist/scripts/plugins.js':'build/scripts/plugins.js'
        }
      }
    },

    copy: {
      build: {
        files: [
          {expand: true, flatten: true, src: ["bower_components/html5-boilerplate/crossdomain.xml"], dest: 'build/'}
          ,{expand: true, flatten: true, src: ["bower_components/html5-boilerplate/humans.txt"], dest: 'build/'}
          ,{expand: true, flatten: true, src: ["bower_components/html5-boilerplate/robots.txt"], dest: 'build/'}
          ,{expand: true, flatten: true, src: ["bower_components/ResponsiveSlides.js/responsiveslides.min.js"], dest: 'build/scripts/lib/'}
          ,{expand: true, flatten: true, src: ["src/scripts/lib/**/*.js"], dest: 'build/scripts/lib/'}
          ,{expand: true, flatten: true, src: ["src/images/**/*"], dest: 'build/images/'}
          ,{expand: true, flatten: true, src: ["src/fonts/**/*.ttf"], dest: 'build/fonts/'}
        ]
      },
      test: {
        files: [
          {expand: true, flatten: true, src: ["build/images/*"], dest: 'test/images/'}
          ,{expand: true, flatten: true, src: ["build/fonts/*"], dest: 'test/fonts/'}
          ,{expand: true, flatten: true, src: ["build/scripts/lib/**/*"], dest: 'test/scripts/lib/'}
          ,{expand: true, flatten: true, src: ["build/crossdomain.xml"], dest: 'test/'}
          ,{expand: true, flatten: true, src: ["build/humans.txt"], dest: 'test/'}
          ,{expand: true, flatten: true, src: ["build/robots.txt"], dest: 'test/'}
        ]
      },
      dist: {
        files: [
          {expand: true, flatten: true, src: ["build/images/*"], dest: 'dist/images/'}
          ,{expand: true, flatten: true, src: ["build/fonts/*"], dest: 'dist/fonts/'}
          ,{expand: true, flatten: true, src: ["build/scripts/lib/**/*"], dest: 'dist/scripts/lib/'}
          ,{expand: true, flatten: true, src: ["build/crossdomain.xml"], dest: 'dist/'}
          ,{expand: true, flatten: true, src: ["build/humans.txt"], dest: 'dist/'}
          ,{expand: true, flatten: true, src: ["build/robots.txt"], dest: 'dist/'}
        ]
      }    
    },

    /*qunit: {
      options: {
        inject: 'scripts/bootstrap/tests/unit/phantom.js'
      },
      files: ['scripts/bootstrap/tests/*.html']
    },*/

    connect: {
      test: {
        options: {
          port: 3000
          ,base: './test/'
          ,keepalive: true
        }
      },
      dist: {
        options: {
          port: 3001
          ,base: './dist/'
          ,keepalive: true
        }
      }
    },

    validation: {
      options: {
        reset: true,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'Element img is missing required attribute src.'
        ]
      },
      files: {
        src: ['build/**/*.html']
      }
    },

    /*watch: {
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
      less: {
        files: 'src/styles/less/*.less',
        tasks: ['less']
      }
    },*/

  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-jscs-checker');
  grunt.loadNpmTasks('grunt-saucelabs');
  grunt.loadNpmTasks('grunt-sed');

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['jekyll', 'validation']);

  // Test task.
  var testSubtasks = ['dist-css', 'jshint', 'jscs', 'qunit', 'validate-html'];
  // Only run Sauce Labs tests if there's a Sauce access key
  if (typeof process.env.SAUCE_ACCESS_KEY !== 'undefined') {
    testSubtasks.push('connect');
    testSubtasks.push('saucelabs-qunit');
  }
  grunt.registerTask('test', testSubtasks);

  // concat & stage uncompiled sources for builds 
  grunt.registerTask('build', [
      'clean:build'
      ,'copy:build'
      ,'concat:plugins'
      ,'concat:less'
      ,'concat:html_index'
      ,'concat:html_about'
      ,'concat:html_error'
      ,'concat:html_solutions'
      ,'less:build'
      ,'uglify:build'
  ]);
  
  // build test site, no minification
  grunt.registerTask('test', [
      'build'
      ,'clean:test'
      ,'less:test' 
      ,'copy:test'
      ,'htmlmin:test'
      ,'uglify:test'
  ]);

  // build production site, everything compiled & minified
  grunt.registerTask('dist', [
      'build'
      ,'clean:dist'
      ,'less:dist' 
      ,'copy:dist'
      ,'htmlmin:dist'
      ,'uglify:dist'
  ]);

  // build production site, everything compiled & minified
  grunt.registerTask('gzip', [
      'build'
      ,'clean:dist'
      ,'less:gzip' 
      ,'copy:dist'
      ,'htmlmin:dist'
      ,'uglify:gzip'
  ]);

  // Default task.
  grunt.registerTask('default', ['test','dist']);

  // Version numbering task.
  // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
  // This can be overzealous, so its changes should always be manually reviewed!
  grunt.registerTask('change-version-number', ['sed']);

};
