'use strict';

var _    = require('lodash');
var path = require('path');

var packageJSON = require('../package');
var utility     = require('./utility');

var languages,
    header = utility.regex.header;

function buildLanguages() {
  var input  = languages,
      output = path.join(dir.build, 'lib', 'languages'),

      replaceArgs = utility.replace(header, ''),
      template    = 'module.exports = <%= content %>;';

  return {
    logjs: { task: ['log', 'Building language files.'] },
    readjs: { requires: 'logjs', task: ['glob', input] },
    replacejs: { requires: 'readjs', task: ['replace', replaceArgs] },
    templatejs: { requires: 'replacejs', task: ['template', template] },
    writejslog: {
      requires: 'templatejs',
      task: ['log', 'Writing language files.']
    },
    writejs: { requires: 'writejslog', task: ['dest', output] }
  };
}

function buildCore() {
  var input    = path.join(dir.root, 'src', 'highlight.js'),
      output   = path.join(dir.build, 'lib'),

      replaceArgs = utility.replace(header, ''),
      template    = 'var Highlight = <%= content %>;' +
                    '\nmodule.exports = Highlight;';

  return {
    logCore: { task: ['log', 'Building core file.'] },
    readCore: { requires: 'logCore',  task: ['read', input] },
    replaceCore: { requires: 'readCore', task: ['replace', replaceArgs] },
    templateCore: {
      requires: 'replaceCore',
      task: ['template', template]
    },
    writeCoreLog: {
      requires: 'templateCore',
      task: ['log', 'Writing core file.']
    },
    writeCore: { requires: 'writeCoreLog', task: ['dest', output] }
  };
}

function buildIndex() {
  var input  = languages,
      output = path.join(dir.build, 'lib', 'index.js'),

      template =
    [ 'var Highlight = require(\'./highlight\');'
    , 'var hljs      = new Highlight();\n'
    , '<% _.each(names, function(name) { %>' +
      'hljs.registerLanguage(\'<%= name %>\', ' +
      'require(\'./languages/<%= name %>\'));'
    , '<% }); %>'
    , 'module.exports = hljs;'
    ];

  return {
    logIndex: { task: ['log', 'Building index file.'] },
    readIndex: { requires: 'logIndex', task: ['glob', input] },
    reorderIndex: { requires: 'readIndex', task: 'reorderDeps' },
    templateIndex: {
      requires: 'reorderIndex',
      task: ['templateAll', template.join('\n')]
    },
    writeIndexLog: {
      requires: 'templateIndex',
      task: ['log', 'Writing index file.']
    },
    writeIndex: { requires: 'writeIndexLog', task: ['write', output] }
  };
}

function copyMetaFiles() {
  var docs   = path.join('docs', '*.rst'),
      glob   = '{README.md,LICENSE,' + docs + '}',

      input  = { pattern: path.join(dir.root, glob) },
      output = { dir: dir.build, base: '.' };

  return {
    logMeta: { task: ['log', 'Copying meta files.'] },
    readMeta: { requires: 'logMeta', task: ['glob', input] },
    writeMetaLog: {
      requires: 'readMeta',
      task: ['log', 'Writing meta files.']
    },
    writeMeta: { requires: 'writeMetaLog', task: ['dest', output] }
  };
}

function buildStyles() {
  var input  = path.join(dir.root, 'src', 'styles', '*.css'),
      output = path.join(dir.build, 'styles');

  return {
    logcss: { task: ['log', 'Building style files.'] },
    readcss: {
      requires: 'logcss',
      task: ['glob', { pattern: input }]
    },
    writecsslog: {
      requires: 'readcss',
      task: ['log', 'Writing style files.']
    },
    writecss: { requires: 'readcss', task: ['dest', output] }
  };
}

function buildPackageFile() {
  var input  = path.join(dir.root, 'AUTHORS.en.txt'),
      output = path.join(dir.build, 'package.json');

  return {
    logpkg: { task: ['log', 'Building package.json file.'] },
    readpkg: { requires: 'logpkg', task: ['read', input] },
    buildpkg: {
      requires: 'readpkg',
      task: ['buildPackage', packageJSON]
    },
    writepkglog: {
      requires: 'buildpkg',
      task: ['log', 'Writing package.json file.']
    },
    writepkg: { requires: 'writepkglog', task: ['write', output] }
  };
}

module.exports = function(commander) {
  languages = utility.languagesGlob(commander.args, true);

  return _.merge(
    buildLanguages(),
    buildCore(),
    buildIndex(),
    buildStyles(),
    copyMetaFiles(),
    buildPackageFile());
};
