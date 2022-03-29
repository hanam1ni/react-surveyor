describe('Login page', () => {
  describe('when given valid credential', () => {
    it('redirects user to home page', () => {
      cy.visit('/login');

      cy.interceptApi('/oauth/token', {
        fixture: 'requests/oauthToken',
      }).as('login');

      cy.interceptApi('/me', {
        fixture: 'requests/userProfile',
      }).as('getUserProfile');

      cy.findByLabelText('Email').type('user@mail.com');
      cy.findByLabelText('Password').type('super-secret-password');
      cy.findByRole('button', { name: /Sign in/ }).click();

      cy.wait(['@login', '@getUserProfile']);

      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });
});
