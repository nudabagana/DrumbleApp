import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, TextInput, View, Text} from 'react-native';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import { select, nextQuestionChanged } from '../actions/network.js';

import styleGeneral from '../styles/general.js';

class AnswerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.socket.timer = Math.ceil((new Date(this.props.socket.answers[0].endtime).getTime() - new Date().getTime())/1000)+3;
    this.myInterval = setInterval(() => {
      if (this.props.socket.timer <= 0) {
        clearInterval(this.myInterval);
        this.props.nextQuestionChanged(false);
        const resetAction = StackActions.reset({
          index: 0, actions: [
            NavigationActions.navigate({ routeName: 'Truth' })
          ],
        });
        this.props.navigation.dispatch(resetAction);
      } else {
        this.props.socket.timer = this.props.socket.timer-1;
        this.forceUpdate();
      }
    }, 1000)
  }

  static navigationOptions = {
      title: 'Home',
      header: null,
  };

  selectedLanguage() {
    return this.props.language.language;
  }

  compare(a,b) {
    if (a.AnswerId < b.AnswerId)
      return -1;
    if (a.AnswerId > b.AnswerId)
      return 1;
    return 0;
  }

  handleChoiceClick(numb)
  {
    clearInterval(this.myInterval);
    this.props.socket.answers.sort(this.compare);
    this.props.select(this.props.socket.answers[numb]);
    const resetAction = StackActions.reset({
      index: 0, actions: [
        NavigationActions.navigate({ routeName: 'WaitingAnswer' })
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  getTimer()
  {
    return this.props.socket.timer;
  }

  render() {
    const lang = this.selectedLanguage();
    return (
      <SafeAreaView style={{ backgroundColor: '#4FAFFF', flex:1, flexDirection: 'column', justifyContent:'center'}}>
        <View style={{ flex:3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',}}>
          <Image width={80} source={require('../images/clock.png')}/>
          <Text style={[{fontSize: 70, fontWeight: 'bold', textAlign: 'center'}]}>{this.getTimer()}</Text>
        </View>
        <View style={{flex:5, alignItems :'center', justifyContent:'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',}}>
          <TouchableOpacity onPress={() => this.handleChoiceClick(1)}>
            <View marginTop={5} marginBottom={5} marginRight={5} marginLeft={5} style={[styleGeneral.joinButton, {width:140, height: 140}]}>
              <Image width={120} source={require('../images/lion.png')}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleChoiceClick(2)}>
            <View marginTop={5} marginBottom={5} marginRight={5} marginLeft={5} style={[styleGeneral.joinButton, {width:140, height: 140}]}>
              <Image width={120} source={require('../images/crocodile.png')}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleChoiceClick(3)}>
            <View marginTop={5} marginBottom={5} marginRight={5} marginLeft={5} style={[styleGeneral.joinButton, {width:140, height: 140}]}>
              <Image width={120} source={require('../images/flamingo.png')}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleChoiceClick(4)}>
            <View marginTop={5} marginBottom={5} marginRight={5} marginLeft={5} style={[styleGeneral.joinButton, {width:140, height: 140}]}>
              <Image width={120} source={require('../images/elephant.png')}/>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { language: state.language, socket: state.socket };
};

export default connect(mapStateToProps, {select, nextQuestionChanged, })(AnswerScreen);