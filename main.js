// Load AJAX function to retrieve the json data
function loadAjax(jsonData) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var menu = JSON.parse(this.responseText);
      var menuOutput = '';
      var menuUpdate = document.getElementById('menu');
      for (var key in menu) {
        menuOutput += '<li class="list-group-item d-flex justify-content-between align-items-center"><div><p class="mb-1 font-weight-bold">'
        + menu[key]['name']
        + '</p><small class="text-secondary">'
        + menu[key]['description']
        + '</small></div><div class="d-flex flex-column align-items-center"><span class="badge badge-warning badge-pill">£'
        + menu[key]['price'].toFixed(2)
        + '</span>'
        // If the menu items vegetarian property is set to true, display the vegetarian symbol
        + (menu[key]['vegetarian'] === true ? '<span class="mt-1 badge badge-success badge-pill">V</span></div>' : '</div>')
        + '</li>'
        ;
      }
      menuUpdate.innerHTML = menuOutput;
    }
  }
  request.open('GET', jsonData);
  request.send();
}
// Search
function searchFunction(jsonData) {
  // Reset searchbar and results
  $('#searchField').val('');
  $('#searchResults').html('');
  $('#searchField').keyup(function() {
    var searchInput = $('#searchField').val();
    var myExp = new RegExp(searchInput, 'i');
    $.getJSON(jsonData, function(data) {
      var output = '';
      $.each(data, function(key, val) {
        if (val.name.search(myExp) != -1 || val.description.search(myExp) != -1) {
          output += '<li class="list-group-item d-flex justify-content-between align-items-center"><div><p class="mb-1 font-weight-bold">'
          + val.name
          + '</p><small class="text-secondary">'
          + val.description
          + '</small></div><div class="d-flex flex-column align-items-center"><span class="badge badge-warning badge-pill">£'
          + val.price.toFixed(2)
          + '</span>'
          // If the menu items vegetarian property is set to true, display the vegetarian symbol
          + (val.vegetarian === true ? '<span class="mt-1 badge badge-success badge-pill">V</span></div>' : '</div>')
          + '</li>'
          ;
        }
      });
      $('#searchResults').html(output);
    });
  });
}
var menuTitle = document.getElementById('menuTitle');
var date = new Date();
var day = date.getDay();
// Load the default menu/title/search function depending on which day of the week it is
// Please bear in mind changing the system date to test this feature will take a
// minute for the changes to take place
// If it's sunday
if (day === 0) {
  menuTitle.innerHTML = 'Sunday menu';
  loadAjax('sundayMenu.json');
  searchFunction('sundayMenu.json');
  // If it's saturday
} else if (day === 6) {
  menuTitle.innerHTML = 'Saturday menu';
  loadAjax('saturdayMenu.json');
  searchFunction('saturdayMenu.json');
  // If it's a week day
} else {
  menuTitle.innerHTML = 'Weekday menu';
  loadAjax('weekdayMenu.json');
  searchFunction('weekdayMenu.json');
}
// Switch menu/title/search function depending on which button is clicked
document.getElementById('weekdayMenu').addEventListener("click", function() {
  menuTitle.innerHTML = 'Weekday menu';
  loadAjax('weekdayMenu.json');
  searchFunction('weekdayMenu.json');
}, false);
document.getElementById('saturdayMenu').addEventListener("click", function() {
  menuTitle.innerHTML = 'Saturday menu';
  loadAjax('saturdayMenu.json');
  searchFunction('saturdayMenu.json');
}, false);
document.getElementById('sundayMenu').addEventListener("click", function() {
  menuTitle.innerHTML = 'Sunday menu';
  loadAjax('sundayMenu.json');
  searchFunction('sundayMenu.json');
}, false);
// Image carousel
var imgElement = document.getElementById('imgElement');
var imgArray = ['img/image-1.jpg', 'img/image-2.jpg', 'img/image-3.jpg', 'img/image-4.jpg', 'img/image-5.jpg'];
var imgIndex = 0;
var imgInterval = setInterval(changeImg, 2000);
var pauseBtn = document.getElementById('pauseBtn');
var playBtn = document.getElementById('playBtn');
function changeImg() {
  imgElement.setAttribute('src', imgArray[imgIndex]);
  imgIndex++;
  if (imgIndex >= imgArray.length) {
    imgIndex = 0;
  }
}
// Pause when clicked
pauseBtn.addEventListener('click', pauseInterval);
function pauseInterval() {
  clearInterval(imgInterval);
  pauseBtn.setAttribute('style', 'display: none !important');
  playBtn.removeAttribute('style');
}
// Play when clicked
playBtn.addEventListener('click', playInterval);
function playInterval() {
  imgInterval = setInterval(changeImg, 2000);
  playBtn.setAttribute('style', 'display: none !important');
  pauseBtn.removeAttribute('style');
}
