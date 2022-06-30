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
});