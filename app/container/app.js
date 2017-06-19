/**
 * Created by Administrator on 2017/6/16.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import * as RouteName from '../views/example/constant/routeName';
import BasicScreen from '../views/example/basic';
import LayoutScreen from '../views/example/layout';
import NetworkScreen from '../views/example/network';
import { SimpleList, BaseList } from '../views/example/basic/ListView';

class App extends Component {
    static displayName = 'CJ_APP';

    static navigationOptions = {
        title: 'Welcome'
    };

    static propTypes = {
        navigation: PropTypes.object
    };

    render () {
        const { navigation } = this.props;
        return (
            <View>
                <Text>Hello, Chat App!</Text>
                <Button
                  title='Chat with Lucy'
                  onPress={() => navigation.navigate('Chat', { user: 'Ouyang'})}
                />
            </View>
        );
    }
}

// 路由配置
const routeConfigs = {
    [RouteName.BASIC]: {
        screen: BasicScreen,
    },
    [RouteName.LAYOUT]: {
        screen: LayoutScreen
    },
    [RouteName.NETWORK]: {
        screen: NetworkScreen
    }
};

// Tab导航配置
const tabNavigatorConfig = {
    initialRouteName: RouteName.BASIC,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        labelStyle: {
            fontSize: 18,
            color: '#fff'
        },
        // tabStyle: {
        //     width: 100
        // },
        scrollEnabled: false
    }
};

const AppScreenNavigator = TabNavigator(routeConfigs, tabNavigatorConfig);

const SimpleApp = StackNavigator({
    [RouteName.HOME]: {
        screen: AppScreenNavigator
    },
    [RouteName.SIMPLELIST]: {
        path: 'basic/simpleList',
        screen: SimpleList
    },
    [RouteName.BASELIST]: {
        path: 'basic/baseList',
        screen: BaseList
    }

}, {
    navigationOptions: {
        title: 'React Native 组件学习导航'
    }
});

export default SimpleApp;
