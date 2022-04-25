describe('Home page', () => {
  it('displays the current date', () => {
    cy.clock(new Date(2022, 0, 1).getTime(), ['Date']);

    cy.login();

    cy.visit('/');

    cy.findByText('Saturday, January 1').should('exist');
  });
});
