import { LOGIN, LOGOUT } from "../actionType";

const initialState = {
    user: null,
    signedIn: false
}


export const AuthReducer = (state = initialState, action) => {
    let item = action.data
    
    switch (action.type) {
        case LOGIN:

            return Object.assign({}, state, {
                user: item,
                signedIn: true
            })


        case LOGOUT:

            return Object.assign({}, state, {
                user: null,
                signedIn: false
            })

        default:
            return state
    }


}