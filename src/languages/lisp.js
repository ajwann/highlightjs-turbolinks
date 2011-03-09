/*
Language: Lisp
Description: Generic lisp syntax
Author: Vasily Polovnyov <vast@whiteants.net>
*/

hljs.LANGUAGES.lisp = function(){
  var LISP_IDENT_RE = '[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#]*'
  var LISP_SIMPLE_NUMBER_RE = '(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?'
  return {
    case_insensitive: true,
    defaultMode: {
      lexems: LISP_IDENT_RE,
      contains: ['literal', 'number', 'string', 'comment', 'quoted', 'list'],
      illegal: '[^\\s]'
    },
    modes: [
      {
        className: 'string',
        begin: '"', end: '"',
        contains: [hljs.BACKSLASH_ESCAPE],
        relevance: 0
      },
      {
        className: 'number',
        begin: LISP_SIMPLE_NUMBER_RE
      },
      {
        className: 'number',
        begin: '#b[0-1]+(/[0-1]+)?'
      },
      {
        className: 'number',
        begin: '#o[0-7]+(/[0-7]+)?'
      },
      {
        className: 'number',
        begin: '#x[0-9a-f]+(/[0-9a-f]+)?'
      },
      {
        className: 'number',
        begin: '#c\\(' + LISP_SIMPLE_NUMBER_RE + ' +' + LISP_SIMPLE_NUMBER_RE, end: '\\)'
      },
      {
        className: 'comment',
        begin: ';', end: '$'
      },
      {
        className: 'quoted',
        begin: '[\'`]\\(', end: '\\)',
        contains: ['number', 'string', 'variable', 'keyword', 'quoted_list']
      },
      {
        className: 'quoted',
        begin: '\\(quote ', end: '\\)',
        contains: ['number', 'string', 'variable', 'keyword', 'quoted_list'],
        lexems: LISP_IDENT_RE,
        keywords: {'title': {'quote': 1}}
      },
      {
        className: 'quoted_list',
        begin: '\\(', end: '\\)',
        contains: ['quoted_list', 'literal', 'number', 'string']
      },
      {
        className: 'list',
        begin: '\\(', end: '\\)',
        contains: ['title','body']
      },
      {
        className: 'title',
        begin: LISP_IDENT_RE
      },
      {
        className: 'body',
        begin: hljs.IMMEDIATE_RE, endsWithParent: true, excludeEnd: true,
        contains: ['quoted', 'list', 'literal', 'number', 'string', 'comment', 'variable', 'keyword']
      },
      {
        className: 'keyword',
        begin: '[:&]' + LISP_IDENT_RE
      },
      {
        className: 'variable',
        begin: '\\*', end: '\\*'
      },
      {
        className: 'literal',
        begin: '\\b(t{1}|nil)\\b'
      }
    ]
  };
}();
