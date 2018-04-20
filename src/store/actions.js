import * as types from './mutation-types';

export default {
    setPageId({ commit }, id){
        commit(types.SET_PAGE_ID, id);
    }
};
