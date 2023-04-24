import task from '../fixtures/task.json'

describe('comments interactions', () => {
  beforeEach(() => {
    cy.visit('/')

    const { title, description, priority } = task
    cy.createTask({ title, description, priority })
  })

  it('comment - add, edit, cancel edit, delete, check if saved, more than one', () => {
    const { title } = task
    const firstCommentText = 'First comment text'
    const secondCommentText = 'Second comment text'

    // open task view modal
    const taskTitle = cy.contains(title)
    taskTitle.click()

    // add two comments and check if they were added
    cy.findByRole('textbox', { name: /add new comment/i }).type(firstCommentText)
    cy.get('[data-testid="PostAddIcon"]').click()

    cy.findByRole('textbox', { name: /add new comment/i }).type(secondCommentText)
    cy.get('[data-testid="PostAddIcon"]').click()

    cy.get('form').contains(firstCommentText)
    cy.get('form').contains(secondCommentText)

    // delete the second comment (newly added comments appear on top)
    const deleteIcon = cy.get('[data-testid="DeleteIcon"]').first()
    deleteIcon.click()

    cy.get('form').contains(firstCommentText)
    cy.get('form').contains(secondCommentText).should('not.exist')

    // edit the first comment
    const firstCommentNewTest = 'New text'
    const editIcon = cy.get('[data-testid="ModeEditIcon"]')
    editIcon.click()

    const commentInput = cy.get('form').contains(firstCommentText)
    commentInput.clear().type(firstCommentNewTest)

    const saveCommentIcon = cy.get('[data-testid="PostAddIcon"]')
    saveCommentIcon.click()

    cy.get('form').contains(firstCommentNewTest)
    cy.get('form').contains(firstCommentText).should('not.exist')

    // cancel edit comment
    cy.get('[data-testid="CancelIcon"]').should('not.exist')

    const updatedEditIcon = cy.get('[data-testid="ModeEditIcon"]')
    updatedEditIcon.click()

    const cancelIcon = cy.get('[data-testid="CancelIcon"]')
    cancelIcon.should('exist')
    cancelIcon.click()
    cancelIcon.should('not.exist')
  })
})