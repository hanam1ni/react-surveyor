describe('Home page', () => {
  it('displays header', () => {
    cy.login();

    cy.visit('/');

    cy.findByText('Coming soon. Stay tune for more content 😎').should('exist');
  });
});
