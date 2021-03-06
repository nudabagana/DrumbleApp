import React, { Component } from 'react';
import { AppRegistry, TouchableNativeFeedback, TextInput, View, Text} from 'react-native';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import {showScoreStatusChanged, correctAnswerReceivedChanged, getPlayerRanking} from '../actions/network.js';

import styleGeneral from '../styles/general.js';

class WaitingGameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.getPlayerRanking();
  }

  static navigationOptions = {
      title: 'Home',
      header: null,
  };

  selectedLanguage() {
    return this.props.language.language;
  }

  gameStarted()
  {
    return this.props.socket.gameStarted;
  }

  render() {
    if(this.props.socket.disconnected)
    {
      const resetAction = StackActions.reset({
        index: 0, actions: [
          NavigationActions.navigate({ routeName: 'Disconnect' })
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
    const lang = this.selectedLanguage();
    if (this.gameStarted())
    {
        const resetAction = StackActions.reset({
          index: 0, actions: [
            NavigationActions.navigate({ routeName: 'Answer' })
          ],
        });
        this.props.navigation.dispatch(resetAction);
    }
    if(this.props.socket.showScoreStatus == "ok"){
      this.props.showScoreStatusChanged("inactive");
      this.props.correctAnswerReceivedChanged(false);
      const resetAction = StackActions.reset({
        index: 0, actions: [
          NavigationActions.navigate({ routeName: 'Score' })
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
    return (
      <SafeAreaView style={{ backgroundColor: '#4FAFFF', flex:1, flexDirection: 'column', justifyContent:'center'}}>
        <View style={{flex:8, alignItems :'center', justifyContent:'center'}}>
          <Text style={[{fontSize: 40, fontWeight: 'bold', textAlign: 'center', width:300, height: 120}]}>{lang.waitingForGame}</Text>
          <Image
            width={80}
            source={require('../images/loading.gif')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { language: state.language, socket: state.socket };
};

export default connect(mapStateToProps, {showScoreStatusChanged, correctAnswerReceivedChanged, getPlayerRanking, })(WaitingGameScreen);
