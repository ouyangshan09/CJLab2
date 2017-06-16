/**
 * Created by Administrator on 2017/6/14.
 */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import ConfigStore from './config/configureStore';

const store = ConfigStore();

import App from './container/app';

const rootStyles = StyleSheet.create({
    root: {
        flex: 1
    }
});

class Root extends Component {
    static displayName = 'Root';

    render () {
        console.log('Launcher');
        return (
            <Provider store={store}>
                <View style={rootStyles.root}>
                    <App />
                </View>
            </Provider>
        );
    }
}

export default Root;
