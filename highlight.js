/*

Автоматическая javascript'овая подсветка синтаксиса на веб-страницах.

URL:   http://softwaremaniacs.org/soft/highlight/
Автор: Иван Сагалаев <Maniac@SoftwareManiacs.Org>

Внесли свой вклад:

- Леонов Петр <gojpeg@gmail.com> 

*/

var IDENT_RE = '[a-zA-Z][a-zA-Z0-9_]*';
var NUMBER_RE = '\\b\\d+';

var LANGUAGES = {}

LANGUAGES.python = {
  defaultMode: {
    lexems: [
      new RegExp(IDENT_RE)
    ],
    contains: ['comment', 'string', 'function', 'class', 'number'],
    keywords: ['and', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'exec', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'None', 'not', 'or', 'pass', 'print', 'raise', 'return', 'try', 'while', 'yield']
  },
  modes: [
    {
      className: 'function',
      lexems: [
        new RegExp(IDENT_RE)
      ],
      begin: 'def ', end: ':$',
      keywords: ['def '],
      contains: ['title', 'params'],
      relevance: 10
    },
    {
      className: 'class',
      lexems: [
        new RegExp(IDENT_RE)
      ],
      begin: 'class ', end: ':$',
      keywords: ['class '],
      contains: ['title', 'params'],
      relevance: 10
    },
    {
      className: 'title',
      begin: IDENT_RE, end: '^'
    },
    {
      className: 'params',
      begin: '\\(', end: '\\)',
      contains: ['string']
    },
    {
      className: 'comment',
      begin: '#', end: '$'
    },
    {
      className: 'number',
      begin: NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: '\'\'\'', end: '\'\'\'',
      relevance: 10
    },
    {
      className: 'string',
      begin: '"""', end: '"""',
      relevance: 10
    },
    {
      className: 'string',
      begin: '\'', end: '(^|[^\\\\])\'',
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '(^|[^\\\\])"',
      relevance: 0
    },
    {
      className: 'string',
      begin: 'r\'', end: '\''
    },
    {
      className: 'string',
      begin: 'r"', end: '"'
    },
    {
      className: 'string',
      begin: 'u\'', end: '(^|[^\\\\])\''
    },
    {
      className: 'string',
      begin: 'u"', end: '(^|[^\\\\])"'
    },
    {
      className: 'string',
      begin: 'ur\'', end: '\''
    },
    {
      className: 'string',
      begin: 'ur"', end: '"'
    }
  ]
};//python

var HTML_TAGS = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'b', 'base', 'basefont', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl', 'dt', 'em', 'fieldset', 'font', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'isindex', 'kbd', 'label', 'legend', 'li', 'link', 'map', 'menu', 'meta', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'q', 's', 'samp', 'script', 'select', 'small', 'span', 'strike', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'tt', 'u', 'ul', 'var', 'xml', 'xmlns']

LANGUAGES.html = {
  defaultMode: {
    contains: ['tag', 'comment']
  },
  case_insensitive: true,
  modes: [
    {
      className: 'comment',
      begin: '<!--', end: '-->'
    },
    {
      className: 'tag',
      lexems: [
        /[a-zA-Z][a-zA-Z0-9_]*/
      ],
      keywords: HTML_TAGS,
      begin: '<', end: '>',
      contains: ['attribute']
    },
    {
      className: 'attribute',
      begin: ' [a-zA-Z]+=', end: '^',
      contains: ['value']
    },
    {
      className: 'attribute',
      begin: ' [a-zA-Z]+', end: '^'
    },
    {
      className: 'value',
      begin: '"', end: '"'
    },
    {
      className: 'value',
      begin: '[a-zA-Z0-9]+', end: '^'
    }
  ]
};//html

LANGUAGES.css = {
  defaultMode: {
    contains: ['id', 'class', 'rules', 'comment'],
    keywords: HTML_TAGS,
    lexems: [
      new RegExp(IDENT_RE)
    ]
  },
  modes: [
    {
      className: 'id',
      begin: '\\#[A-Za-z0-9_-]+', end: '^'
    },
    {
      className: 'class',
      begin: '\\.[A-Za-z0-9_-]+', end: '^',
      relevance: 0
    },
    {
      className: 'rules',
      begin: '{', end: '}',
      lexems: [
        /[A-Za-z-]+/
      ],
      keywords: ['background', 'background-attachment', 'background-color', 'background-image', 'background-position', 'background-repeat', 'border', 'border-bottom', 'border-bottom-width', 'border-color', 'border-left', 'border-left-width', 'border-right', 'border-right-width', 'border-style', 'border-top', 'border-top-width', 'border-width', 'clear', 'color', 'display', 'float', 'font', 'font-family', 'font-size', 'font-style', 'font-variant', 'font-weight', 'height', 'letter-spacing', 'line-height', 'list-style', 'list-style-image', 'list-style-position', 'list-style-type', 'margin', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'text-align', 'text-decoration', 'text-indent', 'text-transform', 'vertical-align', 'white-space', 'width', 'word-spacing'],
      contains: ['comment', 'value']
    },
    {
      className: 'comment',
      begin: '/\\*', end: '\\*/'
    },
    {
      className: 'value',
      begin: ':', end: ';', endsWithParent: true, 
      excludeBegin: true, excludeEnd: true
    }
  ]
};//css

var DELPHI_KEYWORDS = ['and', 'array', 'asm', 'begin', 'case', 'cdecl', 'class', 'const', 'constructor', 'destructor', 'div', 'do', 'downto', 'else', 'end', 'end.', 'except', 'exit', 'exports', 'external', 'far', 'file', 'finalization', 'finally', 'for', 'function', 'goto', 'if', 'implementation', 'in', 'index', 'inherited', 'initialization', 'inline', 'interface', 'label', 'library', 'mod', 'near', 'nil', 'not', 'object', 'of', 'on', 'or', 'out', 'overload', 'override', 'packed', 'pascal', 'procedure', 'program', 'raise', 'record', 'register', 'repeat', 'resourcestring', 'safecall', 'set', 'shl', 'shr', 'stdcall', 'stored', 'string', 'then', 'threadvar', 'to', 'try', 'type', 'unit', 'until', 'uses', 'var', 'virtual', 'while', 'with', 'xorwrite'];
var DELPHI_CLASS_KEYWORDS = ['and', 'array', 'asm', 'begin', 'case', 'cdecl', 'class', 'const', 'constructor', 'default', 'destructor', 'div', 'do', 'downto', 'else', 'end', 'end.', 'except', 'exit', 'exports', 'external', 'far', 'file', 'finalization', 'finally', 'for', 'function', 'goto', 'if', 'implementation', 'in', 'index', 'inherited', 'initialization', 'inline', 'interface', 'label', 'library', 'message', 'mod', 'near', 'nil', 'not', 'object', 'of', 'on', 'or', 'out', 'overload', 'override', 'packed', 'pascal', 'private', 'procedure', 'program', 'property', 'protected', 'public', 'published', 'raise', 'read', 'record', 'register', 'repeat', 'resourcestring', 'safecall', 'set', 'shl', 'shr', 'stdcall', 'stored', 'string', 'then', 'threadvar', 'to', 'try', 'type', 'unit', 'until', 'uses', 'var', 'virtual', 'while', 'with', 'write', 'xorwrite'];

LANGUAGES.delphi = {
  defaultMode: {
    lexems: [
      new RegExp(IDENT_RE, 'i')
    ],
    contains: ['comment', 'string', 'number', 'function', 'class'],
    keywords: DELPHI_KEYWORDS
  },
  case_insensitive: true,
  modes: [
    {
      className: 'comment',
      begin: '{', end: '}'
    },
    {
      className: 'comment',
      begin: '\\(\\*', end: '\\*\\)',
      relevance: 10
    },
    {
      className: 'comment',
      begin: '//', end: '$',
      relevance: 0
    },
    {
      className: 'number',
      begin: NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: '\'', end: '[^\\\']\'',
      relevance: 0
    },
    {
      className: 'function',
      begin: 'function', end: '[:;]',
      keywords: ['function', 'procedure'],
      contains: ['title', 'params', 'comment']
    },
    {
      className: 'function',
      begin: '(procedure|constructor|destructor)', end: ';',
      keywords: ['constructor', 'destructor', 'procedure'],
      contains: ['title', 'params', 'comment'],
      relevance: 10
    },
    {
      className: 'title',
      begin: IDENT_RE, end: '^'
    },
    {
      className: 'params',
      begin: '\\(', end: '\\)',
      lexems: [
        new RegExp(IDENT_RE, 'i')
      ],
      keywords: DELPHI_KEYWORDS,
      contains: ['string']
    },
    {
      className: 'class',
      begin: '=\\s*class', end: 'end;',
      lexems: [
        new RegExp(IDENT_RE, 'i')
      ],
      keywords: DELPHI_CLASS_KEYWORDS,
      contains: ['string', 'comment', 'function']
    }
  ]
};//delphi

/*

Определение для Perl (с) Леонов Петр <gojpeg@gmail.com> 

*/
LANGUAGES.perl = {
  defaultMode: {
    lexems: [
      new RegExp(IDENT_RE)
    ],
    contains: ['comment', 'string', 'number', 'regexp', 'sub'],
    keywords: ['abs', 'accept', 'alarm', 'atan2', 'bind', 'binmode', 'bless', 'caller', 'chdir', 'chmod', 'chomp', 'chop', 'chown', 'chr', 'chroot', 'close', 'closedir', 'connect', 'continue', 'cos', 'crypt', 'dbmclose', 'dbmopen', 'defined', 'delete', 'die', 'do', 'dump', 'each', 'else', 'elsif', 'endgrent', 'endhostent', 'endnetent', 'endprotoent', 'endpwent', 'endservent', 'eof', 'eval', 'exec', 'exists', 'exit', 'exp', 'fcntl', 'fileno', 'flock', 'for', 'foreach', 'fork', 'format', 'formline', 'getc', 'getgrent', 'getgrgid', 'getgrnam', 'gethostbyaddr', 'gethostbyname', 'gethostent', 'getlogin', 'getnetbyaddr', 'getnetbyname', 'getnetent', 'getpeername', 'getpgrp', 'getpriority', 'getprotobyname', 'getprotobynumber', 'getprotoent', 'getpwent', 'getpwnam', 'getpwuid', 'getservbyname', 'getservbyport', 'getservent', 'getsockname', 'getsockopt', 'glob', 'gmtime', 'goto', 'grep', 'hex', 'if', 'index', 'int', 'ioctl', 'join', 'keys', 'kill', 'last', 'last', 'lc', 'lcfirst', 'length', 'link', 'listen', 'local', 'localtime', 'log', 'lstat', 'ma', 'map', 'mkdir', 'msgctl', 'msgget', 'msgrcv', 'msgsnd', 'my', 'next', 'next', 'no', 'oct', 'open', 'opendir', 'ord', 'our', 'pack', 'package', 'pipe', 'pop', 'pos', 'print', 'printf', 'prototype', 'push', 'q', 'qq', 'quotemeta', 'qw', 'qx', 'rand', 'read', 'readdir', 'readline', 'readlink', 'readpipe', 'recv', 'redo', 'redo', 'ref', 'rename', 'require', 'reset', 'return', 'reverse', 'rewinddir', 'rindex', 'rmdir', 's', 'scalar', 'seek', 'seekdir', 'select', 'semctl', 'semget', 'semop', 'send', 'setgrent', 'sethostent', 'setnetent', 'setpgrp', 'setpriority', 'setprotoent', 'setpwent', 'setservent', 'setsockopt', 'shift', 'shmctl', 'shmget', 'shmread', 'shmwrite', 'shutdown', 'sin', 'sleep', 'socket', 'socketpair', 'sort', 'splice', 'split', 'sprintf', 'sqrt', 'srand', 'stat', 'study', 'sub', 'sub', 'substr', 'symlink', 'syscall', 'sysopen', 'sysread', 'sysseek', 'system', 'syswrite', 'tell', 'telldir', 'tie', 'tied', 'time', 'times', 'tr', 'truncate', 'uc', 'ucfirst', 'umask', 'undef', 'unless', 'unlink', 'unpack', 'unshift', 'untie', 'until', 'use', 'utime', 'values', 'vec', 'wait', 'waitpid', 'wantarray', 'warn', 'while', 'write', 'y']
  },
  modes: [
    {
      className: 'comment',
      begin: '#', end: '$'
    },
    {
      className: 'number',
      begin: NUMBER_RE, end: '^',
      relevance: 0
    },
    {
      className: 'string',
      begin: 'q\\(', end: '[^\\\\]\\)',
      relevance: 10
    },
    {
      className: 'regexp',
      // не совсем правда: у qr меньше квантификаторов, и не должна съедать ведущую небукву
      begin: '(m|qr|\\W)\\/', end: '(|[^\\\\])\\/[cgimosx]*',
      relevance: 10
    },
    {
      className: 'regexp',
      begin: 's\\/.*?(|[^\\\\])\\/', end: '(|[^\\\\])\\/[egimosx]*',
      relevance: 10
    },
    {
      className: 'regexp',
      begin: '(tr|y)\\/.*?(|[^\\\\])\\/', end: '(|[^\\\\])\\/[cds]*',
      relevance: 10
    },
    {
      className: 'sub',
      begin: 'sub ', end: '{',
      lexems: [
        new RegExp(IDENT_RE)
      ],
      keywords: ['sub '],
      relevance: 10
    },
    {
      className: 'string',
      begin: 'qq\\(', end: '(^|[^\\\\])\\)',
      relevance: 10
    },
    {
      className: 'string',
      begin: '\'', end: '(^|[^\\\\])\'',
      relevance: 0
    },
    {
      className: 'string',
      begin: '"', end: '(^|[^\\\\])"',
      relevance: 0
    }
  ]
};//perl

//Compiling RegExps
function langRe(language, value) {
  return new RegExp(value, language.case_insensitive ? 'mi' : 'm');
}//re
  
for (var i in LANGUAGES) {
  var language = LANGUAGES[i];
  for (var key in language.modes) {
    if (language.modes[key].begin)
      language.modes[key].begin = langRe(language, language.modes[key].begin);
    if (language.modes[key].end)
      language.modes[key].end = langRe(language, language.modes[key].end);
  }//for
}//for

var selected_languages = {};

function Highlighter(language_name, value) {
  this.currentMode = function(){
    return this.modes[this.modes.length - 1];
  }//currentMode
  
  this.highlight = function(value) {
    var index = 0;
    for (var lexem = this.getLexem(value, index); index < value.length; lexem = this.getLexem(value, index)) {
      this.processLexem(lexem);
      index += lexem.length;
    }//for
  }//highlight
  
  this.processLexem = function(lexem) {
    var new_mode = this.subMode(lexem)
    if (new_mode) {
      this.modes[this.modes.length] = new_mode;
      if (new_mode.excludeBegin)
        this.result += this.keyword(lexem) + '<span class="' + new_mode.className + '">';
      else
        this.result += '<span class="' + new_mode.className + '">' + this.keyword(lexem);
      this.relevance += this.currentMode().relevance != undefined ? this.currentMode().relevance : 1;
      return;
    }//if
    var end_level = this.endOfMode(this.modes.length - 1, lexem);
    if (end_level) {
      while (end_level > 1) {
        this.result += '</span>';
        end_level--;
        this.modes.length--;
      }//while
      if (this.currentMode().excludeEnd)
        this.result += '</span>' + this.keyword(lexem);
      else
        this.result += this.keyword(lexem) + '</span>';
      this.modes.length--;
      return;
    }//if
    this.result += this.keyword(lexem);
  }//processLexem

  this.keyword = function(lexem) {
    var html = lexem.replace(/&/gm, '&amp;').replace(/"/gm, '&quot;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
    if (this.language.case_insensitive)
      lexem = lexem.toLowerCase();
    if (bcontains(this.currentMode().keywords, lexem)) {
      this.keyword_count++;
      return '<span class="keyword">' + html + '</span>';
    } else {
      return html;
    }//if
  }//keyword

  this.subMode = function(lexem) {
    if (!this.currentMode().contains)
      return null;
    for (var key in this.language.modes)
      if (contains(this.currentMode().contains, this.language.modes[key].className) && this.language.modes[key].begin.test(lexem))
        return this.language.modes[key];
    return null;
  }//subMode

  this.endOfMode = function(mode_index, lexem) {
    if (this.modes[mode_index].end && this.modes[mode_index].end.test(lexem))
      return 1;
    if (this.modes[mode_index].endsWithParent) {
      var level = this.endOfMode(mode_index - 1, lexem);
      return level ? level + 1 : 0;
    }//if
    return 0;
  }//endOfMode

  this.getLexem = function(value, index) {
    var terminators = [];
    if (this.currentMode().contains)
      for (var key in this.language.modes) {
        if (contains(this.currentMode().contains, this.language.modes[key].className))
          terminators[terminators.length] = this.language.modes[key].begin;
      }//for
    var mode_index = this.modes.length - 1;
    do {
      if (this.modes[mode_index].end)
        terminators[terminators.length] = this.modes[mode_index].end;
      mode_index--;
    } while (this.modes[mode_index + 1].endsWithParent);
    if (this.currentMode().lexems)
      terminators = terminators.concat(this.currentMode().lexems);
    value = value.substr(index);
    var min_index = value.length + 1;
    var min_match = null;
    for (var key in terminators) {
      var match = terminators[key].exec(value);
      if (match && match.index < min_index) {
        min_match = match;
        min_index = match.index;
      }//if
    }//for
    if (min_match) {
      if (min_match.index == 0)
        return min_match[0];
      else
        return value.substr(0, min_match.index);
    }//if
    return value;
  }//getLexem
  
  this.language_name = language_name;
  this.language = LANGUAGES[language_name];
  this.modes = [this.language.defaultMode];
  this.relevance = 0;
  this.keyword_count = 0;
  this.result = '';
  this.highlight(value);
}//Highlighter

function contains(array, item) {
  if (!array)
    return false;
  for (var key in array)
    if (array[key] == item)
      return true;
  return false;
}//contains

function bcontains(array, item) {
  if (!array || !array.length)
    return false;
  var left = -1;
  var right = array.length;
  var current = parseInt((right + left) / 2);
  while ((right - left > 1) && item != array[current]) {
    if (item < array[current])
      right = current;
    else
      left = current;
    current = parseInt((right + left) / 2);
  }//while
  return item == array[current];
}//bcontains

function initHighlighting() {
  if (arguments.length) {
    for (var i = 0; i < arguments.length; i++) {
      if (LANGUAGES[arguments[i]]) {
        selected_languages[arguments[i]] = LANGUAGES[arguments[i]];
      }//if
    }//for
  } else
    selected_languages = LANGUAGES;
  var pres = document.getElementsByTagName('pre');
  for (var i = 0; i < pres.length; i++) {
    if (pres[i].firstChild && pres[i].firstChild.nodeName == 'CODE')
      initHighlight(pres[i].firstChild);
  }//for
}//initHighlighting

function initHighlight(block) {
  if (block.childNodes.length != 1 || 
      block.firstChild.nodeType != 3 ||
      block.className.search(/\bno\-highlight\b/) != -1)
    return;
  var classes = block.className.split(/\s+/);
  for (var i = 0; i < classes.length; i++) {
    if (selected_languages[classes[i]]) {
      highlightLanguage(block, classes[i]);
      return;
    }//if
  }//for
  highlightAuto(block);
}//initHighlight

function highlightLanguage(block, language) {
  var highlight = new Highlighter(language, block.firstChild.nodeValue);
  // See these 4 lines? This is IE's notion of "block.innerHTML = result". Love this browser :-/
  var container = document.createElement('div');
  container.innerHTML = '<pre><code class="' + block.className + '">' + highlight.result + '</code></pre>';
  var environment = block.parentNode.parentNode;
  environment.replaceChild(container.firstChild, block.parentNode);
}//highlightLanguage
    
function highlightAuto(block) {
  var result = null;
  var language = '';
  var max_relevance = 2;
  var relevance = 0;
  for (var key in selected_languages) {
    var highlight = new Highlighter(key, block.firstChild.nodeValue);
    relevance = highlight.keyword_count + highlight.relevance;
    if (highlight.keyword_count && relevance > max_relevance) {
      max_relevance = relevance;
      result = highlight;
    }//if
  }//for
  
  if(result) {
    // See these 4 lines? This is IE's notion of "block.innerHTML = result". Love this browser :-/
    var container = document.createElement('div');
    container.innerHTML = '<pre><code class="' + result.language_name + '">' + result.result + '</code></pre>';
    var environment = block.parentNode.parentNode;
    environment.replaceChild(container.firstChild, block.parentNode);
  }//if
}//highlightAuto