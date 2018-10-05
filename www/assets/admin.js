$(document).ready(function(){

    $('form').on('submit', function(){
  
        var add = $('form input');
        var newRecipe = {name: add.val()};
  
        $.ajax({
          type: 'POST',
          url: '/admin',
          data: newRecipe,
          success: function(data){
            location.reload();
          }
        });
  
        return false;
  
    });
  
 });
  
  
  