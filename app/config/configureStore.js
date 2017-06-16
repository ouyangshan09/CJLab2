/**
 * Created by Administrator on 2017/6/15.
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({
    // config
});

// const createStoreWithMiddleware = applyMiddleware(thunk, createLogger({collapsed: true}))(createStore);
//
// const createConfigStore = (preloadedState = {}) => {
//     const store = createStoreWithMiddleware(rootReducer, preloadedState);
// };

const createConfigStore = (preloadedState = {}) => {
    const store = createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(
            // applyMiddleware(thunk, createLogger({
            //     collapsed: true
            // }))
        )
    );
    return store;
};

export default createConfigStore;
