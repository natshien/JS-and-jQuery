$(document).ready(function () {
    

    $(function () {
        
        var api = 'https://api.predic8.de/shop/products/';

        function insertBoxes(products) {

            $.ajax({
                url: api,
                dataType: 'json',
            }).done(function (res) {
                
                var name = res.products[Math.floor(Math.random() * 10)].name;
                console.log(name);
                var container = $('.inputBoxes');
                var listLetters = name.split('');
                console.log(listLetters);

                listLetters.forEach(char => { return container.append($('<input type="text">')) });
                
                return container;
                
                

            }).fail(function (err) {
                console.log('Cannot connect with the server');
            });
        };

        //$(input).on('keyup', function () { 
        //    if ($(this).val() !== /[^a-z]/gi) {
        //        $(this).val('');
        //    }
        //})

        insertBoxes();
            
    });

    var input = $(input);
    var regex = /[^a-z]/gi

    input.on('keyup', function (){ 
        if ($(this).val() !== regex) {
            $(this).val('');
        }
    })

})