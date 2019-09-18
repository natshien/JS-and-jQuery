$(document).ready(function(){

    $(function() {
        function insertBoxes(products){

            var api = 'https://api.predic8.de/shop/products/';        
    
            $.ajax({
                url: api,
                dataType: 'json',
            }).done(function(res){
                // create input boxes
                var word = res.products[Math.floor(Math.random() * 10)].name.toLowerCase();
                console.log(word);
                var form = $('.inputBoxes');
                var listLetters = word.split('');
                console.log(listLetters);
                
                // create inputs
                listLetters.forEach((char, i) => {return form.append($('<input id='+i+'>'))});
                
                // allow only letters
                $("input").on("keyup", function(){
                    var regex = /^[A-Za-z]{1}$/;
                    if(!$(this).val().match(regex) ) {
                        $(this).val("");
                    }
                })

                //validate letters
               
                var checkInput = (event, i) => {
                    var input = event.target;
                    var value = input.value;
                    var triesLeft = $(".triesLeft");
                    var chances = parseInt(triesLeft.text());
    
                    //console.log("input: " + input + ", value: " + value);
                    if(value == listLetters[i]) {
                        input.style.color = "green";
                        var id = "#" + input.id;
                        $(id).after("<div id='new'>"+value+"</div>");
                    } else if(listLetters.indexOf(value) >= 0){
                        input.style.color = "orange";
                        triesLeft.text(chances-1);
                        if (triesLeft.text() <= 0) {
                            $(".result").text("TRY AGAIN!");
                            triesLeft.text('0');
                        }                   
                    } else {
                        input.style.color = "red";
                        triesLeft.text(chances-1);
                        if (triesLeft.text() <= 0) {
                            $(".result").text("TRY AGAIN !").css("color", "red");
                            triesLeft.text('0');
                        }                   
                    }
                };

                var inputs = document.querySelectorAll("input");
                inputs.forEach((element, i) => {
                    element.addEventListener("keyup", (event) => checkInput(event, i));
                });                                   
            

                // subtract the hints
                $(".hints").on("click", function(event){
                    var hintsLeft = $(".hintsLeft");
                    var num = parseInt(hintsLeft.text());
                    var input = event.target;
        // znalezc randomowa litere ze slowa, sprawdzic czy juz nie jest wpisana, wrzucic random w input
                    
                    hintsLeft.text(num-1);
                    if (hintsLeft.text() <= 0) {
                        hintsLeft.text('0');
                    }
                })
                


                // final message 
                //It should show a message of congratulations if the person guessed correct
                //It should show a message of try again when the person lost the changes and show the correct word

                // reset the game
                $(".reset").on("click", function() {
                        location.reload();
                })


                return form;
    
            }).fail(function(err){
                console.log('Cannot connect with the server');
            });
            
        }
    
            insertBoxes();

    })
    

           
            
})

 
