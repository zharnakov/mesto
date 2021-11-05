export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    changeLikeCardStatus(idCard, myLike) {
        if (myLike) {
            return fetch((`${this._url + "/v1/cohort-29/cards/likes"}/${idCard}`), {
                method: 'DELETE',
                headers: this._headers
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
                 return Promise.reject ('Произошла ошибка');
            }); 
        } else {
            return fetch((`${this._url + "/v1/cohort-29/cards/likes"}/${idCard}`), {
                method: 'PUT',
                headers: this._headers
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
                 return Promise.reject ('Произошла ошибка');
            }); 
        }
    }

    deleteCard(idCard) {
        return fetch((`${this._url + "/v1/cohort-29/cards"}/${idCard}`), {
            method: 'DELETE',
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
             return Promise.reject ('Произошла ошибка');
        });
    }

    changeUserInfo(data) {
        return fetch(this._url + "/v1/cohort-29/users/me", {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
             return Promise.reject ('Произошла ошибка');
        });
    }

    addCard(data) {
        return fetch(this._url + "/v1/cohort-29/cards", {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
             return Promise.reject ('Произошла ошибка');
        });
    }

    getAllCards() {
        return fetch(this._url + "/v1/cohort-29/cards", {
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
             return Promise.reject ('Произошла ошибка');
        });
    }

    getUserInfo() {
        return fetch(this._url + "/v1/cohort-29/users/me", {
            method: 'GET',
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
             return Promise.reject ('Произошла ошибка');
        });
    }
};
