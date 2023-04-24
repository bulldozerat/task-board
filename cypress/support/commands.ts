/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import { IBoardTask } from "types/Board.interfaces"

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

declare global {
  namespace Cypress {
    interface Chainable {
      createTask(taskInfo: { title: string, description: string, priority: string }): Chainable<void>
    }
  }
}

Cypress.Commands.add("createTask", ({ title, description, priority }) => {
  const openCreateTaskFormButton = cy.findByRole('button', { name: /create task/i })
  openCreateTaskFormButton.click()

  // fill create task form and submit
  cy.findByRole('textbox', { name: /task title/i }).type(title)
  cy.findByRole('button', { name: /none/i }).click()
  cy.get(`[data-value="${priority}"]`).click()
  cy.findByRole('textbox', { name: /task description/i }).type(description)
  cy.findByRole('button', { name: /create new task/i }).click()
})
