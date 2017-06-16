/**
 * Created by Administrator on 2017/6/16.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet } from 'react-native';

const LayoutNavigationOptions = {
    title: '布局'
};

class Layout extends Component {
    static displayName = 'Layout';

    static navigationOptions = LayoutNavigationOptions;

    render () {
        return (
            <View>
                <Text>布局组件练习</Text>
            </View>
        );
    }
}

export default Layout;
