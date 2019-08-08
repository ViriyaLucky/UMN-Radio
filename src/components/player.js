import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'; import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Controls = ({
    muted,
    shuffleOn,
    repeatOn,
    onPressPlay,
    onPressPause,
  }) => (
            <View>
                {!muted ?
                    <TouchableOpacity onPress={onPressPause}>
                        <View style={styles.playButton}>
                            <Icon name="pause-circle-outline" size={100} color='#2a71b8' />
                        </View>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={onPressPlay}>
                        <View style={styles.playButton}>
                            <Icon name="play-circle-outline" size={100} color='#2a71b8' />
                        </View>
                    </TouchableOpacity>
                }
            </View>
  );

export default Controls;

const styles = StyleSheet.create({
    playButton: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})