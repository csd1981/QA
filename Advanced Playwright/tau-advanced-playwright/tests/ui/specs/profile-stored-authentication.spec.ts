import { test } from '@playwright/test';
import ProfilePage from '../pages/profile-page';
import pages from '../../utils/pages';

let profilePage: ProfilePage;

test.beforeEach(async ({ page }) => {
    await page.goto(pages.profile);
    profilePage = new ProfilePage(page);
});

test.describe.only('Profile - Stored Auth', () => {
    test('Check logged in', async () => {
        await profilePage.checkLoggedIn();
    });
});
