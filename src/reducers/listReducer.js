import { FAQ_LIST } from "./actions/types"


const initialState = {
    faq_list            : [],
}

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case FAQ_LIST:
            return {
                ...state,
                faq_list: action.value
            }

        default:
            return state
    }
}
export default listReducer