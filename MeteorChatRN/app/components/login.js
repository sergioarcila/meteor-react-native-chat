'use strict';
const USER_KEY = '@meteorChat:userKey'
import React from 'react-native';
import NavigationBar from 'react-native-navbar';
import ddp from '../config/ddp';
let {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Navigator,
} = React;


class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }
  componentDidMount(){
    ddp.initialize();
  }
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>LOGIN</Text>
        <TextInput
          style={styles.input}
          ref='registerUsername'
          placeholder={"username"}
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}
          />
        <TextInput
          style={styles.input}
          ref='registerPassword'
          placeholder="password"
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}
          />
        <TouchableHighlight
          underlayColor='green'
          style={styles.button}
          onPress={() => {
            let self = this;
            let {username, password} = this.state;
            if (username != '' && password != '') {
              console.log('CREDS', username, password);
              ddp.loginWithPassword(username, password)
              .then((res) => {
                console.log('RES', res);
                if (res.loggedIn === true) {
                  this.props.loggedIn();
                }
              })
            }
          }}
          >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor='transparent'
          style={styles.linkContainer}
          onPress={() => {
            this.props.switch();
          }}>
          <Text style={styles.link}>REGISTER</Text>
        </TouchableHighlight>
      </View>
    );
  }
};


let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    margin: 10,
    borderColor: '#b4b4b4',
    borderRadius: 8,
    color: 'black',
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    padding: 5,
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  link: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
  linkContainer: {

  }
});
module.exports = Login;
