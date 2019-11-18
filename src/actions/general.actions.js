import {UPDATENAME, VALIDATENAME} from './actions.type';

export function updateName(name) {

    return {
        type: UPDATENAME,
        data: {
            name
        }
    };
}

export function validateName() {
    return {
        type: VALIDATENAME,
    };
}
