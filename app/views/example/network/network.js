/**
 * Created by Administrator on 2017/6/16.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet } from 'react-native';

const NetworkNavigationOptions = {
    title: '网络'
};

class Network extends Component {
    static displayName = 'Network';

    static navigationOptions = NetworkNavigationOptions;

    render () {
        return (
            <View>
                <Text>网络请求fetch练习</Text>
            </View>
        );
    }
}

export default Network;
