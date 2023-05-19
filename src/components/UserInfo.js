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

  setUserInfo(name, info) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = info
  }
}
