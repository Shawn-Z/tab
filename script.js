
//loop json in the JS, and create a HTML for each TAB
var data = {
  "cities": [
    {
      "section": "cupertino",
      "label": "Cupertino",
      "timezone":"America/Los_Angeles"
    },
    {
      "section": "new-york-city",
      "label": "New York City",
      "timezone":"America/New_York"
    },
    {
      "section": "london",
      "label": "London",
      "timezone":"Europe/London"
    },
    {
      "section": "amsterdam",
      "label": "Amsterdam",
      "timezone":"Europe/Amsterdam"
    },
    {
      "section": "tokyo",
      "label": "Tokyo",
      "timezone":"Asia/Tokyo"
    },
    {
      "section": "hong-kong",
      "label": "Hong Kong",
      "timezone":"hongkong",
    },
    {
      "section": "sydney",
      "label": "Sydney",
      "timezone":"Australia/Sydney",
    }
  ]
}

function setupWeb (){
  const container = document.createElement('div');
  container.classList.add('container');
  const tabPanelEle = document.createElement('div');
  tabPanelEle.classList.add('tabPanel')
  const citiesList = data.cities;
  
  const mobileTab = document.createElement('div');
  mobileTab.classList.add('tabBody')
  const slider = document.createElement('span');
  slider.classList.add('slider')

  const body = document.querySelector('body');

  for (let i = 0; i < citiesList.length; i++){
  
  
      //add desktop tab
      const tabEle = document.createElement('div');
      const pEle = document.createElement('p');
  
      let timezoneName = citiesList[i].timezone;
      let label = citiesList[i].label;
      pEle.innerHTML = label;
      // pEle.append(slider)
      // slider.classList.add('slider')
      tabEle.classList.add('tab')
      tabEle.addEventListener('click', getTab)
      tabEle.setAttribute('dataID',i)
      tabEle.append(pEle);
      tabPanelEle.append(tabEle)
  
      //add mobile tab name
      const eachSection = document.createElement('section');
      eachSection.classList.add('tab-ui')
      eachSection.setAttribute('dataID',i)
      const h2 = document.createElement('h2');
      h2.innerHTML = label;
      const signIcon =  document.createElement('div');
      signIcon.classList.add('sign')
      const mobileTitleDiv = document.createElement('div');
      mobileTitleDiv.classList.add('tab-mobile-title')
      mobileTitleDiv.addEventListener('click', getTab) //preventDefault is true
      mobileTitleDiv.setAttribute('dataID',i)
      mobileTitleDiv.append(h2,signIcon)
      const bodyDiv = document.createElement('div');
      bodyDiv.classList.add('tab-description')
      const time = moment.tz(timezoneName).format("YYYY-MM-DD  HH:mm:ss");
      bodyDiv.innerHTML = label + ' current time is now: ' + time;
      //add body description:
      eachSection.append(mobileTitleDiv,bodyDiv);
      mobileTab.append(eachSection);
  }
  tabPanelEle.append(slider);
  container.append(tabPanelEle);
  container.append(mobileTab);
  body.append(container);
}



function removePosition() {
  const activeElement = document.getElementsByClassName('tab-active')[0]
  activeElement.style["left"] = 0;
} 

function findPosition() {
  const activeElement = document.getElementsByClassName('tab-active')[0];
  const findClosestP = activeElement.querySelector('p');
  const rec = findClosestP.getBoundingClientRect();
  const left = rec.left + window.scrollX;
  const width = findClosestP.offsetWidth;
  const slider = document.querySelector('.slider');
  slider.style.left = left + 'px';
  slider.style.width = width + 'px';
} 

function getTab(event) {
    event.stopPropagation(); 
    removeActive();
    const target = event.currentTarget;
    const dataId = target.attributes["dataID"]?.value;
    
    const findTabBody = document.querySelector('[dataID="' + dataId + '"]')
    findTabBody.classList.add("tab-active");
    findPosition();
    document.querySelectorAll('[dataID="' + dataId + '"]').forEach((element) => { 
        element.classList.add('tab-active');
    });
} 


function removeActive(){
    document.querySelectorAll(".tab-active").forEach((element) => {
        element.classList.remove('tab-active');
    });
}



setupWeb();

document.addEventListener("DOMContentLoaded", function(){
    document.querySelector('.tab').click();
});
addEventListener('resize',findPosition);