import { RACING_CATEGORIES } from "../config/constants";

// this function is for Count Down time is updating or not,I added 5 secs wait between initial time and updated time.
// Converted minutes and seconds to Seconds then compared the Initial time and updated time
export function verifyTime(childNo) {
  let initialTime = 0;
  let updatedTime = 0;

  cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${childNo}) > p`).each(($el) => {
    const time = $el.text();
    if (time.includes("m") && time.includes("s")) {
      initialTime = parseInt(time.split("m")[0]) * 60 + parseInt(time.split("m")[1].replace("s", "").trim());
    } else if (time.endsWith("m")) {
      initialTime = parseInt(time.replace("m", "")) * 60;
    } else if (time.endsWith("s")) {
      initialTime = parseInt(time.replace("s", ""));
    }
    cy.wrap(initialTime).as("initialTime");
  });

  cy.wait(5000);

  cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${childNo}) > p`).each(($el) => {
    const time = $el.text();
    if (time.includes("m") && time.includes("s")) {
      updatedTime = parseInt(time.split("m")[0]) * 60 + parseInt(time.split("m")[1].replace("s", "").trim());
    } else if (time.endsWith("m")) {
      updatedTime = parseInt(time.replace("m", "")) * 60;
    } else if (time.endsWith("s")) {
      updatedTime = parseInt(time.replace("s", ""));
    }
    cy.wrap(updatedTime).as("updatedTime");
    cy.get('@initialTime').then((initialTime) => {
      
    });
    expect(updatedTime).to.be.at.most(initialTime);
  });
}

//all races count down time is in ascending order top one race countdown time is less than following races count down time

export function verifyRacesTime(childNo,childNo1) {
  let initialTime = 0;
  let updatedTime = 0;

  cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${childNo}) > p`).each(($el) => {
    const time = $el.text();
    if (time.includes("m") && time.includes("s")) {
      initialTime = parseInt(time.split("m")[0]) * 60 + parseInt(time.split("m")[1].replace("s", "").trim());
    } else if (time.endsWith("m")) {
      initialTime = parseInt(time.replace("m", "")) * 60;
    } else if (time.endsWith("s")) {
      initialTime = parseInt(time.replace("s", ""));
    }
    cy.wrap(initialTime).as("initialTime");
  });

  cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${childNo1}) > p`).each(($el) => {
    const time = $el.text();
    if (time.includes("m") && time.includes("s")) {
      updatedTime = parseInt(time.split("m")[0]) * 60 + parseInt(time.split("m")[1].replace("s", "").trim());
    } else if (time.endsWith("m")) {
      updatedTime = parseInt(time.replace("m", "")) * 60;
    } else if (time.endsWith("s")) {
      updatedTime = parseInt(time.replace("s", ""));
    }
    cy.wrap(updatedTime).as("updatedTime");
    cy.get('@initialTime').then((initialTime) => {
      
    });
    expect(initialTime).to.be.at.most(updatedTime);
  });
}
export function RaceNamesFilter(ch1, ch2, ch3, ch4, ch5) {
  cy.get('.filter-checkbox').eq(1).click();
  cy.get('.filter-checkbox').eq(2).click();

  const thorNames = [];
  const greyNames = [];
  const harnNames = [];

  const getNames = (ch, namesArray) => {
    cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${ch}) > div > p`)
      .each(($el) => {
        namesArray.push($el.text());
      });
  }

  getNames(ch1, thorNames);
  getNames(ch2, thorNames);
  getNames(ch3, thorNames);
  getNames(ch4, thorNames);
  getNames(ch5, thorNames);

  cy.get('.filter-checkbox').eq(1).click();
  cy.get('.filter-checkbox').eq(2).click();
  cy.get('.filter-checkbox').eq(0).click();
  cy.get('.filter-checkbox').eq(2).click();

  getNames(ch1, greyNames);
  getNames(ch2, greyNames);
  getNames(ch3, greyNames);
  getNames(ch4, greyNames);
  getNames(ch5, greyNames);

  cy.get('.filter-checkbox').eq(2).click();
  cy.get('.filter-checkbox').eq(1).click();

  getNames(ch1, harnNames);
  getNames(ch2, harnNames);
  getNames(ch3, harnNames);
  getNames(ch4, harnNames);
  getNames(ch5, harnNames);

  return {
    thor: thorNames,
    grey: greyNames,
    harn: harnNames
  };
}

export function RacesCodeFilter(ch1, ch2, ch3, ch4, ch5) {
          cy.get('.filter-checkbox').eq(1).click();
          cy.get('.filter-checkbox').eq(2).click();
        
          const thorNames = [];
          const greyNames = [];
          const harnNames = [];
        
          const getNames = (ch, namesArray) => {
            cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${ch}) > div > b`)          
              .each(($el) => {
                namesArray.push($el.text());
              });
          }
        
          getNames(ch1, thorNames);
          getNames(ch2, thorNames);
          getNames(ch3, thorNames);
          getNames(ch4, thorNames);
          getNames(ch5, thorNames);
        
          cy.get('.filter-checkbox').eq(1).click();
          cy.get('.filter-checkbox').eq(2).click();
          cy.get('.filter-checkbox').eq(0).click();
          cy.get('.filter-checkbox').eq(2).click();
        
          getNames(ch1, greyNames);
          getNames(ch2, greyNames);
          getNames(ch3, greyNames);
          getNames(ch4, greyNames);
          getNames(ch5, greyNames);
        
          cy.get('.filter-checkbox').eq(2).click();
          cy.get('.filter-checkbox').eq(1).click();
        
          getNames(ch1, harnNames);
          getNames(ch2, harnNames);
          getNames(ch3, harnNames);
          getNames(ch4, harnNames);
          getNames(ch5, harnNames);
        
          return {
            thor: thorNames,
            grey: greyNames,
            harn: harnNames
          };
        }


   export function raceNamesNotEqual(childNo,childNo1) {
          let firstRace = 0;
          let secondRace = 0;
        
          cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${childNo}) > div > p`).each(($el) => {                
            const time = $el.text();
          
              const firstRace = time
            
            cy.wrap(firstRace).as("firstRace");
          });
        
          cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${childNo1}) > div > p`).each(($el) => {
            const time = $el.text();
           
            const secondRace = time
          
          cy.wrap(secondRace).as("secondRace");
            
          });
          expect(firstRace).to.be.at.most(secondRace);
        }