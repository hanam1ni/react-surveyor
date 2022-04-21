describe('Reset password page', () => {
  describe('given the email', () => {
    it('renders the success message', () => {
      cy.interceptApi('/me', {
        statusCode: 401,
        fixture: 'requests/unauthorizedUserProfile',
      }).as('getUserProfile');

      cy.interceptApi('/passwords', {
        fixture: 'requests/resetPassword',
      }).as('resetPassword');

      cy.visit('/password-reset');

      cy.findByLabelText('Email').type('user@mail.com');
      cy.findByRole('button', { name: /Send Recovery Email/ }).click();

      cy.wait(['@getUserProfile', '@resetPassword']);

      cy.findByText(
        "We've email you instructions to reset your password."
      ).should('exist');
    });
  });
});
