function highlightDiv(div) {
  var code = div.find('code');
  if (code.hasClass('hljs')) {
    return;
  }
  code = code.get(0);
  hljs.highlightBlock(code);
  if (!div.hasClass(code.result.language)) {
    div.addClass('fail');
  }
}

function initCategories() {
  var categories = {};
  $('#languages div').each(function(i, div) {
    var category_str = $(div).data('category');
    if (!category_str) {
      category_str = 'other';
      $(div).data('category', category_str);
    }
    category_str.split(' ').forEach(function(c) {
      categories[c] = (categories[c] || 0) + 1;
    });
  });
  var ul = $('#categories');
  Object.keys(categories).forEach(function(c) {
    ul.append('<li><a href="#" data-category="' + c + '">' + c + ' (' + categories[c] +')</a></li>');
  });
  $('#categories li a').click(function(e) {
    e.preventDefault();
    var category = $(this).data('category');
    $('#languages div').each(function(i, div) {
      div = $(div);
      var category_str = div.data('category');
      if (category_str.split(' ').indexOf(category) != -1) {
        highlightDiv(div);
        div.show();
      } else {
        div.hide();
      }
    });
  });
}

function initStyleSwitcher() {
  var ul = $('#styles');
  $('link[title]').each(function(i, link) {
    ul.append('<li><a href="#">' + link.title + '</a></li>');
  });
  $('#styles li a').click(function(e) {
    e.preventDefault();
    var title = $(this).text();
    $('link[title]').each(function(i, link) {
      link.disabled = (link.title != title);
    });
  })
}

$(document).ready(function() {
  initCategories();
  initStyleSwitcher();
});

