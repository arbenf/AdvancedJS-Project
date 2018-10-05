$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var recept = {name: item.val()};

      $.ajax({
        type: 'GET',
        url: '/recept',
        data: recept,
        success: function(data){
          location.reload();
        }
      });

      return false;

  });
 });


