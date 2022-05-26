describe('Home page', () => {
  beforeEach(() => {
    cy.clock(new Date(2022, 0, 1).getTime(), ['Date']);
    cy.login();
  });

  it('displays the current date', () => {
    cy.interceptApi('/surveys', {
      statusCode: 200,
      fixture: 'requests/emptySurveyList',
    }).as('listSurveys');

    cy.visit('/');

    cy.wait(['@listSurveys']);

    cy.findByText('Saturday, January 1').should('exist');
  });

  describe('when the surveys list is empty', () => {
    it('renders a placeholder', () => {
      cy.interceptApi('/surveys', {
        statusCode: 200,
        fixture: 'requests/emptySurveyList',
      }).as('listSurveys');

      cy.visit('/');

      cy.wait(['@listSurveys']);

      cy.findByText(/You've completed all the surveys/).should('exist');
    });
  });

  describe('when the surveys list is not empty', () => {
    it('renders the survey item', () => {
      cy.interceptApi('/surveys', {
        statusCode: 200,
        fixture: 'requests/surveyList',
      }).as('listSurveys');

      cy.visit('/');

      cy.wait(['@listSurveys']);

      // Survey #1
      cy.findByText('Scarlett Bangkok').should('exist');
      cy.findByText("We'd love ot hear from you!").should('exist');

      // Survey #2
      cy.findByText('ibis Bangkok Riverside').should('exist');
      cy.findByText('ibis Riverside Description').should('exist');

      // Survey #3
      cy.findByText('21 on Rajah').should('exist');
      cy.findByText('Rajah description').should('exist');
    });
  });
});
