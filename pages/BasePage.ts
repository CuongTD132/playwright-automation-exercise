import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected page: Page;
    private adsBlocked = false;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(path: string = '/') {
        if (!this.adsBlocked) {
            const blockList = [
                '**/*google-analytics.com/**',
                '**/*googleadservices.com/**',
                '**/*doubleclick.net/**',
                '**/*facebook.com/**',
            ];
            await Promise.all(
                blockList.map(url => this.page.route(url, route => route.abort()))
            );
            this.adsBlocked = true;
        }
        await this.page.goto(path);
        await this.waitForPageLoad();
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async scrollToElement(locator: Locator) {
        await locator.scrollIntoViewIfNeeded();
    }

    /**
     * Visually highlight an element with a colored border + background.
     * Useful for debugging and demo recordings.
     * @param locator - Element to highlight
     * @param color   - Border/glow color (default: '#f97316' orange)
     * @param durationMs - How long to keep the highlight (default: 600ms)
     */
    async highlight(locator: Locator, color: string = '#f97316', durationMs: number = 600) {
        const el = await locator.elementHandle();
        if (!el) return;
        if (process.env.CI) return; //remove Highlight to speed up tests in CI
        await this.page.evaluate(
            ({ el, color }) => {
                const htmlEl = el as HTMLElement;
                const prev = htmlEl.style.cssText;
                htmlEl.style.outline = `3px solid ${color}`;
                htmlEl.style.backgroundColor = `${color}22`; // 13% opacity
                htmlEl.style.transition = 'all 0.15s ease';
                // Store original so we can restore it
                htmlEl.dataset['prevStyle'] = prev;
            },
            { el, color }
        );

        await this.page.waitForTimeout(durationMs);

        await this.page.evaluate((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.cssText = htmlEl.dataset['prevStyle'] ?? '';
            delete htmlEl.dataset['prevStyle'];
        }, el);
    }

    /**
     * Highlight then click — wraps any action with a visible flash.
     */
    async highlightAndClick(locator: Locator, color: string = '#f97316') {
        await this.scrollToElement(locator);
        await this.highlight(locator, color, 400);
        await locator.click();
    }

    /**
     * Highlight then fill — shows which field is being typed into.
     */
    async highlightAndFill(locator: Locator, value: string, color: string = '#6366f1') {
        await this.highlight(locator, color, 300);
        await locator.fill(value);
    }
}
