describe('Survey detail page', () => {
  beforeEach(() => {
    cy.login();
  });

  it('displays survey intro', () => {
    const surveyId = 'd5de6a8f8f5f1cfe51bc';
    cy.interceptApi(`surveys/${surveyId}`, {
      statusCode: 200,
      fixture: 'requests/surveyDetail',
    }).as('getSurveyDetail');

    cy.visit(`/surveys/${surveyId}`);

    cy.wait(['@getSurveyDetail']);

    // Survey title
    cy.findByText('Scarlett Bangkok').should('exist');

    // Survey cover image
    cy.findByAltText(
      'Thank you for visiting Scarlett! Please take a moment to share your feedback.'
    ).should('exist');

    // Survey intro
    cy.findByText(
      'Thank you for visiting Scarlett! Please take a moment to share your feedback.'
    ).should('exist');
  });

  describe('click on start survey button', () => {
    it('redirects user to first survey question', () => {
      const surveyId = 'd5de6a8f8f5f1cfe51bc';
      cy.interceptApi(`surveys/${surveyId}`, {
        statusCode: 200,
        fixture: 'requests/surveyDetail',
      }).as('getSurveyDetail');

      cy.visit(`/surveys/${surveyId}`);

      cy.wait(['@getSurveyDetail']);

      cy.findByRole('button', { name: /Start Survey/ }).click();

      cy.findByText('Food â€“ Variety, Taste and Presentation', {
        timeout: 7000,
      }).should('be.visible');

      cy.url().should(
        'eq',
        Cypress.config().baseUrl + `/surveys/${surveyId}/questions`
      );
    });
  });
});
