const months = [
  "Needfest",
  "Fireseek",
  "Readying",
  "Coldeven",
  "Planting",
  "Growfest",
  "Flocktime",
  "Wealsun",
  "Richfest",
  "Reaping",
  "Goodmonth",
  "Harvester",
  "Brewfest",
  "Patchwall",
  "Ready'reat",
  "Sunsebb"
]

document.addEventListener("DOMContentLoaded", getRandomDate);

function getRandomDate(){
  const monthIndex = getRandomInt(0, 16);
  console.log(monthIndex);
  const randomMonth = months[monthIndex];
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