import { chromium, FullConfig } from '@playwright/test';
import LoginPage from '../ui/pages/login-page';
import uiPages from '../utils/uiPages';

async function globalSetup(config: FullConfig) {
  const user = process.env.APP_USERNAME!;
  const password = process.env.PASSWORD!;
  const { baseURL, storageState } = config.projects[0].use;
  
  // Launch the browser in headed mode to see what's happening
  const browser = await chromium.launch({ headless: false, timeout: 30000 });
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);

  await page.goto(baseURL+uiPages.login);
  
  // Add console logging to see what's happening
  page.on('console', msg => console.log(`Page console: ${msg.text()}`));
  
  await loginPage.doLogin(user, password);
  
  // Wait a bit to see if login is successful before checking
  await page.waitForTimeout(3000);
  
  // Store the auth state even if navigation fails
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;

// https://playwright.dev/docs/test-global-setup-teardown#capturing-trace-of-failures-during-global-setup
// https://playwright.dev/docs/trace-viewer
