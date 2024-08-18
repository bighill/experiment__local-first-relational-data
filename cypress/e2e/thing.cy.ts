const thing1 = {
  title: 'thing 1 title',
  content: 'thing 1 content',
  tag: '#Thing1tag',
}

const foo = 'foo'

describe('Thing', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('create thing', () => {
    cy.get('[data-cy-input="new-thing"]').type(thing1.title)
    cy.get('[data-cy-input="new-thing"]').should('have.value', thing1.title)
    cy.get('[data-cy-input="new-thing"]').type('{enter}')
    cy.get('[data-cy-input="new-thing"]').should('have.value', '')
    cy.get('[data-cy-label="thing-title"]').should('have.text', thing1.title)
  })

  it('update thing title', () => {
    cy.get('[data-cy-input="update-thing-title"]').type(foo)
    cy.get('[data-cy-input="update-thing-title"]').should(
      'have.value',
      thing1.title + foo
    )
    cy.get('[data-cy-input="update-thing-title"]').type('{enter}')
    cy.get('[data-cy-input="update-thing-title"]').should(
      'have.value',
      thing1.title + foo
    )
    cy.get('[data-cy-label="thing-title"]').should(
      'have.text',
      thing1.title + foo
    )
  })

  it('update thing content', () => {
    cy.get('[data-cy-input="update-thing-content"]').type(thing1.content)
    cy.get('[data-cy-input="update-thing-content"]').should(
      'have.value',
      thing1.content
    )
    cy.get('[data-cy-btn="update-thing"]').click()
    cy.get('[data-cy-input="update-thing-content"]').should(
      'have.value',
      thing1.content
    )
  })

  it('add tag', () => {
    cy.get('[data-cy-input="update-thing-content"]').type(' ' + thing1.tag)
    cy.get('[data-cy-btn="update-thing"]').click()
    cy.get('[data-cy-label="thing-tag"]').should('have.text', thing1.tag)
    cy.get('[data-cy-btn="delete-tag"]').click()
  })

  it('delete thing', () => {
    cy.get('[data-cy-btn="delete-thing"]').click()
    cy.get('[data-cy-btn="delete-thing"]').should('not.exist')
  })
})
