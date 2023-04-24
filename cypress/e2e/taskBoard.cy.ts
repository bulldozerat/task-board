import task from '../fixtures/task.json'

describe('task interactions', () => {
  beforeEach(() => {
    cy.visit('/')

    const { title, description, priority } = task
    cy.createTask({ title, description, priority })
  })

  it('Creates a task, verifies its data, deletes the task', () => {
    const { title, description, priority } = task

    // check if task data is on the board and open view task modal
    const taskTitle = cy.contains(title)
    cy.contains(priority)
    taskTitle.click()

    // check view task modal data
    cy.get('#modal-modal-title').should('have.text', 'Task Information')
    cy.get('form').contains(title)
    cy.get('form').contains(priority)
    cy.get('form').contains(description)

    // get the task number and delete the task
    cy.get('*[class^="InformationTaskForm_informationFormTaskNumber"]').then($task => {
      const taskNumber = $task.text()
      cy.get('form').contains(taskNumber)

      const deleteTaskButton = cy.findByRole('button', { name: /delete/i })
      deleteTaskButton.click()

      cy.contains(taskNumber).should('not.exist')
    })
  })

  it('Creates a task and updates its information', () => {
    const { title, priority } = task

    // open task view modal
    const taskTitle = cy.contains(title)
    taskTitle.click()

    // open edit task modal
    const editTaskButton = cy.get('form').findByRole('button', { name: /edit/i })
    editTaskButton.click()

    // update task with new data
    const updateTaskData = {
      title: 'Updated title',
      description: 'Updated description',
      priority: 'HIGH'
    }

    const taskTitleInput = cy.get('form').findByRole('textbox', { name: /edit title/i })
    taskTitleInput.clear().type(updateTaskData.title)

    const editDescription = cy.get('form').findByRole('textbox', { name: /edit description/i })
    editDescription.clear().type(updateTaskData.description)

    cy.findByRole('button', { name: RegExp(priority, 'i') }).click()
    cy.get(`[data-value="${updateTaskData.priority}"]`).click()

    // save changes and verify if the task was updates
    const saveChangesButton = cy.get('form').findByRole('button', { name: /save changes/i })
    saveChangesButton.click()

    cy.contains(updateTaskData.title)
    cy.contains(updateTaskData.priority)
  })

  it('Creates a task and moves it in different columns', () => {
    const dataTransfer = new DataTransfer();

    // Check if todo column has one task
    cy.get('*[class^="BoardColumn_boardColumnTitle"]').contains('Todo 1')
    cy.get('*[class^="BoardColumn_boardColumnTitle"]').contains('Blocked 0')
    cy.get('*[class^="BoardColumn_boardColumnTitle"]').contains('Done 0')

    // move the task in blocked column
    const taskOnBoard = cy.get('*[class^="BoardTask_boardTask"]').first()
    taskOnBoard.trigger('dragstart', { dataTransfer });

    const blockedColumn = cy.get('*[class^="BoardColumn_boardColumnTitle"]').contains('Blocked 0')
    blockedColumn.trigger('drop', { dataTransfer })

    // check if the task was moved in Blocked column
    cy.get('*[class^="BoardColumn_boardColumnTitle"]').contains('Todo 0')
    cy.get('*[class^="BoardColumn_boardColumnTitle"]').contains('Blocked 1')
    cy.get('*[class^="BoardColumn_boardColumnTitle"]').contains('Done 0')

    // move the task in done column
    const blockedColumnTask = cy.get('*[class^="BoardTask_boardTask"]').first()
    blockedColumnTask.trigger('dragstart', { dataTransfer });

    const doneColumn = cy.get('*[class^="BoardColumn_boardColumnTitle"]').contains('Done 0')
    doneColumn.trigger('drop', { dataTransfer })

    // check if the task was moved in Todo column
    cy.get('*[class^="BoardColumn_boardColumnTitle"]').contains('Todo 0')
    cy.get('*[class^="BoardColumn_boardColumnTitle"]').contains('Blocked 0')
    cy.get('*[class^="BoardColumn_boardColumnTitle"]').contains('Done 1')
  })
})
