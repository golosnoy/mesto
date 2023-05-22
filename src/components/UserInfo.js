export class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    this._nameElement = document.querySelector(userNameSelector);
    this._jobElement = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.author_name;
    this._jobElement.textContent = userData.author_about;
  }
}
