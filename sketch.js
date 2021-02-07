var dog,sadDog,happyDog;
var feedDog,addFood;
var foodObj;
var foodS,foodStock;
var feed,addDogFood;
var fedTime,lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();

  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);


  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed The Dog");
  feed.position(700,100);
  feed.mousePressed(feedDog);

  addDogFood = createButton("Add Food");
  addDogFood.position(800,100);
  addDogFood.mousePressed(addFood);

}

function draw() {
  background(46,139,87);

  foodObj.display();
  drawSprites();

 
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
  })
  
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed = data.val();
  })

  dog.position.x = 400;
  dog.position.y = 200;

}

//function to add food in stock
function addFood(){
  foodS++;
  dog.addImage(sadDog);
  dog.position.x = 800;
  dog.position.y = 200;
  
  database.ref('/').update({
  Food:foodS,
  FeedTime:hour()
  })
}