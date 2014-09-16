/*
 Language: ERB (Embedded Ruby)
 Requires: xml.js, ruby.js
 Author: Lucas Mazza <lucastmazza@gmail.com>
 Contributors: Kassio Borges <kassioborgesm@gmail.com>
 */
function(hljs) {
  return {
    aliases: ['erb'],
    case_insensitive: true,
    subLanguage: 'xml', subLanguageMode: 'continuous',
    contains: [
      {
        relevance: 10,
        begin: '<%[%#=-]?', end: '[%-]?%>',
        subLanguage: 'ruby',
        excludeBegin: true,
        excludeEnd: true
      }
    ]
  };
}
