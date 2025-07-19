import type { RectReturn } from '@wdio/protocols';
export type Size = Pick<RectReturn, 'width' | 'height'>;

class WidgetsPage {
  private get footer() {
    return $('footer[class^=footer]');
  }

  private get spinnerLoaders() {
    return $$('[class*=spinningPreloader]');
  }

  private resizeIconOnWidget(widgetName: string) {
    return $(`//div[contains(@class, 'widget-container')][.//div[text()='${widgetName}']]/following-sibling::span`);
  }

  private widget(widgetName: string) {
    return $(`//div[contains(text(),'${widgetName}')]/ancestor::div[contains(@class,'widget-container')]`);
  }

  async scrollToButtom() {
    await this.footer.scrollIntoView();
  }

  async footerIsDisplayed() {
    return await this.footer.isDisplayed();
  }

  async waitForPreloaderDisappear() {
    await browser.waitUntil(async () => (await this.spinnerLoaders.length) === 0, { timeout: 15000 });
  }

  async resizeWidget(widgetName: string, x: number, y: number) {
    await this.resizeIconOnWidget(widgetName).dragAndDrop({ x: x, y: y });
  }

  async getWidgetSize(widgetName: string): Promise<Size> {
    return (await this.widget(widgetName)).getSize();
  }

  async scrollToWidget(widgetName: string) {
    await this.widget(widgetName).scrollIntoView({ block: 'center' });
  }
}

export default new WidgetsPage();
