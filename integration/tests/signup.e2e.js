describe(`signup flow`, () => {
  test.only(`success`, async () => {
    const browser = global.browser;
    const context = await browser.newContext();
    const page = await context.newPage('http://localhost:3000');

    console.log(page.url());

    const $loginLink = await getByText(page, 'Login');
    await $loginLink.click();
    console.log(page.url());
  });
});

function getByText(page, textString) {
  return page.$(`//*[contains(text(), '${textString}')]`);
}
