
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");
const back1 = document.querySelector(".xmark1");
const modal1 = document.querySelector(".container1")
const back2 = document.querySelector(".xmark2");
const modal2 = document.querySelector(".container4")
const inp_field = document.querySelector(".inp");
const urcity = document.querySelector(".container5");
const apikey = "f17a72cc995340bb91b65600222803";
var data = "";
let lat = 0;
let long = 0;


const day = document.querySelector(".day");
const date = document.querySelector(".date");
const time = document.querySelector(".time");


const currenttime = new Date();
const getday = () => {
  var weekdays = new Array(7);
  weekdays[0] = "SUN";
  weekdays[1] = "MON";
  weekdays[2] = "TUE";
  weekdays[3] = "WED";
  weekdays[4] = "THU";
  weekdays[5] = "FRI";
  weekdays[6] = "SAT";

  return weekdays[currenttime.getDay()];
};
const getmonth = () => {
  var months = new Array(12);
  months[0] = "JAN";
  months[1] = "FEB";
  months[2] = "MAR";
  months[3] = "APR";
  months[4] = "MAY";
  months[5] = "JUNE";
  months[6] = "JULY";
  months[7] = "AUG";
  months[8] = "SEP";
  months[9] = "OCT";
  months[10] = "NOV";
  months[11] = "DEC";
  return months[currenttime.getMonth()];
}

const hours = () => {
  let hrs = currenttime.getHours();
  if (hrs < 10) {
    hrs = "0" + hrs;
  }

  return hrs;
}
const minute = () => {
  let mnt = currenttime.getMinutes();
  if (mnt < 10) {
    mnt = "0" + mnt;
  }

  return mnt;
}
day.innerHTML = getday();
date.innerHTML = currenttime.getDate() + " " + getmonth();

time.innerHTML = hours() + ":" + minute();



function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("no o/p");
  }
}

function showPosition(position) {
  long = (position.coords.longitude);
  lat = (position.coords.latitude);

  console.log(lat);
  console.log(long);
}

getLocation();


const requests = async () => {

  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${lat},${long}&aqi=no`);
  const val = await response.json();

  console.log(val);

  document.querySelector("#im1").src = val.current.condition.icon;

  document.querySelectorAll(".description")[0].innerHTML = val.current.condition.text;
  document.querySelectorAll(".temp")[0].innerHTML = val.current.temp_c + "&deg C";
  document.querySelectorAll(".city")[0].textContent = val.location.name;
  console.log(document.querySelectorAll(".city")[0]);
  document.querySelectorAll(".state")[0].innerHTML = val.location.region;
  document.querySelectorAll(".country")[0].innerHTML = val.location.country;
  document.querySelectorAll(".local-time")[0].innerHTML = val.location.localtime;
  document.querySelectorAll(".degree")[0].innerHTML = val.current.feelslike_c + "&deg C";

}


btn1.addEventListener('click', () => {

  requests();

  modal1.classList.remove("dis");
});

back1.addEventListener('click', () => {
  modal1.classList.add("dis");
});



// ------x------x--------x----------x----------x-----------x----------x--------------x----------x----------x--------------x--------------x----------x------x------x---------x







// preferred city



const request2 = async () => {
  let ans = inp_field.value;
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${ans}&aqi=no`);
  const val = await response.json();

  console.log(val);

  document.querySelector("#im2").src = val.current.condition.icon;

  document.querySelectorAll(".description")[1].innerHTML = val.current.condition.text;
  document.querySelectorAll(".temp")[1].innerHTML = val.current.temp_c + "&deg C";
  document.querySelectorAll(".city")[1].textContent = val.location.name;
  console.log(document.querySelectorAll(".city")[1]);
  document.querySelectorAll(".state")[1].innerHTML = val.location.region;
  document.querySelectorAll(".country")[1].innerHTML = val.location.country;
  document.querySelectorAll(".local-time")[1].innerHTML = val.location.localtime;
  document.querySelectorAll(".degree")[1].innerHTML = val.current.feelslike_c + "&deg C";
}




btn2.addEventListener('click', () => {

  modal2.classList.remove("dis");
})



inp_field.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && inp_field.value != "") {
    urcity.classList.remove("dis");
    console.log(inp_field.value)
    request2();
  }
});



back2.addEventListener('click', () => {
  modal2.classList.add("dis");
  inp_field.value = '';
  urcity.classList.add("dis");
});


