/**
 * Created by Administrator on 2017/6/16.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet } from 'react-native';

const basicStyles = StyleSheet.create({});

const BasicNavigationOptions = {
    title: '基础'
};

/**
 * 基础组件练习集合界面导航
 * */
class Basic extends Component {
    static displayName = 'Basic';

    static navigationOptions = BasicNavigationOptions;

    render () {
        return (
            <View>
                <Text>基础组件练习</Text>
            </View>
        );
    }
}

export default Basic;
