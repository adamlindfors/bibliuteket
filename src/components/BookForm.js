import React, { Component } from 'react';
import { View } from 'react-native';
import { FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase';
import ModalSelector from 'react-native-modal-selector';
import { bookUpdate } from '../actions';
import CardSection from './CardSection';
import Card from './Card';
import ImageUploader from '../components/ImageUploader';

class BookForm extends Component {
  componentWillMount() {
    this.props.bookUpdate({ prop: 'email', value: firebase.auth().currentUser.email });
  }

  render() {
    let index = 0;
    const data = [
      { key: index++, label: 'Norrköping' },
      { key: index++, label: 'Linköping' }
    ];

    return (
      <View>
        <Card style={{ marginBottom: 10 }}>
          <ImageUploader />
          <CardSection>
            <FormInput
              returnKeyType="next"
              autoCapitalize="sentences"
              placeholder="Bokens Titel"
              onSubmitEditing={() => {
                this.refs.Author.focus();
              }}
              value={this.props.title}
              onChangeText={value => this.props.bookUpdate({ prop: 'title', value })}
            />
          </CardSection>

          <CardSection>
            <FormInput
              ref='Author'
              autoCapitalize="words"
              returnKeyType="next"
              placeholder="Författare"
              onSubmitEditing={() => {
                this.refs.Price.focus();
              }}
              value={this.props.author}
              onChangeText={value => this.props.bookUpdate({ prop: 'author', value })}
            />

          </CardSection>

          <CardSection style={{ flexDirection: 'row', flex: 2, padding: 0 }}>
            <CardSection style={{ flex: 1, paddingLeft: 30 }}>
              <ModalSelector
                data={data}
                selectTextStyle={{ color: '#c2c3c9' }}
                initValue='Välj ort...'
                backdropPressToClose
                cancelText={'Avbryt'}
                onChange={value => this.props.bookUpdate({ prop: 'location', value: value.label })}
              />
            </CardSection>
            <CardSection style={{ flex: 1 }}>
              <FormInput
                ref='Price'
                returnKeyType="next"
                keyboardType="numeric"
                placeholder="Pris"
                onSubmitEditing={() => {
                  this.refs.Description.focus();
                }}
                value={this.props.price}
                onChangeText={value => this.props.bookUpdate({ prop: 'price', value })}
              />
            </CardSection>
          </CardSection>

          <CardSection style={{ marginBottom: 24 }}>
            <FormInput
              ref='Description'
              returnKeyType="next"
              autoCapitalize="sentences"
              placeholder="Beskrivning"
              numberOfLines={3}
              multiline
              onSubmitEditing={() => {
                this.refs.Name.focus();
              }}
              value={this.props.description}
              onChangeText={value => this.props.bookUpdate({ prop: 'description', value })}
            />
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <FormInput
              ref='Name'
              returnKeyType="next"
              autoCapitalize="words"
              placeholder="Namn"
              editable={false}
              onSubmitEditing={() => {
                this.refs.Email.focus();
              }}
              value={this.props.user.displayName}
            />
          </CardSection>

          <CardSection>
            <FormInput
              ref='Email'
              returnKeyType="next"
              placeholder="Email"
              onSubmitEditing={() => {
                this.refs.Number.focus();
              }}
              value={this.props.email}
              onChangeText={value => this.props.bookUpdate({ prop: 'email', value })}
            />
          </CardSection>

          <CardSection>
            <FormInput
              ref='Number'
              keyboardType="numeric"
              placeholder="Telefonnummer (frivilligt)"
              value={this.props.phone}
              onChangeText={value => this.props.bookUpdate({ prop: 'phone', value })}
            />
          </CardSection>
        </Card>

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    author, description, email, location, phone, pictureUrl, price, title
  } = state.bookForm;

  const { user } = state.auth;

  return { author, description, email, location, phone, pictureUrl, price, title, user };
};

export default connect(mapStateToProps, { bookUpdate })(BookForm);
