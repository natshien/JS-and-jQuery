$(document).ready(function(){
    
    const wordsBackup = ["apple", "strawberry", "banana", "cherry", "mango"];
    let currentWord;
    let splitLetters;
    const reset = $(".reset");
    const hintBtn = $(".hints");
    let maxHints = 3;
    let hints = $(".hintsLeft");
    let maxChances = 9;
    const chances = $(".triesLeft");
    
    $(function(){
        function initializeGame(products){
            var api = 'https://api.predic8.de/shop/products/';       
            $.ajax({
                url: api,
                dataType: 'json',
            }).done(function(res){
                getWord(res);
                hints.text(maxHints);
                chances.text(maxChances);   
            }).fail(function(err){
                getWord();
                console.log('Cannot connect with the server');
            });
        }
        initializeGame();
    });

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
                correctLetters.append($('<span class="correctGuess" id='+i+'> </span>'));
            } else {
                inputBoxes.append($('<input id='+i+'>'));
                correctLetters.append($('<span class="correctGuess" id='+i+'>'));
            }
        })
        $("input").on("keyup", allowOnlyLetters);
    }
    
    function allowOnlyLetters(event){
        const regEx = /^[A-Za-z]{1}$/;
        if(!regEx.test($(event.target).val())) {
            $(event.target).val("");
        }
        verifyInputs(event);
    }

   function verifyInputs(event) {
      
        let input = event.target;
        let value = input.value.toUpperCase();
        let i = event.target.id;
        const correctLetters = $(".correctLetters");
        const correctGuess = $(".correctGuess");
        let maxTries = $(".triesLeft");
        let chances = parseInt(maxTries.text());
           
        $(input).removeClass();
            if(value == splitLetters[i]) {
                $(input).addClass('correct');
                $(input).val(value);
                $(correctLetters).children('#'+ i).text(value);
                console.log(value);
                $(input).attr('disabled', true);
            } else if(splitLetters.indexOf(value) >= 0){
                $(input).addClass('almost');
                $(input).val(value);
                maxTries.text(chances-1);
            } else if (value == "") {
                $(input).val(value);
            } else {
                $(input).addClass('incorrect');
                $(input).val(value);
                maxTries.text(chances-1);         
            }
        checkWin();
    };

    
    function checkWin(){
        const inputs = $("input").toArray();
        console.log(inputs[0].value);
        let maxTries = $(".triesLeft");
        let chances = parseInt(maxTries.text());
        let result = $(".result");
        let answer = $(".answer");

        console.log(inputs.map(inp => inp.value));
        if (inputs.map(inp => inp.value).join("") == currentWord) {
            result.html("Congratulation").addClass('correct');
        } else if(chances < 1) {
            result.html("Game over - Try again").addClass('incorrect');
            answer.html("The correct word is " + currentWord).addClass('correct');
        }
    }
   
   function giveHint(event) {
      
       if(!maxHints) return;
       hints.text(maxHints--);
       // it substracting hints only till 1, with window.maxHints it works properly

       let inputs = $("input").toArray();
       let letter = null;
       let index = null;
       
        while (!letter) {
            index = Math.floor(Math.random() * currentWord.length);
            if (currentWord[index] !== " " && inputs[index].value !== currentWord[index]) {
                letter = currentWord[index];
            }
        }
        inputs[index].value = letter;
        //.addClass('correct').attr('disabled', true);
        if(!maxHints) {
            $(hintBtn).attr('disabled', true);
        }
        
    }

    hintBtn.on("click", giveHint);


    function newWord(){
        location.reload();
    }
    reset.on("click", newWord);

});    
