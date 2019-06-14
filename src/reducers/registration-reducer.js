import { 
    userConstants,
    registerConstants
} from '../constants';

/**
 * The registration Redux reducer that updates that status of a user's registration request.
 * @param {object} state 
 * @param {object} action 
 */
export function registration(state = {}, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return { registering: true };
        case userConstants.REGISTER_SUCCESS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state;
    }
}

/**
 * The register dialog Redux reducer that updates state and returns a new state to be painted on the DOM.
 * @param {object} state 
 * @param {object} action 
 */
export function registerDialog(state = {}, action) {
    switch (action.type) {
        case registerConstants.OPEN_DIALOG:
            return true;
        case registerConstants.CLOSE_DIALOG:
            return false;
        case registerConstants.DEFAULT:
            return false;
        default:
            return false;
    }
}