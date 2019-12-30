import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'; import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, {
    useTrackPlayerProgress,
    usePlaybackState,
    useTrackPlayerEvents
  } from "react-native-track-player";
const Controls = ({
    paused,
    onPressPlay,
    onPressPause,
  }) => (
            <View>
                {!paused ?
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