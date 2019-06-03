import { userConstants } from '../constants';

/**
 * The registration Redux reducer that updates state and returns a new state to be painted on the DOM.
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