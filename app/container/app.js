/**
 * Created by Administrator on 2017/6/16.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import BasicScreen from '../views/example/basic';
import LayoutScreen from '../views/example/layout';
import NetworkScreen from '../views/example/network';

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
    Basic: {
        screen: BasicScreen,
    },
    Layout: {
        screen: LayoutScreen
    },
    Network: {
        screen: NetworkScreen
    }
};

// Tab导航配置
const tabNavigatorConfig = {
    initialRouteName: 'Layout',
    tabBarPosition: 'bottom'
};

const AppScreenNavigator = TabNavigator(routeConfigs, tabNavigatorConfig);

const SimpleApp = StackNavigator({
    Home: {
        screen: AppScreenNavigator
    }
}, {
    navigationOptions: {
        title: 'React Native 组件学习导航'
    }
});

export default SimpleApp;
