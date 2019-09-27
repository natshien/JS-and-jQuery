$(document).ready(function(){
const words = ["apple", "strawberry", "cherry", "mango"];


function initialize(res){
    var listWords = res && res.products && res.products.length && res.products.map(prod => prod.name) || words; 
    var word = listWords[Math.floor(Math.random() * listWords.length)].toLowerCase();
    console.log(word);
    var form = $('.inputBoxes');
    var listLetters = word.split('');
    console.log(listLetters);
    var userWord = [];
    
    // create inputs  + disabled space
    listLetters.forEach((char, i) => {
        if(listLetters[i] === " "){
            return form.append($('<input disabled="true" value=" " id='+i+'>'))
        } else {
            return form.append($('<input id='+i+'>'))
        }
    });
    
    // allow only letters
    $("input").on("keyup", checkInput);

    function checkInput(event) {
        var i = event.target.id;
        var regex = /^[A-Za-z]{1}$/;
        if(!$(event.target).val().match(regex) ) {
            $(event.target).val("");
        }
        var input = event.target;
        var value = input.value;
        var triesLeft = $(".triesLeft");
        var chances = parseInt(triesLeft.text());
        
        //var winner = userWord.concat();
        if(!value) {
            return;
        }
        if(value == listLetters[i]) {
            var userWord = [];
            console.log(value);
            input.style.color = "green";
            var id = "#" + input.id;
            $(id).after("<div id='new'>"+value+"</div>");
            userWord.push(value);
            userWord.join("");
        } else if(listLetters.indexOf(value) >= 0){
            input.style.color = "orange";
            triesLeft.text(chances-1);
            if (triesLeft.text() <= 0){
                $(".result").text("GAME OVER. TRY AGAIN!");
                triesLeft.text('0');}
        } else {
            input.style.color = "red";
            triesLeft.text(chances-1);
            if (triesLeft.text() <= 0) {
                $(".result").text("GAME OVER. TRY AGAIN !").css("color", "red");
                triesLeft.text('0');
            }                   
        }
        
    };

    function checkWin() {
        var hints = $(".hints");

        // lost
        if (triesLeft.text() == 0) {
            hints.attr('disabled', true); // !!!!!!!!!!!!!!! WWWWHYYYYYYYYY ????????
        }

        var inputsTxt = document.getElementsByTagName("input").value;
        userWord.push(inputsTxt);
        var checkWord = userWord.join("");
        


    }
    
    


    // subtract the hints
    $(".hints").on("click", function(event){
        var hintsLeft = $(".hintsLeft");
        var num = parseInt(hintsLeft.text());
        var input = event.target;
    
        
        hintsLeft.text(num-1);
        if (hintsLeft.text() <= 0) {
            hintsLeft.text('0');
        }
    })
    

    // final message 
    //It should show a message of congratulations if the person guessed correct
    //It should show a message of try again when the person lost the changes and show the correct word
    
    //$(".result").text("CONGRATS !").css("color", "red");

    // reset the game
    $(".reset").on("click", function() {
            location.reload();
    })


    return form;

}

    $(function() {
        function insertBoxes(products){

            var api = 'https://api.predic8.de/shop/products/';       

            $.ajax({
                url: api,
                dataType: 'json',
            }).done(function(res){
                initialize(res);      
            }).fail(function(err){
                initialize();
                console.log('Cannot connect with the server');
            });
            
        }
    
            insertBoxes();

    })
    

           
            
})

 
