
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
  describe('filter devices by type', () => {

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

  describe('testing button actions', () => {
    it('Add', () => {
      cy.visit('http://localhost:3001/');
      cy.get('.button-send').click()
      cy.get('#system_name').type('test')
      cy.get('#type').click()
      cy.get('[data-value="MAC"]').click()
      cy.get('#hdd_capacity').click().type('128')
      cy.get('.MuiButton-label').click()
      cy.get(':nth-child(11) > :nth-child(1)').should('have.text', 'test');
      cy.get(':nth-child(11) > :nth-child(2)').should('have.text', 'MAC');
      cy.get(':nth-child(11) > :nth-child(3)').should('have.text', '128 GB');
    });


    it('Delete', () => {
      cy.get(':nth-child(11) > :nth-child(4) > .button-stack > :nth-child(2)').click()
      cy.get('.container-modal > .button-stack > :nth-child(2) > [stroke="currentColor"]').click()
      cy.get(':nth-child(11) > :nth-child(4) > .button-stack > :nth-child(2)').click()
      cy.get('.container-modal > .button-stack > [style="margin-right: 5px;"]').click()
      cy.get(':nth-child(10) > :nth-child(1)').should('have.text', 'JULIO-MAC-LOCAL')
    });

    it('Update', () => {
      cy.get(':nth-child(1) > :nth-child(4) > .button-stack > [style="margin-right: 5px;"]').click()
      cy.get('#system_name').clear().type('test')
      cy.get('.MuiButton-label').click()
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('have.text', 'test')
    });

  })

  describe('testing Order', () => {
    it('Orde by name', () => {
      cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').click()
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('have.text', 'ARMANDO-SERVER')
    })

    it('Orde by type', () => {
      cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').click()
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(2)').should('have.text', 'MAC')
    })

    it('Orde by capacity', () => {
      cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').click()
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(3)').should('have.text', '10 GB')
    })
  })


});
