const jestConfig = require("./jest.config");

let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });
  jest.setTimeout(60000);
  test("The h1 header content'", async () => {
    jest.setTimeout(10000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub · Change is constant. GitHub keeps you ahead. · GitHub",
    );
  });

  test("The first link attribute", async () => {
    jest.setTimeout(10000);
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    jest.setTimeout(10000);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  });
});

describe("Github page tests 2", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/pricing");
  });

  jest.setTimeout(60000);

  test("The h1 header content'", async () => {
    jest.setTimeout(10000);
    const firstLink = await page.$(".btn-mktg.tmp-mt-4");
    await firstLink.click();
    await page.waitForSelector("head");
    const title2 = await page.title();
    expect(title2).toEqual("Choose an Enterprise plan · GitHub");
  });

  test("The first link attribute", async () => {
    jest.setTimeout(10000);
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Start free for 30 days in button", async () => {
    jest.setTimeout(10000);
    const btnSelector = ".btn-mktg.tmp-mt-4";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Start free for 30 days");
  });
});
