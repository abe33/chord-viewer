
npm = require './tasks/npm'
remapify = require 'remapify'

module.exports = (grunt) ->
  grunt.initConfig

    ####     ######   #######  ######## ######## ######## ########
    ####    ##    ## ##     ## ##       ##       ##       ##
    ####    ##       ##     ## ##       ##       ##       ##
    ####    ##       ##     ## ######   ######   ######   ######
    ####    ##       ##     ## ##       ##       ##       ##
    ####    ##    ## ##     ## ##       ##       ##       ##
    ####     ######   #######  ##       ##       ######## ########
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
            'specs/support/spec_helper.coffee'
            'specs/support/**/*.coffee'
            'specs/units/**/*.coffee'
          ]

      # demos:
      #   options:
      #     transform: ['coffeeify']
      #     browserifyOptions:
      #       extensions: ['.coffee']
      #     preBundleCB: (b) ->
      #       b.plugin(remapify, [
      #         {
      #           cwd: __dirname
      #           src: './lib/**/*.js'
      #           expose: 'chord-viewer'
      #           filter: (alias, dirname, basename) ->
      #             alias = alias
      #             .replace(/\/lib\//, '/')
      #             .replace(/\/index\.js$/, '')
      #             .replace(/\.js$/, '')
      #             alias
      #         }
      #       ])
      #
      #   files:
      #     'build/index.js': ['demos/assets/js/index.coffee']

    ####     ######  ######## ##    ## ##       ##     ##  ######
    ####    ##    ##    ##     ##  ##  ##       ##     ## ##    ##
    ####    ##          ##      ####   ##       ##     ## ##
    ####     ######     ##       ##    ##       ##     ##  ######
    ####          ##    ##       ##    ##       ##     ##       ##
    ####    ##    ##    ##       ##    ##       ##     ## ##    ##
    ####     ######     ##       ##    ########  #######   ######
    # stylus:
    #   build:
    #     options:
    #       compress: true
    #       paths: ['demos/assets/css/partials']
    #     files:
    #       'demos/build/assets/css/index.css': [
    #         'demos/assets/css/index.styl'
    #       ]

    ####    ##      ##    ###    ########  ######  ##     ##
    ####    ##  ##  ##   ## ##      ##    ##    ## ##     ##
    ####    ##  ##  ##  ##   ##     ##    ##       ##     ##
    ####    ##  ##  ## ##     ##    ##    ##       #########
    ####    ##  ##  ## #########    ##    ##       ##     ##
    ####    ##  ##  ## ##     ##    ##    ##    ## ##     ##
    ####     ###  ###  ##     ##    ##     ######  ##     ##
    watch:
      scripts:
        files: ['src/**/*.coffee', 'specs/**/*.coffee']
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

    ####     ######   ########   #######  ##      ## ##
    ####    ##    ##  ##     ## ##     ## ##  ##  ## ##
    ####    ##        ##     ## ##     ## ##  ##  ## ##
    ####    ##   #### ########  ##     ## ##  ##  ## ##
    ####    ##    ##  ##   ##   ##     ## ##  ##  ## ##
    ####    ##    ##  ##    ##  ##     ## ##  ##  ## ##
    ####     ######   ##     ##  #######   ###  ###  ########
    growl:
      jasmine_success:
        title: 'Jasmine Tests'
        message: 'All tests passed'

      jasmine_failure:
        title: 'Jasmine Tests'
        message: 'Some tests failed'

  ####    ########    ###     ######  ##    ##  ######
  ####       ##      ## ##   ##    ## ##   ##  ##    ##
  ####       ##     ##   ##  ##       ##  ##   ##
  ####       ##    ##     ##  ######  #####     ######
  ####       ##    #########       ## ##  ##         ##
  ####       ##    ##     ## ##    ## ##   ##  ##    ##
  ####       ##    ##     ##  ######  ##    ##  ######
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-stylus')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-growl')

  npm(grunt)

  grunt.registerTask('all', [
    'coffee:lib'
    'browserify:lib'
    'uglify'
    # 'stylus'
    'npm:test'
    # 'browserify:demos'
  ])
  grunt.registerTask('default', ['all'])
