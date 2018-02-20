$(function(){

  $.get("/cities", appendToList); 

  function appendToList(cities) {
    var list = [];
    for(var i in cities){
      var city = cities[i];
      content = '<a href="#" data-city="'+city+'"><img src="del.png"></a> '+
                '<a href="/cities/'+city+'">'+city+'</a>';
      ;
      list.push($('<li>', { html: content }));
    }
    $('.city-list').append(list);
  }

  $('form').on('submit', function(event) {
    event.preventDefault();
    var form = $(this);
    var cityData = form.serialize();
    
    $.ajax({
      type: 'POST', url: '/cities', data: cityData
    }).done(function(cityName){
      appendToList([cityName]);
      form.trigger('reset');
    });
  });

  // ADD
  $('.city-list').on('click', 'a[data-city]', function(event) {
    if (!confirm('Are you sure ?')) {
      return false;
    }

    var target = $(event.currentTarget);
    
    $.ajax({
      type: 'DELETE', url: '/cities/' + target.data('city')
    }).done(function(){
      target.parents('li').remove();
    });
  });

});