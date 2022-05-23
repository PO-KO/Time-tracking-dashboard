// import data from json file

fetch("./data.json")
  .then((result) => {
    const json = result.json();
    return json;
  })
  .then((data) => {
    getData(data);
  });

// set clicked frame

let clickedTime = "daily";
let controlTimeFrames = document.querySelector(".control-flow");

// get data

function getData(data) {
  data.forEach((card) => {
    setData(card.title, card.timeframes[clickedTime]);
  });

  [...controlTimeFrames.children].forEach((frame) => {
    frame.addEventListener("click", function () {
      clickedTime = frame.dataset.time;
      [...controlTimeFrames.children].forEach((time) => {
        time.classList.remove("active");
      });
      frame.classList.add("active");
      [...document.querySelector(".report").children].forEach((element) => {
        if (element.classList.contains("card")) {
          element.remove();
        }
      });
      data.forEach((card) => {
        setData(card.title, card.timeframes[clickedTime]);
      });
    });
  });
}

// set data in DOM
function setData(cardTitle, activeFrame) {
  // create card container

  let card = document.createElement("section");

  if (cardTitle === "Self Care") {
    cardTitle = cardTitle.split(" ").join("-");
  }

  card.className = `card ${cardTitle.toLowerCase()}`;

  // Set icon
  let iconHolder = document.createElement("div");
  iconHolder.className = "icon-holder";
  let icon = document.createElement("img");
  icon.className = "icon";

  icon.src = `./images/icon-${cardTitle.toLowerCase()}.svg`;
  icon.alt = cardTitle;
  iconHolder.appendChild(icon);
  card.appendChild(iconHolder);

  //   Set statics

  let statics = document.createElement("div");
  statics.className = "statics";
  // Set info

  let info = document.createElement("div");
  info.className = "info";
  let title = document.createElement("h5");
  title.innerHTML = cardTitle;
  info.appendChild(title);
  let currentTime = document.createElement("p");
  currentTime.className = "current-time";
  currentTime.innerHTML = activeFrame.current + "hrs";
  info.appendChild(currentTime);
  let lastTime = document.createElement("p");
  lastTime.className = "last-time";
  switch (clickedTime) {
    case "daily":
      lastTime.innerHTML = `Last Day - ${activeFrame.previous}hrs`;
      break;
    case "weekly":
      lastTime.innerHTML = `Last Week - ${activeFrame.previous}hrs`;
      break;
    case "monthly":
      lastTime.innerHTML = `Last Month - ${activeFrame.previous}hrs`;
      break;
    default:
      break;
  }
  info.appendChild(lastTime);

  statics.appendChild(info);

  let ellipsis = document.createElement("img");
  ellipsis.src = "./images/icon-ellipsis.svg";
  statics.appendChild(ellipsis);

  card.appendChild(statics);

  document.querySelector(".report").append(card);
}
