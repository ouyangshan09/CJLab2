/**
 * Created by Administrator on 2017/6/19.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, StyleSheet, ListView, TouchableHighlight } from 'react-native';
import { THUMB_URLS } from './mock';

class BaseList extends Component {
    static displayName = 'BaseList';

    static navigationOptions = {
        title: 'BaseList组件'
    };

    static propTypes = {
        navigation: PropTypes.object,
        screenProps: PropTypes.object
    };

    constructor (props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this._getRows({}))
        };
    }

    // mock数据
    _getRows = (pressData = []) => {
        const dataBlob = [];
        for (let i = 0; i < 10; i++) {
            const text = pressData[i] ? ' (pressed)' : '';
            dataBlob.push('Row' + i + text);
        }
        return dataBlob;
    };

    // 创建行view
    _renderRow = (rowData, sectionID, rowID, highlightRow) => {
        const rowHash = Math.abs(hashCode(rowData));
        const imgSource = THUMB_URLS[rowHash % THUMB_URLS.length];
        console.log('renderRow:', imgSource);
        return (
            <TouchableHighlight onPress={() => {
                //
                this._pressRow(rowID);
                console.log('touch high light');
            }}>
                <View>
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={imgSource} />
                        <Text style={styles.text}>
                            {rowData + '-' + LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };

    _pressRow (rowID) {
        //
    };

    render () {
        const { dataSource } = this.state;
        return (
            <ListView
              dataSource={dataSource}
              renderRow={this._renderRow}
              initialListSize={1}/>
        );
    }
}



const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus' +
    'corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre ' +
    'luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, ' +
    'vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant ' +
    'invidunt reprehendunt ne qui.';

const hashCode = function(str) {
    let hash = 15;
    for (let ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
    },
});

export default BaseList;
