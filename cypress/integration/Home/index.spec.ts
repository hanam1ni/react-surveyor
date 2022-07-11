describe('Home page', () => {
  const goToSurveyItem = (index: number) => {
    cy.get('[data-testid="survey-list"]')
      .get('.swiper-pagination-bullet')
      .eq(index - 1)
      .click();
  };

  const scrollSurveyItem = (times: number) => {
    for (let time = 1; time <= times; time++) {
      cy.get('[data-testid="survey-list"]')
        .trigger('pointerdown')
        .trigger('pointermove', 'right')
        .trigger('pointermove', 'left')
        .trigger('pointerup');
      cy.wait(150);
    }
  };

  beforeEach(() => {
    cy.clock(new Date(2022, 0, 1).getTime(), ['Date']);
    cy.login();
  });

  it('displays the current date', () => {
    cy.interceptApi('surveys', {
      statusCode: 200,
      fixture: 'requests/emptySurveyList',
    }).as('listSurveys');

    cy.visit('/');

    cy.wait(['@listSurveys']);

    cy.findByText('Saturday, January 1').should('exist');
  });

  describe('when the surveys list is empty', () => {
    it('renders a placeholder', () => {
      cy.interceptApi('surveys', {
        statusCode: 200,
        fixture: 'requests/emptySurveyList',
      }).as('listSurveys');

      cy.visit('/');

      cy.wait(['@listSurveys']);

      cy.findByText(/You've completed all the surveys/).should('exist');
    });
  });

  describe('when the surveys list is not empty', () => {
    describe('scroll through survey list', () => {
      it('renders the survey item', () => {
        cy.interceptApi('surveys', {
          statusCode: 200,
          fixture: 'requests/surveyListPage1',
        }).as('listSurveys');

        cy.visit('/');

        cy.wait(['@listSurveys']);

        // Survey item #1
        cy.findByText('Scarlett Bangkok').should('be.visible');
        cy.findByText('Scarlett Bangkok Description').should('be.visible');
        // Survey item #2
        cy.findByText('ibis Bangkok Riverside').should('not.be.visible');
        cy.findByText('ibis Bangkok Riverside Description').should(
          'not.be.visible'
        );

        goToSurveyItem(2);

        // Survey item #1
        cy.findByText('Scarlett Bangkok').should('not.be.visible');
        cy.findByText('Scarlett Bangkok Description').should('not.be.visible');
        // Survey item #2
        cy.findByText('ibis Bangkok Riverside').should('be.visible');
        cy.findByText('ibis Bangkok Riverside Description').should(
          'be.visible'
        );
      });
    });

    describe('scroll to the last item of survey list', () => {
      it('fetches survey next page and renders the survey item', () => {
        cy.interceptApi('surveys', {
          statusCode: 200,
          fixture: 'requests/surveyListPage1',
        }).as('listSurveysPage1');

        cy.interceptApi('surveys?page%5Bnumber%5D=2', {
          statusCode: 200,
          fixture: 'requests/surveyListPage2',
        }).as('listSurveyPage2');

        cy.visit('/');

        cy.wait(['@listSurveysPage1']);

        goToSurveyItem(5);

        // Last survey item of the first page
        cy.findByText('Health Land Spa').should('be.visible');

        // Fetch the next page
        cy.wait(['@listSurveyPage2']);

        scrollSurveyItem(1);

        // First survey item of the second page
        cy.findByText('Tree Tops Australia').should('be.visible');
        cy.findByText('Love to hear from you').should('be.visible');
      });
    });

    describe('click on the survey item link', () => {
      it('redirects user to survey detail page', () => {
        const SURVEY_ID = 'd5de6a8f8f5f1cfe51bc';

        cy.interceptApi('surveys', {
          statusCode: 200,
          fixture: 'requests/surveyListPage1',
        }).as('listSurveys');

        cy.visit('/');

        cy.wait(['@listSurveys']);

        cy.get(`[data-testid="survey-item-link-${SURVEY_ID}"]`).click({
          force: true,
        });

        cy.url().should(
          'eq',
          Cypress.config().baseUrl + `/surveys/${SURVEY_ID}`
        );
      });
    });
  });
});
