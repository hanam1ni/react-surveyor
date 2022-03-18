describe('Home page', () => {
  it('displays header', () => {
    cy.visit('/');

    cy.findByText('Coming soon. Stay tune for more content 😎').should('exist');
  });
});
