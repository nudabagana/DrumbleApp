import React, { Component } from 'react';
import { AppRegistry, TouchableNativeFeedback, TextInput, View, Text} from 'react-native';
import { SafeAreaView, StackActions, NavigationActions } from 'react-navigation';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import {showScoreStatusChanged} from '../actions/network.js';



import styleGeneral from '../styles/general.js';

class TruthScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
      title: 'Home',
      header: null,
  };

  selectedLanguage() {
    return this.props.language.language;
  }

  handleGoBackClick() {

  }

  render() {
    if(this.props.socket.nextQuestion){
      const resetAction = StackActions.reset({
        index: 0, actions: [
          NavigationActions.navigate({ routeName: 'Answer' })
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
    if(this.props.socket.showScoreStatus == "ok"){
      this.props.showScoreStatusChanged("inactive");
      const resetAction = StackActions.reset({
        index: 0, actions: [
          NavigationActions.navigate({ routeName: 'Score' })
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
    const lang = this.selectedLanguage();
    return (
      <SafeAreaView style={{ backgroundColor: '#4FAFFF', flex:1, flexDirection: 'column', justifyContent:'center'}}>
        <View style={{ alignItems :'center', justifyContent:'center'}}>
          <Text style={[{fontSize: 45, fontWeight: 'bold', textAlign: 'center', width:300, height: 150}]}>Maybe you were correct</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { language: state.language, socket: state.socket };
};

export default connect(mapStateToProps, {showScoreStatusChanged, })(TruthScreen);