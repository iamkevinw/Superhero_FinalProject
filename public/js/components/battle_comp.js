"use strict";


//generate an opponent with math.random 

//another api call to get that opponent with that number^

//generate questions

//if answer is correct or false, adjust power level

//TODO:repeat that until one is defeated

//TODO:change to the gamover over view/comp
//TODO:change h3 health level to powerbar
const battle = {
template: `
<section class="main">
    <section class="fighters">
        <div class="fighter_info">
            <h2>Player</h2>
            <h3 ng-model="$ctrl.playerHealth">{{$ctrl.playerHealth}}</h3>
            <p ng-model="$ctrl.clickedHero.name">{{ $ctrl.clickedHero.name }}</p>
            <img ng-model="$ctrl.clickedHero.image.url" src="{{$ctrl.clickedHero.image.url}}">
        </div>

        <div class="fighter_info">
            <h2>Opponent</h2>
            <h3 ng-model="$ctrl.opponentHealth">{{$ctrl.opponentHealth}}</h3>
            <p ng-model="$ctrl.opponent.name"> {{ $ctrl.opponent.name }} </p>
            <img ng-model="$ctrl.opponent.image.url" src="{{$ctrl.opponent.image.url}}">
        </div>

    </section>
    <button ng-click="$ctrl.goToHome();">home</button>

        <h1>{{$ctrl.questions[$ctrl.questionsIndex].question}}</h1>

        
        
        <div ng-repeat="option in $ctrl.questions[$ctrl.questionsIndex].options">
        <p ng-click="$ctrl.checkAnswer(option);">
        {{option}}
        </p>
        </div>

        <button ng-click="$ctrl.startBattle();">Start Battle</button>
      
        <easy-questions></easy-questions>
</section>
`,

controller: ["GameService", function (GameService){
    const vm = this;
    let clickedHero = {};
    //selects random number to use as opponent id for api call
    let randomNum = Math.floor(Math.random() * 750) + 1;

    let opponent = {};    

    // GamePlay declaration code
    vm.playerHealth = 5;
    vm.opponentHealth = 5;
    vm.questionsIndex = 0;
    vm.selectedAnswer;
    vm.questions=[];
    
    //begins game: retrieve questions
    //TODO: triggers animations
    
    vm.startBattle = () =>{
        vm.questions = GameService.getQuestions();
        console.log(vm.questions);
    }



    vm.checkAnswer = (option) => {
        vm.selectedAnswer = option;
        vm.correctAnswer = vm.questions[vm.questionsIndex].answer;
  
        //check if selected answer equals correct ansswer
        if (vm.selectedAnswer == vm.correctAnswer){
            //if it does, reduce opp health
            vm.opponentHealth --;
            console.log(`opp health is now: ${vm.opponentHealth}`);
        } else {
            //if it is not correct, reduce player health
            vm.playerHealth --;
            `opp health is now: ${vm.playerHealth}`
        }
        //vm.checkForWinner();
    }

    //vm.checkForWinner = () => {
        //if both health is >0, qIndex++
        //the end

        //if playerHealth === 0 --> vm.winner = opponent (pass this data, who won, to GameService so that gameover view can use it)
        //if oppHealth === 0 --> vm.winner = player
        //change to gameover view... (vm.changeToGameover)
    

    //retrieving the user's character from Service
    vm.clickedHero = GameService.retrieveHero();
    console.log(vm.clickedHero);

    //takes user back to home view/component
    vm.goToHome = () => {
        GameService.goToHome();
    };  
    
    //gets opponent info from api using randomNum
    GameService.getPlayer(randomNum).then((response)=> {
    
        if(response.powerstats.combat == null){
            console.log("combat was null");
            
            GameService.getPlayer(randomNum);
        }else {
        vm.opponent = response;
        }
    });
}]

}

angular
   .module("app")
  .component("battle", battle);


  //change getPlayer to more generic title because it gets player OR opponent charecter. Suggest: get charecter

  //finish check answer method

  //write checkForWinner method 