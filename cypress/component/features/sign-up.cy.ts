import { SignUpComponent } from 'src/app/features/sign-up/sign-up.component';

describe('Empty form', () => {
  it('Visits the sign up page', () => {
    cy.visit('/new-user');
    cy.get('[data-cy="email"]').as('email');
    cy.get('@email').type('wrong-email');
    /**
     *     cy.get('[data-cy="emailPatternError"]').as('emailPatternError');
     */

    cy.contains('Next').click();
  });
});
