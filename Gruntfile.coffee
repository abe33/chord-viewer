
npm = require './tasks/npm'
remapify = require 'remapify'

JASMINE_MODULE = 'node_modules/jasmine/node_modules/jasmine-core'

module.exports = (grunt) ->
  grunt.initConfig

    #     ######   #######  ######## ######## ######## ########
    #    ##    ## ##     ## ##       ##       ##       ##
    #    ##       ##     ## ##       ##       ##       ##
    #    ##       ##     ## ######   ######   ######   ######
    #    ##       ##     ## ##       ##       ##       ##
    #    ##    ## ##     ## ##       ##       ##       ##
    #     ######   #######  ##       ##       ######## ########
    coffee:
      lib:
        expand: true
        cwd: 'src/'
        src: ['**/*.coffee']
        dest: 'lib/'
        ext: '.js'

    uglify:
      all:
        files:
          'build/chord-viewer.min.js': ['build/chord-viewer.js']

    browserify:
      lib:
        options:
          transform: ['coffeeify']
          browserifyOptions:
            extensions: ['.coffee']
        files:
          'build/chord-viewer.js': [
            'src/**/*.coffee'
          ]
          'build/chord-viewer.spec.js': [
            'spec/support/spec_helper.coffee'
            'spec/support/**/*.coffee'
            'spec/**/*.coffee'
          ]

    #     ######   #######  ########  ##    ##
    #    ##    ## ##     ## ##     ##  ##  ##
    #    ##       ##     ## ##     ##   ####
    #    ##       ##     ## ########     ##
    #    ##       ##     ## ##           ##
    #    ##    ## ##     ## ##           ##
    #     ######   #######  ##           ##
    copy:
      jasmine:
        files: [
          {
            expand: true
            cwd: "#{JASMINE_MODULE}/images"
            src: "jasmine_favicon.png"
            dest: 'build/spec'
            flatten: true
          }
          {
            expand: true
            cwd: "#{JASMINE_MODULE}/lib/jasmine-core"
            src: [
              "jasmine.css"
              "jasmine.js"
              "jasmine-html.js"
              "boot.js"
            ]
            dest: 'build/spec'
            flatten: true
          }
        ]

    #          ##    ###    ########  ########
    #          ##   ## ##   ##     ## ##
    #          ##  ##   ##  ##     ## ##
    #          ## ##     ## ##     ## ######
    #    ##    ## ######### ##     ## ##
    #    ##    ## ##     ## ##     ## ##
    #     ######  ##     ## ########  ########
    jade:
      jasmine:
        options:
          pretty: false
          compiledDebug: false
          data:
            debug: false

        files:
          'build/spec/jasmine.html': 'spec/support/jasmine.jade'

    #     ######  ######## ##    ## ##       ##     ##  ######
    #    ##    ##    ##     ##  ##  ##       ##     ## ##    ##
    #    ##          ##      ####   ##       ##     ## ##
    #     ######     ##       ##    ##       ##     ##  ######
    #          ##    ##       ##    ##       ##     ##       ##
    #    ##    ##    ##       ##    ##       ##     ## ##    ##
    #     ######     ##       ##    ########  #######   ######
    # stylus:
    #   build:
    #     options:
    #       compress: true
    #       paths: ['demos/assets/css/partials']
    #     files:
    #       'demos/build/assets/css/index.css': [
    #         'demos/assets/css/index.styl'
    #       ]

    #    ##      ##    ###    ########  ######  ##     ##
    #    ##  ##  ##   ## ##      ##    ##    ## ##     ##
    #    ##  ##  ##  ##   ##     ##    ##       ##     ##
    #    ##  ##  ## ##     ##    ##    ##       #########
    #    ##  ##  ## #########    ##    ##       ##     ##
    #    ##  ##  ## ##     ##    ##    ##    ## ##     ##
    #     ###  ###  ##     ##    ##     ######  ##     ##
    watch:
      scripts:
        files: ['src/**/*.coffee', 'spec/**/*.coffee']
        tasks: ['all']
        options:
          livereload: true
          livereloadOnError: true

      # stylus:
      #   files: ['demos/assets/css/**/*.styl']
      #   tasks: ['stylus']
      #   options:
      #     livereload: true
      #     livereloadOnError: false
      #
      # demos:
      #   files: ['demos/**/*.coffee']
      #   tasks: ['biscotto', 'coffee:docs', 'browserify:demos', 'extend:biscotto']

      config:
        files: ['Gruntfile.coffee', 'tasks/*.coffee']
        options:
          reload: true

      npm:
        files: ['package.json']
        tasks: ['npm:install']

    #     ######   ########   #######  ##      ## ##
    #    ##    ##  ##     ## ##     ## ##  ##  ## ##
    #    ##        ##     ## ##     ## ##  ##  ## ##
    #    ##   #### ########  ##     ## ##  ##  ## ##
    #    ##    ##  ##   ##   ##     ## ##  ##  ## ##
    #    ##    ##  ##    ##  ##     ## ##  ##  ## ##
    #     ######   ##     ##  #######   ###  ###  ########
    growl:
      jasmine_success:
        title: 'Jasmine Tests'
        message: 'All tests passed'

      jasmine_failure:
        title: 'Jasmine Tests'
        message: 'Some tests failed'

  #    ########    ###     ######  ##    ##  ######
  #       ##      ## ##   ##    ## ##   ##  ##    ##
  #       ##     ##   ##  ##       ##  ##   ##
  #       ##    ##     ##  ######  #####     ######
  #       ##    #########       ## ##  ##         ##
  #       ##    ##     ## ##    ## ##   ##  ##    ##
  #       ##    ##     ##  ######  ##    ##  ######
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-stylus')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-jade')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-growl')

  npm(grunt)

  grunt.registerTask('all', [
    'coffee:lib'
    'browserify:lib'
    'uglify'
    'jade'
    # 'stylus'
    'copy'
    'npm:test'
  ])
  grunt.registerTask('default', ['all'])
