/**
 * Created by Administrator on 2017/6/16.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

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

class RecentChatScreen extends Component {

    static propTypes = {
        navigation: PropTypes.object
    };

    render (){
        const { navigation } = this.props;
        return (
        <View>
            <Text>List of recent chats</Text>
            <Button
              title='Chat with Lucy'
              onPress={() => navigation.navigate('Chat', { user: 'Ouyang'})}
            />
        </View>
        );
    }
}

class AllContactsScreen extends Component {

    static propTypes = {
        navigation: PropTypes.object
    };

    render () {
        const { navigation } = this.props;
        return (
            <View>
                <Text>List of all contacts</Text>
                <Button
                  title='Chat with Lucy'
                  onPress={() => navigation.navigate('Chat', { user: 'Ouyang'})}
                />
            </View>
        );
    }
}

const MainScreenNavigator = TabNavigator({
    Recent: { screen: RecentChatScreen },
    All: { screen: AllContactsScreen },
    Person: { screen: RecentChatScreen }
});
MainScreenNavigator.navigationOptions = {
    title: 'My Chats'
};

class ChartScreen extends Component {
    static displayName = 'ChartScreen';

    // static navigationOptions = ({ navigation }) => ({
    //     title: `Chat with ${navigation.state.params.user}`,
    //     headerRight: (
    //         <Button title='info' onPress={() => console.log('header right click')}/>
    //     )
    // });

    static navigationOptions = ({ navigation}) => {
        console.log('navigation options:', navigation);
        const { state, setParams } = navigation;
        const isInfo = state.params.mode === 'info';
        const { user } = state.params;
        return {
            title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
            headerRight: (
                <Button
                  title={isInfo ? 'Done' : `${user}'s info`}
                  onPress={() => setParams({ mode: isInfo ? 'none' : 'info'})}
                />
            )
        }
    };

    static propTypes = {
        navigation: PropTypes.object
    };

    render () {
        const { params } = this.props.navigation.state;
        return (
            <View>
                <Text>Chat with {params.user}</Text>
            </View>
        );
    }
}

const SimpleApp = StackNavigator({
    Home: { screen: MainScreenNavigator},
    Chat: { screen: ChartScreen}
});

export default SimpleApp;
