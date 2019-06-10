const months = [
  {name: "Needfest", days: 7},
  {name: "Fireseek", days: 28},
  {name: "Readying", days: 28},
  {name: "Coldeven", days: 28},
  {name: "Growfest", days: 7},
  {name: "Planting", days: 28},
  {name: "Flocktime", days: 28},
  {name: "Wealsun", days: 28},
  {name: "Richfest", days: 7},
  {name: "Reaping", days: 28},
  {name: "Goodmonth", days: 28},
  {name: "Harvester", days: 28},
  {name: "Brewfest", days: 7},
  {name: "Patchwall", days: 28},
  {name: "Ready'reat", days: 28},
  {name: "Sunsebb", days: 28},
]

document.addEventListener("DOMContentLoaded", getRandomDate);

function getRandomDate(){
  const monthIndex = getRandomInt(0, 16);
  console.log(monthIndex);
  const randomMonth = months[monthIndex].name;
  const date = getDateOfMonth(randomMonth);
  document.getElementById("date").innerText = (randomMonth + " " + date);
}

function getDateOfMonth(month){
  if (month.indexOf("fest") > 0){
    return getRandomInt(1, 8);
  }
  return getRandomInt(1, 29)
}

function getRandomInt(minInclusive, maxExclusive) {
  min = Math.ceil(minInclusive);
  max = Math.floor(maxExclusive);
  return Math.floor(Math.random() * (max - min)) + min;
}

