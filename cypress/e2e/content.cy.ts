/// <reference types="cypress" />
const { CaptureRaceNames, CaptureRaceIds } = require("../support/functions");

import { RACING_CATEGORIES } from "../config/constants";

describe('Page Content', () => {
  before('navigating to site', () => {
    cy.visit('')
  })
  it('Should correctly display page title', () => {

    cy.get('[data-testid=page-title]').contains('Next To Go Races').and('be.visible');
  })
  it('Should have all filters checked by default', () => {

    cy.get('[data-testid=category-filters]').within(() => {
      RACING_CATEGORIES.forEach((category) => {
        cy.get(`[data-testid=category-filter-${category.categoryId}]`).within(() => {
          cy.get('[data-testid=category-filter-label]').contains(category.name).and('be.visible');
          cy.get('[data-testid=category-filter-checkbox]').should('be.checked');
        });
      })
    });
  })

  //here I capture race categories length
  it('Should have a length of 3, the race categories', () => {
    cy.get('.category-filter').then(($els) => {
      const categoryCount = $els.length
      expect(categoryCount).to.equal(3)
    });
  })
//here I capture races length
  it('Should have a length of 5, the races', () => {
    cy.get('.item').then(($els) => {
      const itemCount = $els.length
      expect(itemCount).to.equal(5)
    });
  })
  //here I capture race Names
  it('should capture and Assert race names', () => {
    CaptureRaceNames(1, 2, 3, 4, 5);
  });
  //here I capture race numbers
  it('should capture and Assert race numbers', () => {
    CaptureRaceIds(1, 2, 3, 4, 5);
  });
})

// here I check the count down times contains either m or s or h
it('should contain "m" or "s" or "h", the race countdown times', () => {
  cy.visit('');
  for (let i = 1; i < 6; i++) {
    cy.get(`div:nth-child(3) > div:nth-child(${i}) > p`).then(($el) => {
      const times = $el.text();
      expect(times.includes("m") || times.includes("s") || times.includes("h")).to.be.true;

    });
  }
});