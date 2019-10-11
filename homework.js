x$(document).ready(function(){
    
    const wordsBackup = ["apple", "strawberry", "banana", "cherry", "mango"];
    let maxTries = 9;
    let maxHints = 3;
    let currentWord;
    let userWord = [];
    let splitLetters;
    

    $(function(){
        function initializeGame(products){
            var api = 'https://api.predic8.de/shop/products/';       
            $.ajax({
                url: api,
                dataType: 'json',
            }).done(function(res){
                getWord(res);
                setUpGame();      
            }).fail(function(err){
                getWord();
                console.log('Cannot connect with the server');
            });
        }
        initializeGame();
    });

    function setUpGame(){
        $(".triesLeft").text(maxTries);
        $(".hintsLeft").text(maxHints);
    }

    function getWord(res){
        let listWords = res && res.products && res.products.length && res.products.map(prod => prod.name) ||    wordsBackup; 
        currentWord = listWords[Math.floor(Math.random() * listWords.length)].toUpperCase();
        console.log(currentWord);
        createInputs();
    };
    
    function createInputs(){
        const inputBoxes = $(".inputBoxes");
        const correctLetters = $(".correctLetters");
        
        splitLetters = currentWord.split('');
        console.log(splitLetters);
        splitLetters.forEach(function (e,i){
            if(splitLetters[i] === " "){
                inputBoxes.append($('<input disabled="true" value=" " id='+i+'>'));
            } else {
                inputBoxes.append($('<input id='+i+'>'));
                correctLetters.append($('<span class="correctGuess" id='+i+'>'));
            }
        })
        allowOnlyLetters();
    }

    function allowOnlyLetters(){
        let inputs = $("input");
        const regEx = /^[A-Za-z]{1}$/;
        inputs.on("keyup", function(event){
            if(!regEx.test($(event.target).val())) {
                $(event.target).val("");
            }
        })
        verifyInputs();
    }

    //function verifyInputs(){
    //    let allInputs = $("input");
    //    let triesLeft = maxTries;
    //    let hintsLeft = maxHints;
//
    //    allInputs.on("keyup", function(event){
    //        let i = event.target.id;
    //        let input = event.target;
    //        let value = input.value.toUpperCase();
    //        let correctLetters = $(".correctLetters");
    //            if(value == splitLetters[i]) {
    //                //correct
    //                $(input).addClass('correct');
    //                $(input).val(value);
    //                $(correctLetters).children([i]).val(value);
    //            } else if(splitLetters.indexOf(value) >= 0){
    //                //almost
    //                $(input).addClass('almost');
    //                $(input).val(value);
    //                triesLeft--;
    //                setUpGame();
    //            }  else {
    //                // incorrect
    //                $(input).addClass('incorrect');
    //                $(input).val(value);
    //                triesLeft--;
    //                setUpGame()
    //            } 
    //    });
    //}

    
   function verifyInputs() {
       $("input").on("keyup", function(event) {
        let input = event.target;
        let value = input.value.toUpperCase();
        let i = event.target.id;
        const correctLetters = $(".correctLetters");
        //let triesLeft = maxTries;
        //let hintsLeft = maxHints;      
        $(input).removeClass();
        
            if(value == splitLetters[i]) {
                $(input).addClass('correct');
                $(input).val(value);
                $(correctLetters).children([i]).val(value);
            } else if(splitLetters.indexOf(value) >= 0){
                $(input).addClass('almost');
                $(input).val(value);
                //triesLeft--;
            } else {
                $(input).addClass('incorrect');
                $(input).val(value);
                //triesLeft--;           
            }
        });
    };

    function checkWin(){
        
    }

});    
