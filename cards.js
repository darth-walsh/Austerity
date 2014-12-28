var cards = (function() {

function Treasure(cost, value) {
  this.kind = "treasure";
  this.cost = cost;
  this.value = value;
  this.play = function(player) {
    player.money += this.value;
  };
}

function Property(cost, value) {
  this.kind = "property";
  this.cost = cost;
  this.value = value;
}

function Smithy() {
  this.kind = "action";
  this.cost = 4;
  this.play = function(player) {
    player.draw(3);
  };
}

function Workshop() {
  this.kind = "action";
  this.cost = 3;
  this.play = function(player) {
    player.money += 2;
    player.buys  += 1;
  };
}

function Village() {
  this.kind = "action";
  this.cost = 3;
  this.play = function(player) {
    player.actions += 2;
    player.draw();
  };
}
  
var cards = {
  Copper: new Treasure(0, 1),
  Silver: new Treasure(3, 2),
  Gold:   new Treasure(6, 3),
  
  Estate:  new Property(2, 1),
  Duchy:   new Property(5, 3),
  Provice: new Property(8, 3),
  
  Smithy: new Smithy(),
  Workshop: new Workshop(),
  Village: new Village()
};

for(var name in cards) 
  cards[name].name = name;

return cards;
})();

