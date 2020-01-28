/// <reference types="Cypress" />

describe(`auth`, () => {
  it(`allow signup and login`, () => {
    const email = getRandomEmail();

    cy.visit('/')
      .findByText('Login')
      .click()

      .findByText('Signup here')
      .click()

      .findByLabelText('Name')
      .type('Malcolm Kee')
      .findByLabelText('Email')
      .type(email)
      .findAllByText('Signup')
      .last()
      .click()

      .findByText(`You're already login!`)
      .should('be.visible')

      .findAllByText('Logout')
      .last()
      .click()

      .findByText('Login')
      .click()

      .findByLabelText('Email')
      .type(email)
      .findAllByText('Login')
      .last()
      .click()

      .findByText(`You're already login!`)
      .should('be.visible');
  });
});

function getRandomEmail() {
  const randomString =
    shuffleArray(
      new Date()
        .toLocaleDateString('de-De', {
          era: 'long',
          month: 'long',
          weekday: 'long',
        })
        .split('')
        .slice(0, 6)
    ).join('') + new Date().getMilliseconds();

  return `me${randomString}@gmail.com`;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
