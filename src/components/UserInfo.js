export class UserInfo {
  constructor({userNameSelector, userInfoSelector, userAvatarSelector}) {
    this._nameElement = document.querySelector(userNameSelector);
    this._jobElement = document.querySelector(userInfoSelector);
    this._avatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._jobElement.textContent = userData.about;
    this._avatar.src = userData.avatar;
    this._avatar.alt = userData.name;
  }
}
