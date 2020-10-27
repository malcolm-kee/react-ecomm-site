describe(`canary`, () => {
  it(`able to load`, () => {
    cy.visit('/');
  });

  it(`able to click carousel`, () => {
    cy.visit('/');

    cy.wait(1000);

    cy.findAllByTestId('carousel-indicator').eq(3).click();
  });
});
