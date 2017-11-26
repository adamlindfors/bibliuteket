import firebase from 'firebase';
import {
  BOOKS_FETCH_SUCCESS,
  BOOK_UPDATE,
  BOOK_CREATE
} from './types';

export const booksFetch = () => {
  return (dispatch) => {
    firebase.database().ref('books').orderByChild('date')
      .on('value', snapshot => {
        const books = [];
        snapshot.forEach(child => {
          const childWithUid = { ...child.val(), uid: child.key };
          books.push(childWithUid);
        });
        books.reverse();
        dispatch({ type: BOOKS_FETCH_SUCCESS, payload: books });
      });
  };
};

export const bookUpdate = ({ prop, value }) => {
  return {
    type: BOOK_UPDATE,
    payload: { prop, value }
  };
};

export const bookCreate = ({
  author, date, description, email, location, phone, pictureUrl, price, name, title, navigator
}) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref('/books')
      .push({
        author,
        date,
        user: currentUser.uid,
        description,
        email,
        location,
        phone,
        pictureUrl,
        price,
        name,
        title
      })
      .then(() => {
        dispatch({ type: BOOK_CREATE });
        navigator.switchToTab({
          tabIndex: 0
        });
      });
  };
};

export const bookDelete = ({ uid, navigator }) => {
  return () => {
    firebase.database().ref(`books/${uid}`)
      .remove()
      .then(() => {
        navigator.popToRoot({});
      });
  };
};
