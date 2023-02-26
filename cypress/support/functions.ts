import { RACING_CATEGORIES } from "../config/constants";

// this function is for Count Down time is updating or not,I added 3 secs wait between initial time and updated time.
// Converted minutes and seconds to Seconds then compared the Initial time and updated time
export function verifyTime(childNo) {
          let initialTime = 0;
          let updatedTime = 0;

          cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${childNo}) > p`).each(($el) => {
                    const time = $el.text();
                    if (time.includes("m") && time.includes("s")) {
                              if (time.startsWith("-")) {
                                        initialTime -= parseInt(time.split("m")[0].replace("-", "")) * 60 + parseInt(time.split(" ")[1].replace("s", "").trim());
                              } else {
                                        initialTime += parseInt(time.split("m")[0]) * 60 + parseInt(time.split("m")[1].replace("s", "").trim());
                              }
                    }
                    else if (time.endsWith("m")) {
                              initialTime = parseInt(time.replace("m", "")) * 60;
                    } else if (time.endsWith("s")) {
                              initialTime = parseInt(time.replace("s", ""));
                    }
                    cy.wrap(initialTime).as("initialTime");
          });

          cy.wait(3000);

          cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${childNo}) > p`).each(($el) => {
                    const time = $el.text();
                    if (time.includes("m") && time.includes("s")) {
                              if (time.startsWith("-")) {
                                        updatedTime -= parseInt(time.split("m")[0].replace("-", "")) * 60 + parseInt(time.split(" ")[1].replace("s", "").trim());
                              } else {
                                        updatedTime += parseInt(time.split("m")[0]) * 60 + parseInt(time.split("m")[1].replace("s", "").trim());
                              }
                    }
                    else if (time.endsWith("m")) {
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

//this function is  for verifying  races count down time is in ascending order from to bottom .top one race countdown time is less than following races count down time
export function verifyRacesTime(childNo, childNo1) {
          let initialTime = 0;
          let updatedTime = 0;

          cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${childNo}) > p`).each(($el) => {
                    const time = $el.text();
                    if (time.includes("m") && time.includes("s")) {
                              if (time.startsWith("-")) {
                                        initialTime -= parseInt(time.split("m")[0].replace("-", "")) * 60 + parseInt(time.split(" ")[1].replace("s", "").trim());
                              } else {
                                        initialTime += parseInt(time.split("m")[0]) * 60 + parseInt(time.split("m")[1].replace("s", "").trim());
                              }
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
                              if (time.startsWith("-")) {
                                        updatedTime -= parseInt(time.split("m")[0].replace("-", "")) * 60 + parseInt(time.split(" ")[1].replace("s", "").trim());
                              } else {
                                        updatedTime += parseInt(time.split("m")[0]) * 60 + parseInt(time.split("m")[1].replace("s", "").trim());
                              }
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
//This function is for verifying the all race names in all race categories
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
//This function is for verifying the all race numbers in all race categories
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
//This function is for verifying the all race names are not equal in same race category
export function raceNamesNotEqual(childNo, childNo1) {
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
//This function is for capaturing and asserting the all race names in race category filter
export function CaptureRaceNames(ch1, ch2, ch3, ch4, ch5) {
          let race1 = 0;
          let race2 = 0;
          let race3 = 0;
          let race4 = 0;
          let race5 = 0;
          cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${ch1}) > div > p`).each(($el) => {
                    const race1 = $el.text();
                    cy.wrap(race1).as("race1");
                    expect(race1).equals(race1)
          })
          cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${ch2}) > div > p`).each(($el) => {
                    const race2 = $el.text();
                    cy.wrap(race2).as("race2");
                    expect(race2).equals(race2)
          })
          cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${ch3}) > div > p`).each(($el) => {
                    const race3 = $el.text();
                    cy.wrap(race3).as("race3");
                    expect(race3).equals(race3)
          })
          cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${ch4}) > div > p`).each(($el) => {
                    const race4 = $el.text();
                    cy.wrap(race4).as("race4");
                    expect(race4).equals(race4)
          })
          cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${ch5}) > div > p`).each(($el) => {
                    const race5 = $el.text();
                    cy.wrap(race5).as("race5");
                    expect(race5).equals(race5)
          })
}
//This function is for capaturing and asserting the all race numbers in race category filter
export function CaptureRaceIds(ch1, ch2, ch3, ch4, ch5) {
          let race1 = 0;
          let race2 = 0;
          let race3 = 0;
          let race4 = 0;
          let race5 = 0;
          cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${ch1}) > div > b`).each(($el) => {
                    const race1 = $el.text();
                    cy.wrap(race1).as("race1");
                    expect(race1).equals(race1)
          })
          cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${ch2}) > div > b`).each(($el) => {
                    const race2 = $el.text();
                    cy.wrap(race2).as("race2");
                    expect(race2).equals(race2)
          })
          cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${ch3}) > div > b`).each(($el) => {
                    const race3 = $el.text();
                    cy.wrap(race3).as("race3");
                    expect(race3).equals(race3)
          })
          cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${ch4}) > div > b`).each(($el) => {
                    const race4 = $el.text();
                    cy.wrap(race4).as("race4");
                    expect(race4).equals(race4)
          })
          cy.get(`#root > div > header > div > div > div:nth-child(3) > div:nth-child(${ch5}) > div > b`).each(($el) => {
                    const race5 = $el.text();
                    cy.wrap(race5).as("race5");
                    expect(race5).equals(race5)
          })
}