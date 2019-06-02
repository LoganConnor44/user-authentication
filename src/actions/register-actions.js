import { registerConstants } from '../constants';

export const registerActions = {
    open,
    close,
    defaultDialog
};

function open() {
    return dispatch => {
        dispatch(success())
    };

    function success() { return { type: registerConstants.OPEN_DIALOG } }
}

function close() {
    return dispatch => {
        dispatch(success())
    };

    function success() { return { type: registerConstants.CLOSE_DIALOG } }
}

function defaultDialog() {
    return dispatch => {
        dispatch(success())
    };

    function success() { return { type: registerConstants.DEFAULT } }
}