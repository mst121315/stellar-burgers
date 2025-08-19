import ingredients from '../fixtures/ingredients.json';
import userData from '../fixtures/user.json';
import orderData from '../fixtures/order.json';

import { selectors } from '../support/selectors';

const testUrl = 'http://localhost:4000';

describe('Проверка доступности приложения', function() {
  it('Сервис должен быть доступен по адресу localhost:4000', function() {
    cy.visit(testUrl);
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

    cy.visit(testUrl);
    cy.wait('@getIngredients');
  });

  it('Добавление одного ингредиента', () => {
    cy.addIngredient(0);
    cy.get(selectors.constructorElementText)
      .should('contain', ingredients[0].name);
  });

  it('Добавление двух ингредиентов', () => {
    cy.addIngredient(0);
    cy.addIngredient(1);
    cy.get(selectors.constructorElementText).eq(0).should('contain', ingredients[0].name);
    cy.get(selectors.constructorElementText).eq(1).should('contain', ingredients[1].name);
  });

  it('Открытие модального окна ингредиента', () => {
    cy.openIngredientModal();
    cy.contains(ingredients[0].name).should('be.visible');
    cy.url().should('include', `/ingredients/${ingredients[0]._id}`);
  });

  it('Закрытие модалки по крестику', () => {
    cy.openIngredientModal();
    cy.contains(ingredients[0].name).should('be.visible');
    cy.url().should('include', `/ingredients/${ingredients[0]._id}`);
    cy.closeModalByCross();
    cy.url().should('include', testUrl);
  });

  it('Закрытие модалки по оверлею', () => {
    cy.openIngredientModal();
    cy.contains(ingredients[0].name).should('be.visible');
    cy.url().should('include', `/ingredients/${ingredients[0]._id}`);
    cy.closeModalByOverlay();
    cy.url().should('include', testUrl);
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

    cy.visit(testUrl);
    cy.wait('@getIngredients');
  });

    it('Должен создать заказ и очистить конструктор', () => {
      cy.addIngredient(0);
      cy.addIngredient(1);
        
      cy.get(selectors.orderButton).click();

      cy.openIngredientModal();
      cy.contains(ingredients[0].name).should('be.visible');
      cy.contains(orderData.order.number).should('be.visible');

      cy.closeModalByCross();
      cy.url().should('include', testUrl);

      cy.get('.constructorItems.ingredients.length').should('have.length', 0);
      });
  });