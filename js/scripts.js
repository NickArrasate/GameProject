// business logic =================================


// Global Variables ==========================================
var place = null;
// user interface logic ========================================
$(document).ready(function(){
  var Character = {
    health : 100,
    strength : 3,
    sanity : 100,
    items : ['Gold Lighter'],
  }

  console.log(hallway1.directions)
  // Setup the rooms array and starting location and stats========================
  var rooms = [turnback, path, entrance, foyer, hallway1];
  var place = 1;
  $('#room-display').append(rooms[place].description);
  characterRefresh(Character);

  // movement =====================================================
  $('.directions').click(function() {
    var direction = $(this).attr('value');
    place += parseInt(roomChanger(direction));
    $('#room-display').empty();
    $('#room-display').append(rooms[place].description);
    rooms[place].action(Character);
    characterRefresh(Character);
    console.log(hallway1.directions)
    var directionArray = directionCheck(Character.directions);
  });

  $('#contextual').click(function(){
    rooms[place].after();
  });
});
function arrayBuilder(data){
  console.log(data);
  var newarray = [];
  data.forEach({
    newarray.push(data)
  });
}
function directionCheck(directions){
  console.log(directions);
  directions.forEach(directionResult);
}
function directionResults(direction){
  {
    if (direction = 'up'){
      $('#up').show();
    } else if (direction = 'down'){
      $('#down').show();
    } else if (direction = 'left'){
      $('#left').show();
    } else {
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
// Room objects to append into display =================
var hallway1 = {
  description: '<div class="room" id="hallway1">' +
  '<p>' + 'As you enter the stairway, you feel a chill wind rise to greet you. The air has an old smell about it as if it has been laying still for eons. The stairs before you plunge into darkness ahead of you. If only there was an item to light help the way...' + '</p>' +
  '</div>',
  action: function(){
    $('#contextual').show();
    $('#up').hide();
    $('#contextual span.buttontext').text('Light the gold lighter.')
  },
  after: function(){
    $('#contextual').hide();
    $('#up').show();
    $('#room-display').empty();
    $('#room-display').append(
    '<div class="room" id="hallway1">' +
  '<p>' + 'You take the antique gold lighter from your pocket and ignite it, shedding a warm glow onto the damp walls of the stairway. You still are unable to see the bottom...' + '</p>' +
  '</div>');
},
   directions : ["up","down"],
}

var foyer = {
  description: '<div class="room" id="foyer">' +
  '<p>' + 'You scraped your back on the rusty gate as you passed beneath (-1 <span class = "health">health</span>). You find yourself in a small, dim vestibule. There is a stairway up ahead... ' + '</p>' +
  '</div>',
  action: function(Character){
    Character.health -= 1;
  },
  after: null,
  directions : ["up"],
}

var entrance = {
  description: '<div class="room" id="entrance">' +
  '<p>' + 'You are facing a moss-laden archway. There is a rusted, dilapidated gate hanging from it\'s hinges. There may be just enough space to squeeze between the doors.' + '</p>' +
  '</div>',
  action: function(){},
  after: null,
  // directions: [up, down],
}

var path = {
  description: '<div class="room" id="path">' +
  '<p>' + 'You stand alone on a narrow path hemmed in by towering trees. A blocky shadow looms ahead. You can only go forward...' + '</p>' +
  '</div>',
  action: function(){},
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
