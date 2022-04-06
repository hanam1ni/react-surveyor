describe('Login page', () => {
  describe('given valid credentials', () => {
    it('redirects user to home page', () => {
      cy.interceptApi('/me', {
        statusCode: 401,
        fixture: 'requests/unauthorizedUserProfile',
      }).as('getUserProfile');

      cy.interceptApi('/oauth/token', {
        fixture: 'requests/oauthToken',
      }).as('login');

      cy.visit('/login');

      cy.findByLabelText('Email').type('user@mail.com');
      cy.findByLabelText('Password').type('super-secret-password');
      cy.findByRole('button', { name: /Sign in/ }).click();

      cy.wait(['@login', '@getUserProfile']);

      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });
});
