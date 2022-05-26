describe('Home page', () => {
  it('displays the current date and placeholder', () => {
    cy.interceptApi('/surveys', {
      statusCode: 200,
      fixture: 'requests/emptySurveyList',
    }).as('listSurveys');

    cy.clock(new Date(2022, 0, 1).getTime(), ['Date']);

    cy.login();

    cy.visit('/');

    cy.wait(['@listSurveys']);

    cy.findByText('Saturday, January 1').should('exist');
    cy.findByText(/You've completed all the surveys/).should('exist');
  });
});
