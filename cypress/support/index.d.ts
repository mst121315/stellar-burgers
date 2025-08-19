declare namespace Cypress {
  interface Chainable {
    addIngredient(index: number): Chainable<void>;
    openIngredientModal(): Chainable<void>;
    closeModalByCross(): Chainable<void>;
    closeModalByOverlay(): Chainable<void>;
  }
}
