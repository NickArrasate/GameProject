// business logic =================================


// Global Variables ==========================================
var place = null; //indexes through room arrays. (rooms1,rooms2)
var arrayPlace = null; //indexes through array of rooms. (roomArray)
var rooms1 = [];
var rooms2 = [];
var roomArray = [];
var Character = null;
// user interface logic ========================================
$(document).ready(function(){
   Character = {
    health: 100,
    strength: 3,
    sanity: 10,
    items: ['Gold Lighter'],
  }

  var rooms1 = [turnback, path, entrance, foyer, hallway1];
  var rooms2 = [null, null, terrace];
  var roomArray = [rooms1,rooms2]
  // Setup the rooms array and starting location and stats========================

  roomArray.push['rooms1','rooms2'];
  var place = 1;
  var arrayPlace = 0;
  $('#room-display').append(roomArray[arrayPlace][place].description);
  characterRefresh(Character);

  // movement and setting=====================================================
  $('.directions').click(function() {
    var direction = $(this).attr('value');
    console.log(direction);
    if (direction == 'up' || direction == 'down'){
    place += parseInt(roomChanger(direction));
  } else if (direction == 'right' || direction == 'left') {
    arrayPlace += parseInt(arrayChanger(direction));
    }
    $('#room-display').empty();
    $('#room-display').append(roomArray[arrayPlace][place].description);
    console.log(place, arrayPlace);


//calls the room action function and refreshes stats==========================

    console.log(roomArray[arrayPlace][place].action);
    roomArray[arrayPlace][place].action(Character);
    characterRefresh(Character);
    $('.directions').hide();

    var directions = roomArray[arrayPlace][place].directions;
    directionCheck(directions);

  $('#contextual').click(function(){
    roomArray[arrayPlace][place].directions.push('up');
    roomArray[arrayPlace][place].after(Character);
    characterRefresh(Character);
    $('#contextual').hide();
  });

});
});

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

function characterRefresh(Character){
  $('#healthdisplay').text(Character.health);
  $('#strengthdisplay').text(Character.strength);
  $('#sanitydisplay').text(Character.sanity);
  $('#itemdisplay').text(Character.items);
}

function roomChanger(direction){
  if (direction == 'up'){
    place = 1;
  } else if (direction == 'down'){
    place = -1;
  }
  return place;
}
function arrayChanger(direction){
  if (direction == 'right'){
    arrayPlace = 1;
  } else if (direction == 'left'){
    arrayPlace = -1;
  }
  return arrayPlace;
}

// Room objects to append into display =================
var hallway1 = {
  description: '<div class="room" id="hallway1">' +
  '<p>' + 'As you enter the stairway, you feel a chill wind rise to greet you. The air has an old smell about it as if it has been laying still for eons. The stairs before you plunge into darkness ahead of you. If only there was an item to light help the way...' + '</p>' +
  '</div>',
  action: function(){
    $('#contextual').show();
    $('#contextual span.buttontext').text('Light the gold lighter.');
  },
  after: function(Character){
    Character.sanity += 1;
    $('#contextual').hide();
    $('#up').show();
    $('#room-display').empty();
    $('#room-display').append(
    '<div class="room" id="hallway1">' +
  '<p>' + 'You take the antique <span class ="item">gold lighter </span>from your pocket and ignite it, shedding a warm glow onto the damp walls of the stairway. You still are unable to see the bottom...' + '</p>' +
  '</div>');
},
   directions: ['down'],
}

var foyer = {
  description: '<div class="room" id="foyer">' +
  '<p>' + 'You scraped your back on the rusty gate as you passed beneath (-1 <span class = "health">health</span>). You find yourself in a small, dim vestibule. There is a stairway up ahead... ' + '</p>' +
  '</div>',
  action: function(Character){
    Character.health -= 1;
  },
  after: null,
  directions: ['up'],
}
var terrace = {
  description: '<div class="room" id="entrance">' +
  '<p>' + 'You find yourself on a small terrace, the wind blows eerily, something\'s not right...'  + '</p>' +
  '</div>',
  action: function(Character){
    Character.sanity -= 3;
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
