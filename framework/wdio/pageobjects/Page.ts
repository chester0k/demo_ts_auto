/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  public async open(path: string): Promise<void> {
    await browser.url(path);
  }
}
