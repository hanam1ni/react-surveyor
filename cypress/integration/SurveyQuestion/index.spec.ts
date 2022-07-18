describe('Survey question page', () => {
  beforeEach(() => {
    cy.login();

    const surveyId = 'd5de6a8f8f5f1cfe51bc';
    cy.interceptApi(`surveys/${surveyId}`, {
      statusCode: 200,
      fixture: 'requests/surveyDetail',
    }).as('getSurveyDetail');

    cy.visit(`/surveys/${surveyId}`);

    cy.wait(['@getSurveyDetail']);

    cy.findByRole('button', { name: /Start Survey/ }).click();
  });

  describe('given survey contains two questions', () => {
    describe('click on next question button', () => {
      it('displays the next question and submit button', () => {
        // First question
        cy.findByText('Food â€“ Variety, Taste and Presentation').should(
          'be.visible'
        );

        // Second question
        cy.findByText('Beverages â€“ Variety, Taste and Presentation').should(
          'not.be.visible'
        );

        cy.get('[data-testid="next-question-button"]').first().click();

        // First question
        cy.findByText('Food â€“ Variety, Taste and Presentation').should(
          'not.be.visible'
        );

        // Second question
        cy.findByText('Beverages â€“ Variety, Taste and Presentation').should(
          'be.visible'
        );

        cy.findByRole('button', { name: /Submit/ }).should('be.visible');
      });
    });
  });
});
