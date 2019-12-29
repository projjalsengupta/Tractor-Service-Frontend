/* eslint-disable */
export default {
    setToken({}, token) {
        if (token == null) {
            localStorage.removeItem("token");
        } else {
            localStorage.setItem("token", token);
        }
    },
    setLoggedIn(state, loggedIn) {
        state.loggedIn = loggedIn;
        if (!loggedIn) {
            localStorage.removeItem("token");
        }
    },
    setSnackbarText(state, { snackbarText }) {
        state.snackbarText = snackbarText;
    },
    setSnackbarVisibility(state, { visible }) {
        state.snackbar = visible;
        if (!visible) {
            state.snackbarText = "";
        }
    }
}