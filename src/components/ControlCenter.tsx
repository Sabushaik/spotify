import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ControlCenter = () => {
    // Retrieve the playback state
    const playbackState = usePlaybackState();

    // Next button function
    const skipToNext = async () => {
        try {
            await TrackPlayer.skipToNext();
        } catch (error) {
            console.error('Error skipping to next track:', error);
        }
    };

    // Previous button function
    const skipToPrevious = async () => {
        try {
            await TrackPlayer.skipToPrevious();
        } catch (error) {
            console.error('Error skipping to previous track:', error);
        }
    };

    const togglePlayback = async () => {
        const currentTrack = await TrackPlayer.getActiveTrackIndex();

        // Ensure playbackState is a number before comparing it to State
        if (currentTrack !== null && typeof playbackState === 'number') {
            if (playbackState === State.Paused || playbackState === State.Ready) {
                await TrackPlayer.play();
            } else if (playbackState === State.Playing) {
                await TrackPlayer.pause();
            }
        }
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={skipToPrevious}>
                <Icon style={styles.icon} name="skip-previous" size={40} />
            </Pressable>
            <Pressable onPress={togglePlayback}>
                <Icon
                    style={styles.icon}
                    name={playbackState === State.Playing ? 'pause' : 'play-arrow'}
                    size={75}
                />
            </Pressable>
            <Pressable onPress={skipToNext}>
                <Icon style={styles.icon} name="skip-next" size={40} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 56,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        color: '#FFFFFF',
    },
    playButton: {
        marginHorizontal: 24,
    },
});

export default ControlCenter;
