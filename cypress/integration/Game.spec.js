describe("Gameplay test", () => {
  it("tests a win", () => {
    cy.visit('http://localhost:3000/')

    cy.get('.MuiButton-contained').click()

    cy.wait(700)

    cy.get('.bg-yellow-200 .border-yellow-500').click()

    cy.get('#score').contains('Score: 1')

    cy.wait(2700)

    cy.get('.bg-yellow-200 .border-yellow-500').click()

    cy.get('#score').contains('Score: 2')

    cy.wait(2700)

    cy.get('.bg-yellow-200 .border-yellow-500').click()

    cy.get('#score').contains('Score: 3')

    cy.wait(2700)

    cy.get('.bg-yellow-200 .border-yellow-500').click()

    cy.get('#score').contains('Score: 4')

    cy.wait(2700)

    cy.get('.bg-yellow-200 .border-yellow-500').click()

    cy.contains('Yay! You won!')

    expect(true).to.equal(true);
  });
});
