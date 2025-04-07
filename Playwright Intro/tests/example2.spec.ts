import {test, expect, Page} from '@playwright/test';
import {HomePage} from "../pages/home-page";

const URL = 'https://playwright.dev/';
let homepage:HomePage;

test.beforeEach(async ({page}) => {
    await page.goto(URL);
    homepage = new HomePage(page);
});

async function clickGetStarted(page:Page) {
    await homepage.clickGetStarted();
}

test.describe('Playwright website', () => {

test('has title', async () => {
    await homepage.assertPageTitle();
});

test('get started link', async ({ page }) => {
    await clickGetStarted(page);
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test.only('check Java page', async ({ page }) => {
    await clickGetStarted(page);
    await page.getByRole('button', {name: 'Node.js'}).hover();
    await page.getByText('Java', {exact: true}).click();
    await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
    await expect(page.getByText('Intstalling Playwright', {exact: true})).not.toBeVisible();
    const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
    await expect(page.getByText(javaDescription)).toBeVisible();
    });
});