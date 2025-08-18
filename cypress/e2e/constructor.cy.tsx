import ingredients from '../fixtures/ingredients.json';
import userData from '../fixtures/user.json';
import orderData from '../fixtures/order.json';

describe('Проверка доступности приложения', function() {
  it('Сервис должен быть доступен по адресу localhost:4000', function() {
    cy.visit('http://localhost:4000'); 
  });
});

describe('Add Ingredients', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      statusCode: 200,
      body: {
        success: true,
        data: ingredients
      }
    }).as('getIngredients');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  it('Добавление одного ингредиента', () => {
    cy.get('.add-ingredient-button').first().click();
    cy.get('.constructor-element__text')
      .should('contain', ingredients[0].name);
  });

  it('Добавление двух ингредиентов', () => {
    cy.get('.add-ingredient-button').eq(0).click();
    cy.get('.add-ingredient-button').eq(1).click();
    cy.get('.constructor-element__text').eq(0).should('contain', ingredients[0].name);
    cy.get('.constructor-element__text').eq(1).should('contain', ingredients[1].name);
  });

  it('Открытие модального окна ингредиента', () => {
    cy.get('[data-testid="ingredient-link"]').first().click();
    cy.contains(ingredients[0].name).should('be.visible');
    cy.url().should('include', `/ingredients/${ingredients[0]._id}`);
  });

  it('Закрытие модалки по крестику', () => {
    cy.get('[data-testid="ingredient-link"]').first().click();
    cy.contains(ingredients[0].name).should('be.visible');
    cy.url().should('include', `/ingredients/${ingredients[0]._id}`);
    cy.get('[data-testid="button_close"]').first().click();
    cy.url().should('eq', 'http://localhost:4000/');
  });

  it('Закрытие модалки по оверлею', () => {
    cy.get('[data-testid="ingredient-link"]').first().click();
    cy.contains(ingredients[0].name).should('be.visible');
    cy.url().should('include', `/ingredients/${ingredients[0]._id}`);
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.url().should('eq', 'http://localhost:4000/');
  });
})

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      statusCode: 200,
      body: { success: true, data: ingredients }
    }).as('getIngredients');

    cy.intercept('GET', '**/auth/user', {
      statusCode: 200,
      body: { success: true, user: userData }
    }).as('getUser');

    cy.intercept('POST', '**/orders', {
      statusCode: 200,
      body: { success: true, order: orderData }
    }).as('createOrder');

    cy.setCookie('accessToken', 'Bearer mockAccessToken');
    cy.setCookie('refreshToken', 'mockRefreshToken');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

    it('Должен создать заказ и очистить конструктор', () => {
      cy.get('.add-ingredient-button').eq(0).click();
      cy.get('.add-ingredient-button').eq(1).click();
        
      cy.get('[data-testid="order-button"]').click();

      cy.get('[data-testid="ingredient-link"]').first().click();
      cy.contains(ingredients[0].name).should('be.visible');
      cy.contains(orderData.order.number).should('be.visible');

      cy.get('[data-testid="button_close"]').first().click();
      cy.url().should('eq', 'http://localhost:4000/');

      cy.get('.constructorItems.ingredients.length').should('have.length', 0);
      });
  });