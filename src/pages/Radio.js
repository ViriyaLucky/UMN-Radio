import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  StatusBar,
  AppState, Platform
} from 'react-native';
import { Provider as PaperProvider, Card, Title, Subheading, Paragraph } from 'react-native-paper';
import Player from '../components/player';
import AlbumArt from '../components/AlbumArt';
import PushController from '../components/pushController';
import TrackPlayer from "react-native-track-player";
const url = 'https://radio.umn.ac.id';
const cheerio = require('react-native-cheerio')

export default class radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      title: "Loading ...",
      artist: "Loading Penyiar...",
      description: '',
      artwork: "../assets/images/umnradio.png",
    }
  }

  getMoviesFromApiAsync() {
    setInterval(() => {
      var apiRequest1 = fetch('https://radio.umn.ac.id/scrape').then(function (response) {
        return response.json()
      })
        .catch((error) => {
          console.log(error.message);
        });
      var apiRequest2 = fetch('https://stream.radio.umn.ac.id/node/currentsong?sid=1').then(function (response) {
        return response.text();
      })
        .then(function (data) {
          return data; //this will just be text
        })
        .catch((error) => {
          console.log(error.message);
        });
      var combinedData = { "apiRequest1": {}, "apiRequest2": {} };
      /* TODO: response dari radio.umn.ac.id/scrape masih kurang, belum ada nama siaran -> variable name apiResponse
      *TODO: output now playing
      *
      *
      *
      * */
      Promise.all([apiRequest1, apiRequest2]).then((values) => {
        let apiResponse = values[0];
        let nowPlaying = values[1];
        //console.log("apirequest1 : " + JSON.stringify(values[0]));
        //console.log("apiResponse: " + apiResponse.width);
        // console.log("Now Playing: " + nowPlaying)
        //cover Art program
        if (this.state.description != nowPlaying) {
          this.setState({
            description: nowPlaying
          });
          TrackPlayer.updateMetadataForTrack('radio', { description: this.state.description });
        }
        if (this.state.albumArtUrl != apiResponse.src) {
          this.setState({
            albumArtUrl: values[0].src
          })
          TrackPlayer.updateMetadataForTrack('radio', { artwork: this.state.albumArtUrl });
          TrackPlayer.updateOptions({ icon: this.state.albumArtUrl });

        }
        //Nama Program
        if (this.state.title != apiResponse.alt) {
          this.setState({
            title: apiResponse.alt
          })
          TrackPlayer.updateMetadataForTrack('radio', { title: this.state.title });
        }
        if (this.state.description != combinedData.apiRequest3[0].text) {
          this.setState({
            description: combinedData.apiRequest3[0].text.replace(/\n/g, '')
          })
        }
        if (TrackPlayer.getState() == TrackPlayer.STATE_PAUSED) {
          TrackPlayer.updateMetadataForTrack('radio', { url: this.state.audioUrl })
        }
      })
        .catch((error) => {
          console.log(error.message);
        });

    }, 1000);

  }

  componentWillMount() {
    this.setState({
      volume: 1,
      audioUrl: "http://radio.umn.ac.id/node/umnradio",
    })
    this.getMoviesFromApiAsync();
  }
  componentDidMount() {
    TrackPlayer.setupPlayer().then(async () => {
      // Adds a track to the queue
      await TrackPlayer.add({
        id: 'radio', // Must be a string, required
        url: this.state.audioUrl, // Load media from the network
        title: this.state.title,
        description: this.state.description,
        artwork: this.state.albumArtUrl, // Load artwork from the network
      });
      // Starts playing it
      TrackPlayer.play();

    })
      .catch((error) => {
        console.error(error);
      });
  }
  componentWillUnmount() {
    TrackPlayer.destroy();
  }
  render() {
    return (
      <PaperProvider>
        <StatusBar backgroundColor="#3e64ff" barStyle="light-content" />
        <View style={styles.header}>
          <Image source={require('../assets/images/umnradio.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode="contain" />
        </View>
        <View style={styles.main}>
          <View style={styles.albumArt}>
            <AlbumArt url={this.state.albumArtUrl} />
          </View>
          <View style={styles.control}>
            <Card style={styles.controlDesc}>
              <Card.Content>
                <Title style={{ fontSize: 20, }}>ON AIR </Title>
                <Subheading style={{ fontSize: 25, paddingTop: 5, paddingBottom: 10, }}>{this.state.title}</Subheading>
                <Paragraph style={{ fontSize: 15 }}>Now Playing: {this.state.description}</Paragraph>
              </Card.Content>
            </Card>
            <Card style={styles.controlPlay}>
              <Player
                onPressPlay={() => {
                  this.setState({ paused: false });
                  TrackPlayer.play();
                }}
                onPressPause={() => {
                  this.setState({ paused: true });
                  TrackPlayer.pause();
                }}
                paused={this.state.paused}
              />
            </Card>
          </View>
        </View>
        <PushController />
      </PaperProvider>
    )
  }
}
const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    flex: 1,
  },
  main: {
    flex: 7,
    paddingTop: 10
  },
  albumArt: {
    flex: 5
  },
  control: {
    borderTopWidth: 0.1,
    paddingTop: 10,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlDesc: {
    flex: 2,
    justifyContent: 'center',
  },
  controlPlay: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
  },
});