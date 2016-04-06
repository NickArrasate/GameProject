// business logic =================================
function creatureRoom(directions,creature){
  this.creature = creature;
  this.directions = [];
};
function puzzleRoom(directions,puzzle){

};
function dialogRoom(directions,dialog){

};
function Character(health, strength, sanity, items){
  this.health = health;
  this.strength = strength;
  this.sanity = sanity;
  this.items = [];
}


// user interface logic ============================
$(document).ready(function(){

var rooms = [turnback, path, entrance];
var health = 100;
var strength = 10;
var sanity = 100;
var items = ['key'];
var place = 1;

$('#room-display').append(rooms[place]);


$('#up').click(function(event){
  $('#room-display').empty();
  place += 1;
  $('#room-display').append(rooms[place]);
})
$('#down').click(function(event){
  if (place > 0){
    $('#room-display').empty();
    place -=1;
  $('#room-display').append(rooms[place]);
} else {
  $('#room-display').empty();
  $('#room-display').append(rooms[place]);
}
})
$('#left').click(function(event){
})
$('#right').click(function(event){
})


});
// Room variables to append into display =================
var entrance = '<div class="room" id="entrance">' +
  '<p>' + 'You are facing a moss-laden archway. There is a rusted, dilapidated gate hanging from it\'s hinges. There may be just enough space to squeeze between the doors.' + '</p>' +
'</div>'

var path = '<div class="room" id="path">' +
  '<p>' + 'You stand alone on a narrow path hemmed in by towering trees. A blocky shadow looms ahead. You can only go forward' + '</p>' +
'</div>'

var turnback = '<div class="room" id="path">' +
  '<p>' + 'You really should investigate the path ahead...' + '</p>' +
'</div>'
