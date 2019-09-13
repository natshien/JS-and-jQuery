$(document).ready(function(){

    function insertBoxes(products){

        var api = 'https://api.predic8.de/shop/products/';        

        $.ajax({
            url: api,
            dataType: 'json',
        }).done(function(res){
            // Get one name from fixed list randomly
            var name = res.products[Math.floor(Math.random() * 10)].name;
            var container = $('.inputBoxes');
            var listLetters = name.split('');

            listLetters.forEach(char => {return container.append($('<input>'))});
            
            return container;

        }).fail(function(err){
            console.log('Cannot connect with the server');
        });
        }

        insertBoxes();

    })

 
