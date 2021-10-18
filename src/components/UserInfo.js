import Popup from "./Popup.js";

export default class UserInfo {
    constructor(data) {
    this._userName = document.querySelector(data.selecrorName);
    this._userOccupation = document.querySelector(data.selectorDescription);
    }

    getUserInfo() {
        const userInfoObject = {
            name: this._userName.textContent,
            occupation: this._userOccupation.textContent
        };
        return userInfoObject
    }

    setUserInfo(data) {
        this._userName.textContent = data.name
        this._userOccupation.textContent = data.occupation
    }
}