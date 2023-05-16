export class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._name = document.querySelector(userNameSelector).textContent;
    this._info = document.querySelector(userInfoSelector).textContent;
  }

  getUserInfo() {
    const userData = {};
    userData.name = this._name;
    userData.info = this._info;
    return userData;
  }

  setUserInfo(name, info) {
    document.querySelector(this._userNameSelector).textContent = name;
    document.querySelector(this._userInfoSelector).textContent = info
  }
}
