import {UPDATENAME, VALIDATENAME} from '../actions/actions.type';

const initialState = {
    name : null,
    nameValidate: false
};

const generalReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPDATENAME : {

            return {
                ...state,
                name: action.data.name
            };
        }

        case VALIDATENAME : {
            return {
                ...state,
                nameValidate: true
            };
        }

        default:

            return state;
    }
};

export default generalReducer;
