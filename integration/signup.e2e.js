describe(`signup flow`, () => {
  test(`success`, async () => {
    const browser = global.browser;
    const context = await browser.newContext();
    const page = await context.newPage('http://localhost:3000');

    await page.goto('http://localhost:3000/signup');

    const content = await page.content();

    console.log(content);
  });
});
