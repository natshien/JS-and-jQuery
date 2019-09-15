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

                listLetters.forEach(char => { return container.append($('<input type="text" pattern="[A-Za-z]{1}">')) });
                return container;

            }).fail(function (err) {
                console.log('Cannot connect with the server');
            });
        };

        insertBoxes();
    });

})