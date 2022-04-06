/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(): void;
    interceptApi(path: string, options: object): Chainable<any>;
  }
}
