$(document).ready(function(){

    $(function() {
        function insertBoxes(products){

            var api = 'https://api.predic8.de/shop/products/';        
    
            $.ajax({
                url: api,
                dataType: 'json',
            }).done(function(res){
                // create input boxes
                var name = res.products[Math.floor(Math.random() * 10)].name;
                console.log(name);
                var form = $('.inputBoxes');
                var listLetters = name.split('');
                console.log(listLetters);
    
                listLetters.forEach(char => {return form.append($('<input>'))});
                
                // allow only letters
                $("input").on("keyup", function(){
                    var regex = /^[A-Za-z]/;
                    if(!$(this).val().match(regex) ) {
                        $(this).val("");
                    }
                })

                //console.log(form.children());
                //console.log(form.children(0).value);
                //console.log(listLetters[0]);

                //validate letters
                //  option 1
                //var inputs = document.querySelectorAll("input");
                //console.log(inputs);
                //inputs.forEach(function(input){
                //    console.log(inputs[0]);
                //    input.addEventListener('onkeyup', () => {
                //        if(inputs[i].value == listLetters[i]) {
                //            inputs[i].style("color", "green");
                //        } else if(inputs[i].value == listLetters.indexOf()){
                //            inputs[i].style("color", "orange");
                //        } else {
                //            input[i].style("color", "red");
                //        }
                //    })
                //    
                //})
                //  option 2
                //$("input").on('keyup', function(){
                //    console.log(form.children(0).val());
                //    console.log(listLetters[0]);
                //    for(var i=0; i <= listLetters.length; i++) {
                //        if(form.children(i).val() == listLetters[i]) {
                //            form.children(i).css("color", "green");
                //        } else if(form.children(i).val() == listLetters.indexOf()){
                //            form.children(i).css("color", "orange");
                //        } else {
                //            form.children(i).css("color", "red");
                //        }
                //    }
                //})                    
                
        
                    
                


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

 

 
