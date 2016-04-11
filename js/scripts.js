// business logic =================================


// Global Variables ==========================================
var place = null; //used to index through room arrays. (roomCenter,roomRight)
var arrayPlace = null; //used to index through array of rooms. (roomArray)
var roomCenter = [];
var roomRight = [];
var roomLeft = [];
var roomArray = [];
// var Character = null;
var directions = null;
function Character(health, strength, sanity, items){
 this.health= health;
 this.strength = strength;
 this.sanity = sanity;
 this.items= items;
};
Character.prototype.addSanity = function(amount){
  return this.sanity += amount;
};
Character.prototype.loseSanity = function(amount){
  return this.sanity -= amount;
};
Character.prototype.addHealth = function(amount){
  return this.health += amount;
};
Character.prototype.loseHealth = function(amount){
  return this.health -= amount;
};
var Character = new Character(100,10,10,['Gold Lighter']);
// user interface logic ========================================
// Setup the rooms array and starting location and stats========================
$(document).ready(function(){

  var roomCenter = [turnback, introduction,path, entrance, foyer, hallway1, hallway2];// y-axis array================
  var roomRight = [null,null,null, terrace];// x-axis array ===========================
  var roomLeft = [null,null,null,null,null,null,labratory];
  var roomArray = [roomLeft,roomCenter,roomRight];//array for both y- and x-axis==============================
  console.log(roomArray);
  var place = 1;
  var arrayPlace = 1;
  $('#room-display').append(roomArray[arrayPlace][place].description);


  // movement and setting=====================================================
  $('.directions').click(function() {
    var direction = $(this).attr('value');
    //updates the coords with the appropriate values from roomchange and arraychange functions============
    if (direction == 'up' || direction == 'down'){
    place += parseInt(roomChanger(direction));
  } else if (direction == 'right' || direction == 'left') {
    arrayPlace += parseInt(arrayChanger(direction));
  };
    $('#room-display').empty();
    $('#room-display').append(roomArray[arrayPlace][place].description);
    console.log(place, arrayPlace);// logs current coords==========================

//calls the room action function and refreshes stats=================================
    roomArray[arrayPlace][place].action(Character);
    characterRefresh(Character);
    $('.directions').hide();
    console.log(roomArray[arrayPlace][place].directions);//log to track our coords in console.===================
    directionCheck(roomArray[arrayPlace][place].directions);
});
//Contextual button function. pressing the contextual button calls the rooms 'after' function======================================================
  $('#contextual').click(function(){
    roomArray[arrayPlace][place].after(Character);
    directionCheck(roomArray[arrayPlace][place].directions);
  });
});
// Business logic=======================================
// protoypes for updating character stats. Call the proto in the room object functions.

// checks object.directions for available directions and displays related buttons======================
function directionCheck(directions){
  for (i = 0; i < directions.length; i++){
  if (directions[i] == 'up'){
    $('#up').show();
  }else if (directions[i] == 'down'){
    $('#down').show();
  }else if (directions[i] == 'left'){
    $('#left').show();
  }else if (directions[i] == 'right'){
    $('#right').show();
  }
}
}
//updates character sheet info====================================
function characterRefresh(Character){
  $('#healthdisplay').text(Character.health);
  $('#strengthdisplay').text(Character.strength);
  $('#sanitydisplay').text(Character.sanity);
  $('#itemdisplay').text(Character.items);
}
//updates the y-axis information when 'up' or 'down' is pressed=======================
function roomChanger(direction){
  if (direction == 'up'){
    place = 1;
  } else if (direction == 'down'){
    place = -1;
  }
  return place;
}
//updates the x-axis information when 'left' or 'right' is pressed=======================
function arrayChanger(direction){
  if (direction == 'right'){
    arrayPlace = 1;
  } else if (direction == 'left'){
    arrayPlace = -1;
  }
  return arrayPlace;
}

// Room objects to append into display ======================================
// Rooms should contain a 'description' to be appended into html, an 'action' function to happen when char moves into room (can be null), an 'after' function to run after the 'contextual' button has been pressed and the available 'directions' from the room.=============================================
var labratory = {
  description: '<div class="room" id="labratory">' +
  '<p>' + 'You make your way down the passage to the left. After walking for a bit, you come across two doors opposite each other. The door on the left is locked tight. However, the door on the right is slightly ajar. Will you investigate?' + '</p>' +
  '</div>',
  action: function(){
  $('#contextual').show();
  $('#contextual span.buttontext').append('Push the door open.');
},
  after: function(Character){
    Character.loseSanity(3);
    characterRefresh(Character);
    $('#contextual').hide();
    $('#contextual span.buttontext').empty();
    $('#room-display').empty();
    $('#room-display').append(
    '<div class="room" id="labratory">' +
  '<p>' + 'The room is small and contains several tables densely cluttered with glass vials and scientific equipment. Dust covers every surface. You approach a large glass container. When you hold your light up to it, the shape of a large, curled tentacle emerges through the cloudy liquid that suspends it. You recoil in disgust at the sight and knock a vial off the table behind you sending it to the ground. The sound of it shattering in the silence is enough to send your heart racing. You exit the labratory in a hurry, eager to put some distance between you and the odd tentacle in the jar...' + '</p>' +
  '</div>');
},
directions: ['up','down']
}
var hallway2 = {
  description: '<div class="room" id="hallway2">' +
  '<p>' + 'As you reach the bottom of the stairs, the the air smells more and more fetid. The weak flame in your hand is the only light. There is a path to your left and one to your right, each indiscernible from the other in the darkness...' + '</p>' +
  '</div>',
  action: function(){},
  after: null,
  directions: ['left','right'],
}
var hallway1 = {
  description: '<div class="room" id="hallway1">' +
  '<p>' + 'As you enter the stairway, you feel a chill wind rise to greet you. The air has an old smell about it as if it has been laying still for eons. The stairs before you plunge into darkness. If only there was an item to light help the way...' + '</p>' +
  '</div>',
  action: function(){
    $('#contextual').show();
    $('#contextual span.buttontext').append('Light the <span class ="item">gold lighter</span>.');
  },
  after: function(Character){
    Character.addSanity(1);
    characterRefresh(Character);
    $('#contextual').hide();
    $('#contextual span.buttontext').empty();
    hallway1.directions.push("up");
    $('#room-display').empty();
    $('#room-display').append(
    '<div class="room" id="hallway1">' +
  '<p>' + 'You take the antique <span class ="item">gold lighter </span>from your pocket and ignite it, shedding a warm glow onto the damp walls of the stairway. You are still unable to see the bottom...' + '</p>' +
  '</div>');
},
   directions: [],
}

var foyer = {
  description: '<div class="room" id="foyer">' +
  '<p>' + 'You scraped your back on the rusty gate as you passed beneath (-1 <span class = "health">health</span>). You find yourself in a small, dim vestibule. There is a stairway up ahead... ' + '</p>' +
  '</div>',
  action: function(Character){
    Character.loseHealth(1);
    characterRefresh(Character);
  },
  after: null,
  directions: ['up'],
}
var terrace = {
  description: '<div class="room" id="entrance">' +
  '<p>' + 'You find yourself on a small terrace, the wind moans through the trees. The shadows beneath the limbs deepen and you feel something watching you. Your skin crawls and you wonder if you might just be imagining things...'  + '</p>' +
  '</div>',
  action: function(Character){
    Character.loseSanity(2);
  },
  after: null,
  directions: ['left'],
}

var entrance = {
  description: '<div class="room" id="entrance">' +
  '<p>' + 'You are facing a moss-laden archway. There is a rusted, dilapidated gate hanging from it\'s hinges. There may be just enough space to squeeze between the doors. To your right there is an overgrown path.' + '</p>' +
  '</div>',
  action: function(){},
  after: null,
  directions: ['up','down','right'],
}

var path = {
  description: '<div class="room" id="path">' +
  '<p>' + 'You stand alone on a narrow path hemmed in by towering trees. A blocky shadow looms ahead. You can only go forward...' + '</p>' +
  '</div>',
  action: function(){
    $('#down').hide();
  },
  after: null,
  directions: ['up', 'down'],
}

var turnback = {
  description: '<div class="room" id="path">' +
  '<p>' + 'You really should investigate the path ahead...' + '</p>' +
  '</div>',
  action: function(){},
  after: null,
  directions: ['up'],
}
var introduction = {
  description: '<div class="room" id="introduction">' +
  '<p>' + 'Welcome to our game. You have been sent by a wealthy, anonymous sponsor to explore a long forgotten cathedral. St. Lovecraft\'s Cathedral was lost in a great flood many years ago and only recently, due to the considerable efforts of your sponsor, became accessible. You have been asked to return anything you may find inside. There are many rooms and places to explore and you have been provided with a set of coordinates to track your progress. Please note that your statistics and a list of your held items may be found on the lower right of your screen. Enjoy.' + '</p>' +
  '</div>',
  action: function(){},
  after: function(){
    $('#contextual').hide();
    $('#contextual span.buttontext').empty();
    characterRefresh(Character);
    this.directions.push('up')
  },
  directions: [],
}
