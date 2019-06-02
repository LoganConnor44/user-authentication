import { loginConstants } from '../constants';

export const loginActions = {
    open,
    close,
    defaultDialog
};

function open() {
    return dispatch => {
        dispatch(success())
    };

    function success() { return { type: loginConstants.OPEN_DIALOG } }
}

function close() {
    return dispatch => {
        dispatch(success())
    };

    function success() { return { type: loginConstants.CLOSE_DIALOG } }
}

function defaultDialog() {
    return dispatch => {
        dispatch(success())
    };

    function success() { return { type: loginConstants.DEFAULT } }
}