describe('проверяем доступность приложения', function() {
    it('сервис должен быть доступен по адресу localhost:4000', function() {
        cy.visit('http://localhost:4000'); 
    });
});

describe('Модальное окно ингредиента', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
  });

//   it('Открывается по клику на ингредиент', () => {
//     // Сначала перехватываем API
//     cy.intercept('GET', '**/api/ingredients').as('getIngredients');

//     // Теперь кликаем по элементу, который вызывает запрос
//     cy.get('[data-testid="ingredient-link"]').first().click({ force: true });

//     // Ждем, пока ответ придет
//     cy.wait('@getIngredients');

//     // Проверяем URL
//     cy.url().should('include', '/ingredients/');

//     // Проверяем, что элемент с данными ингредиента виден
//     cy.get('[data-testid="ingredient-details"]').should('be.visible');
//   });

// //   it('Закрывается по крестику', () => {
// //     cy.get('[data-testid="ingredient-card"]').first().click();
// //     cy.get('[data-testid="modal"]').should('be.visible');
// //     cy.get('[data-testid="modal-close"]').click();
// //     cy.get('[data-testid="modal"]').should('not.exist');
// //   });
});