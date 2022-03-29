import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', () => {
  cy.intercept(`${Cypress.env('NEXT_PUBLIC_BASE_API_URL')}/me`, {
    fixture: 'requests/userProfile',
  }).as('getUserProfile');
});

Cypress.Commands.add('interceptApi', (path, options) =>
  cy.intercept(`${Cypress.env('NEXT_PUBLIC_BASE_API_URL')}${path}`, options)
);
