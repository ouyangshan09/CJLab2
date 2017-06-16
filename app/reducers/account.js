/**
 * Created by Administrator on 2017/6/16.
 */
import lodash from 'lodash';

const initialState = {

};

const account = (state = initialState, action) => {
    return lodash.merge({}, state);
};

export default account;