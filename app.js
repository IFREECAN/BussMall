'use strict';

// Array of all images

var allImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];

//var allImages = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
// Array of all the objects stored with data
var allPictureObjects = [];

//to load data to my chart//
var list = [];
if (localStorage.list) {
  list = JSON.parse(localStorage.list);
} else {
  list = [];
}
console.log(list);

// Constructor function //
function ImagesConstructor(filepath){
  this.name = filepath.split('.')[0];
  this.filepath = 'img/' + filepath;
  this.numClicks = 0;
  this.numShown = 0;
  allPictureObjects.push(this);
}


var createPicturesArray = function(){
  for(var i = 0; i < allImages.length; i++){
    new ImagesConstructor(allImages[i]);
  }
  console.log('allPictureObjects :: ', allPictureObjects);
};

// Call the ImagesConstructor to create an array of all the objects (stored in allPictureObjects array)
createPicturesArray();

// variables to the images ids (they are now global)
var placeOne = document.getElementById('placeOne');
var placeTwo = document.getElementById('placeTwo');
var placeThree = document.getElementById('placeThree');

//numer of times shown and nunber of times clicked charts//
var ctx = document.getElementById ('chart1','chart2').getContext('2d');

var randOne, randTwo, randThree;

// Shows the images on the page function//
var showImages = function(){
  // Random number between 0-20 for placeOne
  randOne = Math.floor(Math.random() * allImages.length);
  // Display randome images
  placeOne.src = allPictureObjects[randOne].filepath;
  // Add one to the numShown counter in the allPictureObjects array
  allPictureObjects[randOne].numShown += 1;

  randTwo = Math.floor(Math.random() * allImages.length);
  while (randOne === randTwo) {
    randTwo = Math.floor(Math.random() * allImages.length);
  };
  placeTwo.src = allPictureObjects[randTwo].filepath;
  allPictureObjects[randTwo].numShown += 1;

  randThree = Math.floor(Math.random() * allImages.length);
  while (randOne === randThree || randTwo === randThree) {
    randThree = Math.floor(Math.random() * allImages.length);
  }
  placeThree.src = allPictureObjects[randThree].filepath;
  allPictureObjects[randThree].numShown += 1;

  console.log([randOne, randTwo, randThree]);
};
// Call showImages function
showImages();

var counter = 0;
// Event Listeners when images are clicked
placeOne.addEventListener('click', function(){
  allPictureObjects[randOne].numClicks += 1;
  counter += 1;
  if (counter >= 25) {
    // Remove the images
    save();
    document.getElementById('imageHolder').remove();
    // Collect Data
    collectData();
    console.log('numberOfTimesShown :: ', numberOfTimesShown);
    console.log('numberOfTimesClicked :: ', numberOfTimesClicked);
    // Show chart
    showMyChart();
    showMyCharttwo ();
  }
  showImages();
});

placeTwo.addEventListener('click', function(){
  allPictureObjects[randTwo].numClicks += 1;
  counter += 1;
  if (counter >= 25) {
    // Remove the images
    save();
    document.getElementById('imageHolder').remove();
    // Collect Data
    collectData();
    console.log('numberOfTimesShown :: ', numberOfTimesShown);
    console.log('numberOfTimesClicked :: ', numberOfTimesClicked);
    // Show chart
    showMyChart();
    showMyCharttwo();
  }
  showImages();
});

placeThree.addEventListener('click', function(){
  allPictureObjects[randThree].numClicks += 1;
  counter += 1;
  if (counter >= 25) {
    // save data to the chart
    save();
    //remove images from the chart//
    document.getElementById('imageHolder').remove();
    // Collect Data
    collectData();
    console.log('numberOfTimesShown :: ', numberOfTimesShown);
    console.log('numberOfTimesClicked :: ', numberOfTimesClicked);
    // Show chart
    document.getElementById('chart');
    showMyChart();
    showMyCharttwo();
  }
  showImages();
});

//create arries to call the data that goest into my chart//
var numberOfTimesShown = [];
var numberOfTimesClicked = [];

function numberOfTimesClickedOut(){
  return numberOfTimesClicked;
};
numberOfTimesClickedOut();

var collectData = function() {
  for (var i = 0; i < allPictureObjects.length; i++) {
    numberOfTimesShown.push(allPictureObjects[i].numShown);
    numberOfTimesClicked.push(allPictureObjects[i].numClicks);
  };
};

//ceate the chart //
function showMyChart (){
  console.log('INSIDE CHART', numberOfTimesClicked);
  new Chart(ctx, {
    type: 'bar',
    data: {
      //using stings here because the array-position matches the order of the data being used//
      labels: ['bag', 'banana', 'bathroom', 'boots','breakfast','bubblegum','chair', 'cthulhu','dog-duck','dragon','pen','pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun','unicorn','usb','water-can','wine-glass'],
      datasets: [{
        label: ['Times Clicked'],
        data: numberOfTimesClicked,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1
      }]
    },
    //contorls the size of the chart per "Canvas"//
    maintainAspectRatio: true,
    options: {
      responsive: true,
      scale: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
};

/*second chart function*/
function showMyCharttwo (){
  console.log('INSIDE CHART', numberOfTimesShown);
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['bag', 'banana', 'bathroom', 'boots','breakfast','bubblegum','chair', 'cthulhu','dog-duck','dragon','pen','pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun','unicorn','usb','water-can','wine-glass'],
      datasets: [{
        label: ['Times clicked'],
        data: numberOfTimesShown,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1
      }]
    },
    maintainAspectRatio: true,
    options: {
      responsive: true,
      scale: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
};

/*function to change objects-2-string-back-2-objects*/
function save(){
  localStorage.list =
JSON.stringify(allPictureObjects);
}
