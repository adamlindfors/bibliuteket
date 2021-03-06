import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableWithoutFeedback, Image, Keyboard } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { userUpdate, loginUser } from '../actions';
import CardSection from '../components/CardSection';

class LoginScreen extends Component {
  static navigatorStyle = {
    navBarHideOnScroll: false
  }

  constructor(props) {
    super(props);
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  onLoginPress() {
    const { liuid, password } = this.props;
    this.props.loginUser({ liuid, password });
  }

  handleRegisterButtonPress() {
    this.props.navigator.push({
      screen: 'RegisterScreen',
      navigatorStyle: {
        tabBarHidden: true
      }
    });
  }

  keyboardWillShow() {
    this.props.navigator.toggleTabs({
      to: 'hidden',
      animated: false
    });
  }

  keyboardWillHide() {
    this.props.navigator.toggleTabs({
      to: 'shown',
      animated: false
    });
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <CardSection style={{ alignItems: 'center', marginTop: 40 }}>
          <Image style={{ width: 200, height: 161 }} source={require('../images/inAppLogo.png')} />
        </CardSection>
        <CardSection>
          <View style={styles.searchSection}>
            <Icon color="#a5a5a5" name="person" size={20} style={styles.searchIcon} />
            <FormInput
              containerStyle={styles.input}
              inputStyle={{ marginLeft: 30 }}
              placeholder="LiU-ID"
              value={this.props.liuid}
              onChangeText={value => this.props.userUpdate({ prop: 'liuid', value })}
              onSubmitEditing={() => {
                this.refs.Password.focus();
              }}
              returnKeyType="next"
            />
          </View>
          <View style={styles.searchSection}>
            <Icon color="#a5a5a5" name="lock" size={20} style={styles.searchIcon} />
            <FormInput
              containerStyle={[styles.input, { marginBottom: 20 }]}
              inputStyle={{ marginLeft: 30 }}
              placeholder="Lösenord"
              value={this.props.password}
              autoCorrect={false}
              secureTextEntry
              onChangeText={value => this.props.userUpdate({ prop: 'password', value })}
              ref="Password"
            />
          </View>
          <Button
            raised
            buttonStyle={{ backgroundColor: '#2ecc71' }}
            textStyle={{ textAlign: 'center' }}
            backgroundColor='red'
            title={'Logga in'}
            onPress={this.onLoginPress.bind(this)}
          />

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </CardSection>
        <CardSection style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ alignSelf: 'center' }}>Har du inget konto?</Text>
          <TouchableWithoutFeedback onPress={this.handleRegisterButtonPress.bind(this)}>
            <View>
              <Text style={{ color: '#2ecc71' }}> Registrera ditt konto här</Text>
            </View>
          </TouchableWithoutFeedback>
        </CardSection>
      </ScrollView>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'red'
  },
  searchSection: {
    overflow: 'hidden'
  },
  searchIcon: {
    position: 'absolute',
    paddingLeft: 20,
    paddingTop: 7
  },
  input: {
    overflow: 'hidden',
  }
};


const mapStateToProps = (state) => {
  const { liuid, password, error, loading } = state.auth;

  return { liuid, password, error, loading };
};

export default connect(mapStateToProps, {
  userUpdate, loginUser
})(LoginScreen);
