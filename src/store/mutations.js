import * as types from './mutation-types';

export default {
    [types.SET_PAGE_ID] (state, id){
        state.pageId = id;
    }
};
