/**
 * Created by Administrator on 2017/6/16.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    View,
    ScrollView,
    FlatList,
    SectionList,
    Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as Http from '../utils/http';

// 关于Image控件认识
class Bananas extends Component {
    static displayName = 'Bananas';

    render () {
        const pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        return (
            <Image source={pic} style={{width: 193, height: 110}} />
        );
    }
}

// 关于props的练习，顺便应用PropTypes
class Greeting extends Component {
    static displayName = 'Greeting';

    static propTypes = {
        name: PropTypes.string
    };

    static defaultProps = {
        name: 'OUYANG'
    };

    render () {
        return (
            <Text>Hello {this.props.name}</Text>
        );
    }
}

// 关于props的练习，顺便应用PropTypes
class LotsOfGreetings extends Component {
    static displayName = 'LotsOfGreetings';

    render () {
        return (
            <View style={{alignItems: 'center'}}>
                <Greeting name='WXJ' />
                <Greeting name='ZCJ' />
                <Greeting name='XB' />
                <Greeting name='HQH' />
                <Greeting name='CYF' />
            </View>
        );
    }
}

class CJHello extends Component {
    static displayName = 'CJHello';

    render () {
        return (
            <Text>
                CJ Hello to world3
                <Bananas />
                Test
                Hello
            </Text>
        );
    }
}

// 关于state的练习
class Blink extends Component {
    static displayName = 'Blink';

    static propTypes = {
        text: PropTypes.string,
        style: PropTypes.object
    };

    static defaultProps = {
        text: '',
        style: {}
    };

    constructor (props) {
        super(props);
        this.state = {
            showText: true
        };
        setInterval(() => {
            this.setState(previousState => {
                return { showText: !previousState.showText}
            });
        }, 1000);
    }

    render () {
        const { style } = this.props;
        const display = this.state.showText ? this.props.text : '';
        return (
            <Text style={style}>{display}</Text>
        )
    }
}

// 关于state的练习
class BlinkApp extends Component {
    static displayName = 'BlinkApp';

    render () {
        return (
            <View>
                <Blink text='I love to PLJ' />
                <Blink text='Yes PLJ is so great' />
                <Blink text='Why did they ever take this out of HTML' />
                <Blink text='Look at me look at me' />
            </View>
        );
    }
}

// 关于样式的练习
class LotsOfStyles extends Component {
    static displayName = 'LotsOfStyles';

    render () {
        return (
            <View>
                <Blink style={styles.red} text='just red' />
                <Blink style={styles.bigblue} text='just bigblue' />
                <Text style={[styles.bigblue, styles.red]}>bigblue, then red</Text>
                <Text style={[styles.red, styles.bigblue]}>red, then bigblue</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bigblue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30
    },
    red: {
        color: 'red'
    }
});

// 关于样式宽高和flex(弹性)的练习
class FixedDimensionBasics extends Component {
    static displayName = 'FixedDimensionBasics';

    render () {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, backgroundColor: 'powderblue'}} />
                <View style={{flex: 2, backgroundColor: 'skyblue'}} />
                <View style={{flex: 3, backgroundColor: 'steelblue'}} />
            </View>
        );
    }
// <View style={{flex: 1}}>
// <View style={{flex: 1, backgroundColor: 'powderblue'}} />
// <View style={{flex: 2, backgroundColor: 'skyblue'}} />
// <View style={{flex: 3, backgroundColor: 'steelblue'}} />
// </View>
}

// 关于样式flexBox布局
// where flexDirection: row
//  flex-start 居左
//  center 居中
//  flex-end 居右
//  space-around 平均分布？
//  space-between 平均分布
// where flexDirection: column
//  flex-start 居上
//  center 居中
//  flex-end 居下
//  space-around 平均分布？
//  space-between 平均分布
class FlexDirectionBasics extends Component {
    static displayName = 'FlexDirectionBasics';

    render () {
        console.warn('ouyangh');
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
                <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
            </View>
        );
    }
}

// 关于处理用户输入数据
class PizzaTranslator extends Component {
    static displayName = 'PizzaTranslator';

    constructor (props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    render () {
        console.log('PizzaTranslator->render');
        return (
            <View style={{padding: 10}}>
                <TextInput
                    style={{height: 40}}
                    placeholder='Type here to translate'
                    onChangeText={(text) => this.setState({text})}
                />
                <Text style={{padding: 10, fontSize: 42}}>
                    {this.state.text.split(' ').map(world => world && '🍕').join(' ')}
                </Text>
            </View>
        );
    }
}

// 关于Android组件中的ScrollView 应用
class IScrolledDownAndWhatHapendNextShockedMe extends Component {
    static displayName = 'IScrolledDownAndWhatHapendNextShockedMe';

    render () {
        return (
            <ScrollView>
                <Text style={{fontSize: 46}}>Scroll Me plz</Text>
                <Image source={require('./app/public/img/img1.jpg')} />
                <Image source={require('./app/public/img/img2.jpg')} />
                <Image source={require('./app/public/img/img3.jpg')} />
            </ScrollView>
        );
    }
}

// 关于Android组件中ListView 应用
class FlatListBasics extends Component {
    static displayName = 'FlatListBasics';

    renderItem = (data) => {
        const { item } = data;
        console.log('item:', item);
        return (
            <Text style={styles.item}>{item.key}</Text>
        );
    };

    render () {
        const list = [
            {key: 'Devin'},
            {key: 'Oy'},
            {key: 'ZJW'},
            {key: 'ZJX'},
            {key: 'XSM'},
            {key: 'ZJF'},
            {key: 'CZG'},
            {key: 'LL'},
        ];
        return (
            <View style={styles.container}>
                <FlatList
                    data={list}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

const listStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    }
});

// 关于Android组件中ListView 应用2
class SectionListBasics extends Component {
    static displayName = 'SectionListBasics';

    renderItem = (data) => {
        const { item } = data;
        console.log('section item:', item);
        return (
            <Text style={sectionListStyles.item}>{item}</Text>
        );
    };

    renderHeader = (data) => {
        const { section } = data;
        console.log('section header:', section);
        return (
            <Text style={sectionListStyles.sectionHeader}>{section.title}</Text>
        );
    };

    render () {
        const list = [
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
        ];
        // fetch('http://10.0.0.122:9092/analysispage/classes').then(res => {
        //     console.log('json:', res.json());
        // });
        const url = 'http://10.0.0.122:9092/analysispage/classes';
        fetch(url, { method: 'GET', })
            .then(res => res.json())
            .then(json => {
                console.log('json:', json);
            });
        return (
            <View style={sectionListStyles.container}>
                <SectionList
                    sections={list}
                    renderItem={this.renderItem}
                    renderSectionHeader={this.renderHeader}
                />
            </View>
        );
    }
}

const sectionListStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247, 247, 247, 0.5)'
    },
    item: {
        padding: 10,
        paddingLeft: 20,
        fontSize: 18,
        height: 44
    }
});

// 关于Android 网络请求的应用

class MainScreen extends Component {
    static displayName = 'MainScreen';

    static navigationOptions = {
        title: 'Welcome'
    };

    handleTest = () => {
        // const request = Http.RequestBuilder.create()
        //     .setURL('http://10.0.0.122:9092/analysispage/classes')
        //     .setBody({attention: false})
        //     .setCustomEvent(function (res) {
        //         console.log('res:', res);
        //         return res;
        //     })
        //     .build();
        // Http.get(request);
        // console.log('app_request:', request);
    };

    render () {
        const { navigate } = this.props.navigation;
        return (
            <Button title='Goto jan' onPress={() => navigate('Profile', {name: 'ouyang'})}/>
        );
    }
}

const App = StackNavigator({
    Home: { screen: MainScreen }
});


// export default class CJLab2 extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.android.js
//         </Text>
//         <Text style={styles.instructions}>
//           Double tap R on your keyboard to reload,{'\n'}
//           Shake or press menu button for dev menu
//         </Text>
//         <Text>Create by CJ Ouyang</Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
// AppRegistry.registerComponent('CJLab2', () => CJLab2);