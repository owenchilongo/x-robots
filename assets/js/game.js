var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 20;
var playerMoney = 10;

var enemyNames = ["X-Bot", "X-Amy", "X-Robo"];
var enemyHealth = 60;
var enemyAttack = 20;

console.log(enemyNames);
console.log("Array Length i.e. Number of Elements:", enemyNames.length);

// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

var fight = function (enemyName) {
  // repeat and excute as long as the enemy-robot is alive
  while (playerHealth > 0 && enemyHealth > 0) {
    // ask the player if they want to FIGHT or SKIP
    var promptFight = window.prompt(
      "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
    );

    // if player choses to skip and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerMoney = Math.max(0, playerMoney - 10);
        console.log("playerMoney", playerMoney);
        break;
      }
    }
    
    // generate random damage value based on player's attack power
    var damage = randomNumber(playerAttack - 3, playerAttack);
     enemyHealth = Math.max(0, enemyHealth - damage);
     console.log(
      playerName +
        " attacked " +
        enemyName +
        ". " +
        enemyName +
        " now has " +
        enemyHealth +
        " health remaining."
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");

      // award player money for winning
      playerMoney = playerMoney + 20;

      // leave the while() loop since enemy robot is dead
      break;
    } else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    // remove player's health by subtracting the amount set in the enemyAttack variable
    var damage = randomNumber(enemyAttack - 3, enemyAttack);
    playerHealth = Math.max(0, playerHealth - damage);

    console.log(
      enemyName +
        " attacked " +
        playerName +
        ". " +
        playerName +
        " now has " +
        playerHealth +
        " health remaining."
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
      // leave the while() loop if player is dead
      break;
    } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  }
};

// function to start a new game
var startGame = function() {
  // reset player stats
  playerHealth = 100;
  playerAttack = 20;
  playerMoney = 10;

  // fight each enemy-robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyNames.length; i++) {
    // if player is still alive, then keep fighting
    if (playerHealth > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyName = enemyNames[i];

      // reset enemyHealth before starting new fight
      // enemyHealth = Math.floor(Math.random() * 21) + 40;
      enemyHealth = randomNumber(40, 60);

      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyName);
      // if player is still alive and we're not at the last enemy in the array
      if (playerHealth > 0 && i < enemyNames.length - 1) {
        // ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        // if yes, take them to the store() function
        if (storeConfirm) {
           shop();
        }
      }
    }
    // if player isn't alive, stop the game
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }

  // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
};

// function to end the entire game
var endGame = function() {
  // if player is still alive, player wins!
  if (playerHealth > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
  } 
  else {
    window.alert("You've lost your robot in battle.");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
    // restart the game
      startGame();
    } 
    else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

// go to shop between battles function
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  );

  // use switch to carry out action
  switch (shopOptionPrompt) {
    case "REFILL": // new case
    case "refill":
      if (playerMoney >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");
  
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }
  
       break;
      case "UPGRADE": // new case
      case "upgrade":
       if (playerMoney >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
  
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }
  
       break;
      case "LEAVE": // new case
      case "leave":
       window.alert("Leaving the store.");

       // do nothing, so function will end
       break;
      default:
       window.alert("You did not pick a valid option. Try again.");

       // call shop() again to force player to pick a valid option
       shop();
       break;
  }
};

// start the game when the page loads
startGame();

