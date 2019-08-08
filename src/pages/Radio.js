import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  StatusBar,
  AppState, Platform
} from 'react-native';
import { Provider as PaperProvider, Card, Title, Paragraph, Caption, Subheading  } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import Player from '../components/player';
import AlbumArt from '../components/AlbumArt';
import PushController from '../components/pushController';
import PushNotification from 'react-native-push-notification';


export default class radio extends Component {
  constructor(props){
    super(props);
    this.state = {
      muted: false,
      totalLength: 1,
      currentPosition: 0,
      selectedTrack: 0,
      title: "Loading ...",
      artist: "Loading Penyiar...",
      description:'',
      albumArtUrl: "../assets/images/umnradio.png",
      audioUrl:"http://radio.umn.ac.id:8888/umnradio",
      volume:0.7,
      seconds: 1,

    }
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }
  
   getMoviesFromApiAsync() {
   setInterval(() => {
    //cover program
    var apiRequest1 = fetch('http://motyar.info/webscrapemaster/api/?url=http://radio.umn.ac.id&xpath=//aside[@id=qtonairwidget-widget-3]/div/a[1]/img#vws').then(function(response){ 
      return response.json()
    });
    //title program
    var apiRequest2 = fetch('http://motyar.info/webscrapemaster/api/?url=http://radio.umn.ac.id&xpath=//aside[@id=qtonairwidget-widget-3]/div/h4/span#vws').then(function(response){
      return response.json()
    });
    //deskripsi program
    var apiRequest3 = fetch('http://motyar.info/webscrapemaster/api/?url=http://radio.umn.ac.id&xpath=//aside[@id=qtonairwidget-widget-3]/div/p#vws').then(function(response){
      return response.json()
    });
    var combinedData = {"apiRequest1":{},"apiRequest2":{}, "apiRequest3":{}};
    Promise.all([apiRequest1,apiRequest2,apiRequest3]).then((values) => {
      combinedData["apiRequest1"] = values[0];
      combinedData["apiRequest2"] = values[1];
      combinedData["apiRequest3"] = values[2];
      if(this.state.albumArtUrl != combinedData.apiRequest1[0].src){
           this.setState({
             albumArtUrl : combinedData.apiRequest1[0].src
         })
      }
      if(this.state.title != combinedData.apiRequest2[0].text) { 
           this.setState({
           title:combinedData.apiRequest2[0].text
            
           })
         }
      if(this.state.description != combinedData.apiRequest3[0].text) { 
          this.setState({
          description:combinedData.apiRequest3[0].text.replace(/\n/g, '')

          })
        }
    });
    }, 2000)
   }
  
  componentWillMount(){
    this.getMoviesFromApiAsync();
  }
  componentDidMount(){
	 this.setState({
		 volume:1
   })
   AppState.addEventListener('change', this.handleAppStateChange);
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }
  handleAppStateChange(appState) {
    if (appState === 'background') {
      let date = new Date(Date.now() + (this.state.seconds * 1000));

      if (Platform.OS === 'ios') {
        date = date.toISOString();
      }

      PushNotification.localNotificationSchedule({
        message: "is running on the background",
        date,
        playSound: false,
      });
    }
  }

  render() {
    const track = this.state.audioUrl;
    const art = this.state.albumArtUrl;
    const title = this.state.title;
    const video = this.state.isChanging ? null : (
      <Video source={{uri: track}} // Can be a URL or a local file.
         ref="audioElement"
        muted={this.state.muted}               // Pauses playback entirely.
        resizeMode="cover"           // Fill the whole screen at aspect ratio.
        onLoadStart={this.loadStart} // Callback when video starts to load
        style={styles.audioElement}
        playInBackground={true}
        volume = {this.state.volume}
		/>
    );
    return (
      <PaperProvider>
        <StatusBar backgroundColor="#3e64ff" barStyle="light-content" />
        <View style={styles.header}>
          <Image source={require('../assets/images/umnradio.png')} style={{ flex: 1, height: undefined, width: undefined }} resizeMode="contain" />
        </View>
        <View style={styles.main}>
          <View style={styles.albumArt}>
          <AlbumArt url={art} />
          </View>
          <View style={styles.control}>
             <Card style={styles.controlDesc}>
               <Card.Content>
                <Title style={{fontSize: 20,}}>Now On Air - </Title>
				  <Subheading style={{fontSize: 30, paddingTop:20}}>{title}</Subheading>

              </Card.Content>
            </Card>
            <Card style={styles.controlPlay}>
            {video}
            <Player 
                onPressPlay={() => this.setState({muted: false})}
                onPressPause={() => this.setState({muted: true})}
                muted={this.state.muted}
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
    borderTopWidth:0.1,
    paddingTop: 10,
    flex: 2,
    flexDirection:'row',
    justifyContent: 'center',
  },
  controlDesc:{
    flex:2,
    justifyContent: 'center',
  },
  controlPlay:{
    paddingTop:20,
    flex:1,
    justifyContent: 'center',
  },
});