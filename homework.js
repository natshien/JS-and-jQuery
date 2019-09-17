$(document).ready(function(){

    $(function() {
        function insertBoxes(products){

            var api = 'https://api.predic8.de/shop/products/';        
    
            $.ajax({
                url: api,
                dataType: 'json',
            }).done(function(res){
                // create input boxes
                var name = res.products[Math.floor(Math.random() * 10)].name.toLowerCase();
                console.log(name);
                var form = $('.inputBoxes');
                var listLetters = name.split('');
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
                   console.log("input: " + input + ", value: " + value);
                    if(value == listLetters[i]) {
                        input.style.color = "green";
                        var id = "#" + input.id;
                        $(id).after("<div id='new'>"+value+"</div>");
                    } else if(listLetters.indexOf(value) >= 0){
                        input.style.color = "orange";
                    } else {
                        input.style.color = "red";                   
                    }
                };

                var inputs = document.querySelectorAll("input");
               
                inputs.forEach((element, i) => {
                    element.addEventListener("blur", (event) => checkInput(event, i));
                });

                
                

                
                                          
            

                // subtract the hints
                $(".hints").on("click", function(){
                    var hintsLeft = $(".hintsLeft");
                    var num = parseInt(hintsLeft.text());
                    hintsLeft.text(num-1);
                    if (hintsLeft.text() <= 0) {
                        hintsLeft.text('0');
                    }
                })
                
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

 
