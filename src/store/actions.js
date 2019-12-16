/* eslint-disable */
import Vue from 'vue'

export default () => ({
    async login({ state, commit }, { username, password }) {
        Vue.http.options.emulateJSON = true;
        var response = {
            error: false,
            token: null,
            message: ""
        };
        await Vue.http.post(state.api + "auth", {
            username: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((result) => {
            if (result.body.error) {
                response.error = true;
                response.token = null;
                response.message = "Invalid username or password";
            } else if (result.body.token != null) {
                response.error = false;
                response.token = result.body.token;
                response.message = "Login successful";
            }
        }).catch((result) => {
            response.error = true;
            response.token = null;
            if (result.body.message) {
                response.message = result.body.message;
            } else {
                response.message = "Unexpected error occured";
            }
        });
        commit("setToken", response.token);
        commit("setLoggedIn", response.token != null);
        return response;
    },
    async createAccount({ state }) {
        Vue.http.options.emulateJSON = true;
        var response = {
            error: false,
            customerId: null,
            message: ""
        };
        await Vue.http.get(state.api + "customer/create", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-auth-token': localStorage.getItem("token")
            }
        }).then((result) => {
            response.error = false;
            response.customerId = result.body.customerId;
            response.message = "Account created"
        }).catch((result) => {
            response.error = true;
            response.customerId = null;
            if (result.body.message) {
                response.message = result.body.message;
            } else {
                response.message = "Unexpected error occured";
            }
        });
        return response;
    },
    async editBooking({ state }, { customerId, payload }) {
        Vue.http.options.emulateJSON = true;
        var response = {
            error: false,
            body: null
        };
        await Vue.http.post(state.api + "customer/" + customerId + "/booking",
            payload, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-auth-token': localStorage.getItem("token")
                }
            }).then((result) => {
            response.error = false;
            response.body = result.body;
        }).catch((result) => {
            response.error = true;
            response.body = result.body;
        });
        return response;
    },
    async editFinalCalculation({ state }, { customerId, payload }) {
        Vue.http.options.emulateJSON = true;
        var response = {
            error: false,
            body: null
        };
        await Vue.http.post(state.api + "customer/" + customerId + "/final-calculation",
            payload, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-auth-token': localStorage.getItem("token")
                }
            }).then((result) => {
            response.error = false;
            response.body = result.body;
        }).catch((result) => {
            response.error = true;
            response.body = result.body;
        });
        return response;
    },
    async editDelivery({ state }, { customerId, payload }) {
        Vue.http.options.emulateJSON = true;
        var response = {
            error: false,
            body: null
        };
        await Vue.http.post(state.api + "customer/" + customerId + "/delivery",
            payload, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-auth-token': localStorage.getItem("token")
                }
            }).then((result) => {
            response.error = false;
            response.body = result.body;
        }).catch((result) => {
            response.error = true;
            response.body = result.body;
        });
        return response;
    },
    async editInvoice({ state }, { customerId, payload }) {
        Vue.http.options.emulateJSON = true;
        var response = {
            error: false,
            body: null
        };
        await Vue.http.post(state.api + "customer/" + customerId + "/invoice",
            payload, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-auth-token': localStorage.getItem("token")
                }
            }).then((result) => {
            response.error = false;
            response.body = result.body;
        }).catch((result) => {
            response.error = true;
            response.body = result.body;
        });
        return response;
    },
    async editPhoto({ state }, { customerId, file }) {
        Vue.http.options.emulateJSON = true;
        const formData = new FormData();
        formData.append("file", file);
        var response = {
            error: false,
            body: null
        };
        await Vue.http.post(state.api + "customer/" + customerId + "/image",
            formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-auth-token': localStorage.getItem("token")
                }
            }).then((result) => {
            response.error = false;
            response.body = result.body;
        }).catch((result) => {
            response.error = true;
            response.body = result.body;
        });
        return response;
    },
    async editBooking({ state }, { customerId, payload }) {
        Vue.http.options.emulateJSON = true;
        var response = {
            error: false,
            body: null
        };
        await Vue.http.post(state.api + "customer/" + customerId + "/booking",
            payload, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-auth-token': localStorage.getItem("token")
                }
            }).then((result) => {
            response.error = false;
            response.body = result.body;
        }).catch((result) => {
            response.error = true;
            response.body = result.body;
        });
        return response;
    },
    async editTractorDetails({ state }, { customerId, payload }) {
        Vue.http.options.emulateJSON = true;
        var response = {
            error: false,
            body: null
        };
        await Vue.http.post(state.api + "customer/" + customerId + "/tractor-details",
            payload, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-auth-token': localStorage.getItem("token")
                }
            }).then((result) => {
            response.error = false;
            response.body = result.body;
        }).catch((result) => {
            response.error = true;
            response.body = result.body;
        });
        return response;
    },
    async getAllCustomers({ state }, { showBy, pageNo, pageSize, sortBy, sortOrder, name, nickName, sonOf, village, challanNo, mobile, whatsapp }) {
        Vue.http.options.emulateJSON = true;
        var response = {
            error: false,
            body: null
        };
        if (showBy == null) {
            showBy = "all";
        }
        if (pageNo == null) {
            pageNo = 0;
        }
        if (pageSize == null) {
            pageSize = 10;
        }
        if (sortBy == null) {
            sortBy = "_id";
        }
        if (sortOrder == null) {
            sortOrder = "asc";
        }
        if (name == null) {
            name = "";
        }
        if (nickName == null) {
            nickName = "";
        }
        if (sonOf == null) {
            sonOf = "";
        }
        if (village == null) {
            village = "";
        }
        if (challanNo == null) {
            challanNo = "";
        }
        if (mobile == null) {
            mobile = "";
        }
        if (whatsapp == null) {
            whatsapp = "";
        }
        await Vue.http.get(state.api + "customer/all?" +
            "showBy=" + showBy +
            "&pageNo=" + pageNo +
            "&pageSize=" + pageSize +
            "&sortBy=" + sortBy +
            "&sortOrder=" + sortOrder +
            "&name=" + name +
            "&nickName=" + nickName +
            "&sonOf=" + sonOf +
            "&village=" + village +
            "&challanNo=" + challanNo +
            "&mobile=" + mobile +
            "&whatsapp=" + whatsapp, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-auth-token': localStorage.getItem("token")
                }
            }).then((result) => {
            response.error = false;
            response.body = result.body;
        }).catch((result) => {
            response.error = true;
            response.body = result.body;
        });
        return response;
    },
    async getCustomer({ state }, { customerId }) {
        Vue.http.options.emulateJSON = true;
        var response = {
            error: false,
            body: null,
            message: ""
        };
        await Vue.http.get(state.api + "customer/" + customerId, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-auth-token': localStorage.getItem("token")
            }
        }).then((result) => {
            response.error = false;
            response.body = result.body;
            response.message = "Customer fetched successfully";
        }).catch((result) => {
            response.error = true;
            response.customerId = null;
            if (result.body.message) {
                response.message = result.body.message;
            } else {
                response.message = "Unexpected error occured";
            }
        });
        return response;
    },
})