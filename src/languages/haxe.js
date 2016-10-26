/*
Language: Haxe
Author: Christopher Kaster <ikasoki@gmail.com> (Based on the actionscript.js language file by Alexander Myadzel)
*/

function(hljs) {
  var IDENT_RE = '[a-zA-Z_$][a-zA-Z0-9_$]*';
  var IDENT_FUNC_RETURN_TYPE_RE = '([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)';

  var HAXE_BASIC_TYPES = 'Int Float String Bool Dynamic Void Array ';

  return {
    aliases: ['hx'],
    keywords: {
      keyword: 'break callback case cast catch continue default do dynamic else enum extern ' +
               'for function here if import in inline never new override package private ' +
               'public return static super switch this throw trace try typedef untyped using var while',
      built_in:
        'trace this',
      literal:
        'true false null',
    },
    contains: [
      { className: 'string', // interpolate-able strings
        begin: '\'', end: '\'',
        contains: [
          hljs.BACKSLASH_ESCAPE,
          { className: 'subst', // interpolation
            begin: '\\$\\{', end: '\\}'
          },
          { className: 'subst', // interpolation
            begin: '\\$', end: '\\W}'
          }
        ]
      },
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      { className: 'meta', // compiler meta
        begin: '@:', end: '$'
      },
      { className: 'meta', // compiler conditionals
        begin: '#', end: '$',
        keywords: {'meta-keyword': 'if else elseif end error'}
      },
      { className: 'type', // types
        begin: ':[ \t]*', end: '\\W',
        excludeBegin: true, excludeEnd: true,
      },
      { className: 'class', // enums
        beginKeywords: 'enum', end: '\\{'
      },
      { className: 'class', // abstracts
        begin: 'abstract', end: '[\\{$]',
        contains: [
          { className: 'type',
            begin: '\\(', end: '\\)',
            excludeBegin: true, excludeEnd: true,
          },
          { className: 'type',
            begin: 'from *', end: '\\W',
            excludeBegin: true, excludeEnd: true,
          },
          { className: 'type',
            begin: 'to *', end: '\\W',
            excludeBegin: true, excludeEnd: true,
          }
        ],
        keywords: {
          keyword: 'abstract from to'
        }
      },
      { className: 'class', // classes
        beginKeywords: 'class interface', end: '{', excludeEnd: true,
        keywords: {
          keyword: 'class interface extends implements'
        }
      }
    ]
  };
}
