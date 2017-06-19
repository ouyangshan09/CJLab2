/**
 * Created by Administrator on 2017/6/19.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, ListView } from 'react-native';

class SimpleList extends Component {
    static displayName = 'SimpleList';

    static navigationOptions = {
        title: 'SimpleList组件'
    };

    static propTypes = {
        navigation: PropTypes.object,
        screenProps: PropTypes.object
    };

    constructor (props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this._getRows())
        };
    }

    // mock 数据
    _getRows () {
        const dataBlob = [];
        for (let i = 0; i < 100; i++) {
            const text = 'row' + i;
            dataBlob.push(text);
        }
        return dataBlob;
    }

    render () {
        const { dataSource } = this.state;
        return (
            <ListView
              dataSource={dataSource}
              renderRow={(rowData) => <Text>{rowData}</Text>} />
        );
    }
}

export default SimpleList;
