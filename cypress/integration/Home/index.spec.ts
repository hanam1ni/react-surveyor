describe('Home page', () => {
  it('displays header', () => {
    cy.visit('/');

    cy.findByText('Header styled with Tailwindcss').should('exist');
  });
});
