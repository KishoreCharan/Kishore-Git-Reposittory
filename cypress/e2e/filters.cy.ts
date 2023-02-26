import { RACING_CATEGORIES } from "../config/constants";
const { RaceNamesFilter, RacesCodeFilter, raceNamesNotEqual } = require("../support/functions");
describe('Category Filters', () => {
  before(() => {
    cy.visit('');
  })
  //here I uncheck the Throughbred checkbox and verify the check box is unchecked or not?
  it('should verify Thoroughbred checkbox after Uncheck', () => {
    cy.get('.filter-checkbox').eq(0).click();
    cy.get('.filter-checkbox').eq(0).should('not.be.checked');
  });

  // here I check the Throughbred checkbox and verify the check box is checked or not?
  it('should verify Thoroughbred checkbox after Check', () => {
    cy.get('.filter-checkbox').eq(0).click();
    cy.get('.filter-checkbox').eq(0).should('be.checked');
  });

  // here I uncheck the GreyHound checkbox and verify the check box is unchecked or not?
  it('should verify GreyHound checkbox after Uncheck', () => {
    cy.get('.filter-checkbox').eq(1).click();
    cy.get('.filter-checkbox').eq(1).should('not.be.checked');
  });


  // here I check the GreyHound checkbox and verify the check box is checked or not?
  it('should verify Greyhound check box  after Check', () => {
    cy.get('.filter-checkbox').eq(1).click();
    cy.get('.filter-checkbox').eq(1).should('be.checked');
  });

  // here I uncheck the Harness checkbox and verify the check box is unchecked or not?
  it('should verify Harness after Uncheck', () => {
    cy.get('.filter-checkbox').eq(2).click();
    cy.get('.filter-checkbox').eq(2).should('not.be.checked');
  });

  // here I check the Harness checkbox and verify the check box is checked or not?
  it('should verify Harness after Check', () => {
    cy.get('.filter-checkbox').eq(2).click();
    cy.get('.filter-checkbox').eq(2).should('be.checked');
  });

  // here I uncheck the Thoroughbred and GreyHound checkboxs and verify the check box is unchecked or not?
  it('should verify two check boxes after Uncheck both same time', () => {
    cy.get('.filter-checkbox').eq(0).click();
    cy.get('.filter-checkbox').eq(1).click();
    cy.get('.filter-checkbox').eq(0).should('not.be.checked');
    cy.get('.filter-checkbox').eq(1).should('not.be.checked');
  });

  // here I check the Thoroughbred and GreyHound checkboxs and verify the check box is checked or not?
  it('should verify two check boxes aftercheck both same time', () => {
    cy.get('.filter-checkbox').eq(0).click();
    cy.get('.filter-checkbox').eq(1).click();
    cy.get('.filter-checkbox').eq(0).should('be.checked');
    cy.get('.filter-checkbox').eq(1).should('be.checked');
  });

  // here I uncheck the Thoroughbred, Harness and GreyHound checkboxs and verify the check box is checked or not?
  it('Should three checkboxes be checked after uncheck all ', () => {
    cy.get('.filter-checkbox').eq(0).click();
    cy.get('.filter-checkbox').eq(1).click();
    cy.get('.filter-checkbox').eq(2).click();
    cy.get('.filter-checkbox').eq(0).should('be.checked');
    cy.get('.filter-checkbox').eq(1).should('be.checked');
    cy.get('.filter-checkbox').eq(2).should('be.checked');
  });

//here i checked all race names are not equal in same race category
  it('Should the race names not be equal in their respective categories', () => {
    raceNamesNotEqual(1, 2);
    raceNamesNotEqual(1, 3);
    raceNamesNotEqual(1, 4);
    raceNamesNotEqual(1, 5);
    raceNamesNotEqual(2, 1);
    raceNamesNotEqual(2, 3);
    raceNamesNotEqual(2, 4);
    raceNamesNotEqual(2, 5);
    raceNamesNotEqual(3, 1);
    raceNamesNotEqual(3, 2);
    raceNamesNotEqual(3, 4);
    raceNamesNotEqual(3, 5);
    raceNamesNotEqual(4, 1);
    raceNamesNotEqual(4, 2);
    raceNamesNotEqual(4, 3);
    raceNamesNotEqual(4, 5);
    raceNamesNotEqual(5, 1);
    raceNamesNotEqual(5, 2);
    raceNamesNotEqual(5, 3);
    raceNamesNotEqual(5, 4);
  })
  //here I checked all race names in filter 
  it('should verify every filter races names', () => {

    RaceNamesFilter(1, 2, 3, 4, 5);
  })

  //here I checked all race numbers in filter 
  it('should verify every filter races numbers', () => {

    RacesCodeFilter(1, 2, 3, 4, 5);
  })

});
