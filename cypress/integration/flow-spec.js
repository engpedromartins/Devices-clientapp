Cypress.SelectorPlayground.defaults({
  selectorPriority: [
    'data-cy',
    'id',
    'class',
    'attributes',
    'data-test',
    'data-testid',
    'nth-child',
    'tag'
  ]
});
context('Ninja one simple flow test', () => {
  describe('Navegação na loja', () => {

    it('site navigation', () => {
      cy.visit('http://localhost:3001/');
    });

    it('filter devices by on type  WINDOWS_WORKSTATION', () => {
      cy.get('.MuiSelect-root').click()
      cy.get('[data-value="WINDOWS_WORKSTATION"] > .MuiListItemText-root > .MuiTypography-root').click()
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('have.text', 'WINDOWS_WORKSTATION')
    })
    it('filter devices by on type  WINDOWS_SERVER', () => {
      cy.get('[data-value="WINDOWS_WORKSTATION"] > .MuiListItemText-root > .MuiTypography-root').click()
      cy.get('[data-value="WINDOWS_SERVER"]').click()
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('have.text', 'WINDOWS_SERVER')
    })
    it('filter devices by on type  MAC', () => {
      cy.get('[data-value="WINDOWS_SERVER"]').click()
      cy.get('[data-value="MAC"]').click()
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('have.text', 'MAC')
    })

    it('filter devices by on type  MAC and WINDOWS_SERVER', () => {
      cy.get('[data-value="WINDOWS_SERVER"]').click()
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('have.text', 'MAC')
      cy.get(':nth-child(5) > :nth-child(2)').should('have.text', 'WINDOWS_SERVER')
    })

    it('filter devices by on type  MAC and WINDOWS_WORKSTATION', () => {
      cy.get('[data-value="WINDOWS_SERVER"]').click()
      cy.get('[data-value="WINDOWS_WORKSTATION"] > .MuiListItemText-root > .MuiTypography-root').click()
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('have.text', 'MAC')
      cy.get(':nth-child(5) > :nth-child(2)').should('have.text', 'WINDOWS_WORKSTATION')

    })

    it('filter devices by on type WINDOWS WORKSTATION and WINDOWS_SERVER', () => {
      cy.get('[data-value="MAC"]').click()
      cy.get('[data-value="WINDOWS_SERVER"]').click()
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('have.text', 'WINDOWS_WORKSTATION')
      cy.get(':nth-child(5) > :nth-child(2)').should('have.text', 'WINDOWS_SERVER')

    });

    it('filter devices by on type WINDOWS WORKSTATION, WINDOWS_SERVER and MAC', () => {
      cy.get('[data-value="MAC"]').click()
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('have.text', 'WINDOWS_WORKSTATION')
      cy.get(':nth-child(5) > :nth-child(2)').should('have.text', 'WINDOWS_SERVER')
      cy.get(':nth-child(10) > :nth-child(2)').should('have.text', 'MAC')

    });


  })
});
