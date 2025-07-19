import Page from './Page';

class MainPage extends Page {
  private get submitButton() {
    return $('button[type=submit]');
  }

  private get userNameField() {
    return $('[placeholder=Login]');
  }

  private get password() {
    return $('[placeholder=Password]');
  }

  private get notification() {
    return $('[class^=notificationItem__message]');
  }

  async login(username: string, password: string): Promise<void> {
    await this.userNameField.setValue(username);
    await this.password.setValue(password);
    await this.submitButton.click();
  }

  async closeLoginNotification() {
    await this.notification.click();
  }
}

export default new MainPage();
