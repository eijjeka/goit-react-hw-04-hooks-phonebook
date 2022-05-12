import React, { Component } from 'react';
import Container from './Container';
import Form from './Form';
import List from './ContactsList';
import Filter from './Filter';
import styled from 'styled-components';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({
        contacts: parseContacts,
      });
    }
  }

  componentDidUpdate(prevState) {
    const contacts = this.state.contacts;
    const prevStateContacts = prevState.contacts;

    if (contacts !== prevStateContacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  formSubmitHandler = data => {
    const checkName = this.state.contacts.find(el => el.name === data.name);
    checkName === undefined
      ? this.setState(prevState => ({
          contacts: [data, ...prevState.contacts],
        }))
      : alert(`${data.name} is already in contacts.`);
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const normalizeFilter = filter.toLocaleLowerCase();

    const visibleFilter = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );

    return (
      <Container>
        <Title>Phonebook &#128211;</Title>
        <Form onSubmit={this.formSubmitHandler} />
        <Filter value={filter} onChange={this.changeFilter} />
        <List data={visibleFilter} onDeleteContact={this.deleteContact} />
      </Container>
    );
  }
}

export default App;

const Title = styled.h1``;
