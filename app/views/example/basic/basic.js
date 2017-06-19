/**
 * Created by Administrator on 2017/6/16.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as RouteName from '../constant/routeName';

const basicStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 6,
        paddingBottom: 6,
    },
    common_padding: {
        paddingLeft: 6,
        paddingRight: 6,
    },
    column_3: {
        flex: 3
    },
    column_4: {
        flex: 4
    },
    widget: {
        width: 50,
        height: 50
    }
});

const BasicNavigationOptions = {
    title: '基础'
};

/**
 * 基础组件练习集合界面导航
 * */
class Basic extends Component {
    static displayName = 'Basic';

    static navigationOptions = BasicNavigationOptions;

    static propTypes = {
        navigation: PropTypes.object,
        screenProps: PropTypes.object
    };

    _handleListView (event) {
        const { id } = event;
        const { navigate } = this.props.navigation;
        switch (id) {
            case 1:
                navigate(RouteName.SIMPLELIST);
                break;
            case 2:
                navigate(RouteName.BASELIST);
                break;
            case 3:
                navigate(RouteName.SCROLLVIEW);
                break;
            default:
                break;
        }
        console.log('ListView:', navigate);
    }

    render () {
        const column3 = [basicStyles.column_3, basicStyles.common_padding];
        return (
            <View style={basicStyles.container}>
                <View style={column3}>
                    <Button
                        title='SimpleList'
                        onPress={(e) => this._handleListView({e: e, id: 1}) }/>
                </View>
                <View style={column3}>
                    <Button
                        title='BaseList'
                        onPress={(e) => this._handleListView({e: e, id: 2}) }/>
                </View>
                <View style={column3}>
                    <Button
                        title='ImgList'
                        onPress={(e) => this._handleListView({e: e, id: 3}) }/>
                </View>
            </View>
        );
    }
}

export default Basic;
