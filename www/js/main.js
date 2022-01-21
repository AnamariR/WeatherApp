//PROJEKT ZA RAZLIKOVNI PREDMET : WEB I MOBILNE APLIKACIJE
//ANAMARI ROMIH
//PREDAJA : 19.11.2020.
//- komentari su pisani na engleskom jer mi je tako lakše za razmišljat i tražiti stvari
const api = {
  key: "d225e5eba1ecacc65cfdc26ca55a6100",
  baseurl: "https://api.openweathermap.org/data/2.5/",
}

let btn = document.getElementById("btn");
let engLink = document.getElementById("en");
let croLink = document.getElementById("hr");
let target = document.getElementById("welcome");
let time = document.getElementById("time");
let language;

//---------------------------default is english - so set cro to nothing, eng to white 0.4
croLink.style.backgroundColor = "";
engLink.style.backgroundColor = "rgba(255,255,255,0.4)";

//def searchbox, waits "input"-click or enter
const searchbox = document.querySelector('.searchBox');
searchbox.addEventListener('keypress', function(e){
  if (e.key === "Enter"){
    setQuery()}});
btn.addEventListener('click',setQuery);
//----------------------------if english language is selected
var engLanguage = function(){
  target.innerText = `Welcome to the weather forecasting page!`;
  language = "en";
  if (searchbox.value != ""){
    getResults(searchbox.value);
  }
  croLink.style.backgroundColor = "";
  engLink.style.backgroundColor = "rgba(255,255,255,0.4)";
}
//-----------------------if croatian language is selected
var croLanguage = function(){
  target.innerText = `Dobrodošli na stranicu vremenske prognoze!`;
  language = "hr";
  if (searchbox.value != ""){
    getResults(searchbox.value);
  }
  engLink.style.backgroundColor = "";
  croLink.style.backgroundColor = "rgba(255,255,255,0.4)";
}

//-----------------------------he waity waity for clicky
engLink.addEventListener("click",engLanguage);
croLink.addEventListener("click",croLanguage);

function setQuery(){
    getResults(searchbox.value);
}

function getResults(query){
  //  metric = celsius, otherwise fahrenheit
  fetch (`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}&lang=${language}`)
  .then(weather => {
    return weather.json();
  }).then(displayResults);
}
//---------------------------------------------show search results
function displayResults(weather){
  //console.log(weather);
  let timeT = timeThingy(weather);
//time formating
  var timeSmth = timeT;
  // Hours part from the timestamp
  var hours = timeSmth.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + timeSmth.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + timeSmth.getSeconds();
  // Will display time in xx:xx h format
  var formattedTime = hours + ':' + minutes.substr(-2) + ' h'; //:' + seconds.substr(-2)
  time.innerHTML = formattedTime;
  console.log(formattedTime);



  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);
  if(language=="en"){
    date.innerText = dateBuilder(now);
  }
  if(language=="hr"){
    date.innerText = dateBuilder2(now);
  }
  //-----------------------console.log(dateBuilder(now));
  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  //weather description + capitalisation of the first letter
  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].description.charAt(0).toUpperCase()+weather.weather[0].description.slice(1);
  //weather Icon
  let weatherIcon = document.getElementById("weatherIcon");
  weatherIcon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  //console.log(weather.weather[0].icon);
  //take first 2 letters of the icon string --- used for switching background
  let appWrapDef = weather.weather[0].icon.substring(0,2);
  // depending on the letters, change the colours of the gradient
  // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
  // CODES
  //console.log(appWrapDef);
  if(appWrapDef==="01"){
    //CLEAR SKY...
    document.getElementById("appWrap").style.backgroundImage = "linear-gradient(rgba(7,35,59,1),rgba(255,227,11,0.4)),url('../img/bckg3.jpg')";
  }
  if(appWrapDef==="02"){
    //FEW CLOUDS...
    document.getElementById("appWrap").style.backgroundImage = "linear-gradient(rgba(7,35,59,1),rgba(66,199,30,0.4)),url('../img/bckg3.jpg')";
  }
  if(appWrapDef==="03"){
    //SCATTERED CLOUDS...
    document.getElementById("appWrap").style.backgroundImage = "linear-gradient(rgba(7,35,59,1),rgba(21,120,46,0.4)),url('../img/bckg3.jpg')";
  }
  if(appWrapDef==="04"){
    //BROKEN CLOUDS - OVERCAST CLOUDS
    document.getElementById("appWrap").style.backgroundImage = "linear-gradient(rgba(7,35,59,1),rgba(16,92,70,0.4)),url('../img/bckg3.jpg')";
  }
  if(appWrapDef==="09"){
    //SHOWER RAIN
    document.getElementById("appWrap").style.backgroundImage = "linear-gradient(rgba(7,35,59,1),rgbargba(35,42,56,0.6)),url('../img/bckg3.jpg')";
  }
  if(appWrapDef==="10"){
    //RAIN , MODERATE RAIN
    document.getElementById("appWrap").style.backgroundImage = "linear-gradient(rgba(7,35,59,1),rgba(102,102,102,0.8)),url('../img/bckg3.jpg')";
  }
  if(appWrapDef==="11"){
    //THUNDERSTORM
    document.getElementById("appWrap").style.backgroundImage = "linear-gradient(rgba(9,25,41,1),rgba(41,41,41,0.8)),url('../img/bckg3.jpg')";
  }
  if(appWrapDef==="13"){
    //SNOW
    document.getElementById("appWrap").style.backgroundImage = "linear-gradient(rgba(81,115,184,0.8),rgba(255,255,255,0.6)),url('../img/bckg3.jpg')";
  }
  if(appWrapDef==="50"){
    //MIST
    document.getElementById("appWrap").style.backgroundImage = "linear-gradient(rgba(77,77,77,1),rgba(179,179,179,0.6)),url('../img/bckg3.jpg')";
  }
  //hi-low temperature
  let hilow = document.querySelector('.hiLow');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

//english verion for date
function dateBuilder (d){
  let months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}
//croatian version for date
function dateBuilder2 (d){
  let months = ["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj",
            "Kolovoz","Rujan","Listopad","Studeni","Prosinac"];
  let days = ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day}, ${date}. ${month} ${year}`;
}

//time thing
function timeThingy(weather){
    //return (weather.dt * 1000) + weather.timezone;
    let newDate = new Date();
    localTime = newDate.getTime();
    localOffset = newDate.getTimezoneOffset() * 60000;
    utc = localTime + localOffset;
    var city = utc + (1000 * weather.timezone);
    nd = new Date(city);
    return nd;
}

/*
d = new Date()
localTime = d.getTime()
localOffset = d.getTimezoneOffset() * 60000
utc = localTime + localOffset
var atlanta = utc + (1000 * -14400)
nd = new Date(atlanta)
*/