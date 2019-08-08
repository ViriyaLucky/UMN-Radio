import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Headline } from 'react-native-paper';
export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.title}>
          <Image source={require("../assets/images/umnradio.png")}
            style={{ width: 240, height: 80 }}
          />
        </View>
        <View>
          <Headline style={styles.headline}>WHO WE ARE</Headline>
            <Card >
              <Card.Content>
                <Title style={styles.cardTitle}>Inspiring Change for Tomorrow</Title>
                <Paragraph style={styles.content}>UMN Radio merupakan organisasi berbasis kegiatan mahasiswa yang berada di bawah Yayasan Multimedia Nusantara. Diresmikan dan mengudara sejak 18 Juli 2011 dengan tagline "Inspiring Change for Tomorrow" UMN Radio diharapkan dapat menjadi sarana belajar dan mengasah kreativitas mahasiswa UMN dalam menjalankan dan melaksanakan proses manajemen sebuah organisasi media kampus dalam bentuk media radio yang mampu membawa dampak positif kepada masyarakat melalui media radio.</Paragraph>
              </Card.Content>
            </Card>
            <Card >
              <Card.Content>
                <Title style={styles.cardTitle}>Eighth Generation</Title>
                <Paragraph style={styles.content}>Saat ini UMN Radio beroperasi di Lantai 6, Gedung B, Universitas Multimedia Nusantara dalam kepengurusan aktif Generasi 8 yang melibatkan 77 mahasiswa UMN dari berbagai program studi. UMN Radio Generasi 8 mengangkat tagline operasional "Work Hard Play Hard" yang menjadi motivasi untuk terus melangkah maju membawa operasional UMN Radio ke arah yang lebih baik dalam segala bidang.</Paragraph>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Title style={styles.cardTitle}>Airing Hours</Title>
                <Paragraph style={styles.content}>UMN Radio mengudara di 107.7 FM dan dapat diakses melalui streaming di radio.umn.ac.id. Setiap Senin-Jumat (08.00-21.00) dan Sabtu (08.00-12.00). UMN Radio juga dapat dijangkau melalui media sosial instagram (@umnradio), twitter (@umnradio) dan official line (@umnradio).</Paragraph>
              </Card.Content>
            </Card>
            <Headline style={styles.bottom}>IT'S U. IT'S MUSIC. IT'S NEWS. IT'S UMN RADIO</Headline>

        </View>
        </ScrollView>
      
    );
  }
}

const styles = StyleSheet.create({

  title: {
    paddingTop: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headline:{
    paddingTop:10,
    backgroundColor:'#2a71b8',
    color:'white',
    textAlign: 'center', 
    paddingBottom: 10,
    fontSize: 30,
  },
  bottom:{
    paddingTop:10,
    backgroundColor:'#2a71b8',
    color:'white',
    textAlign: 'center', 
    fontSize: 20,
  },
  cardTitle:{
    color:'#2A71B8',
    fontSize:24
  },
  content:{
    textAlign:"justify",
  }
});