  import { RACING_CATEGORIES } from "../config/constants";
  const { verifyTime , verifyRacesTime } = require("../support/functions");
   
  describe('Countdown Timer', () => {
   //here I given wait for 5 secs and compare the initial time vs updated time of same race.initial time either equal or less than to Updated time
    it('should verify  countdown time is always updated', () => {
      cy.visit('');
      verifyTime(1);
      verifyTime(2);
      verifyTime(3);
      verifyTime(4);
      verifyTime(5);
    });
   //here I compare two races count down time. ex: countdown time of race1<=race2
    it('Should verify that the countdown time of races is displayed in ascending order.', () => {
      cy.visit('');
      verifyRacesTime(1,2);
      verifyRacesTime(2,3);
      verifyRacesTime(3,4);
      verifyRacesTime(4,5);
      verifyRacesTime(4,5);
      
     
    });
 
  })

