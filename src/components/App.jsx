import { useState, useMemo } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Container from "./Container";
import Form from "./Form";
import List from "./ContactsList";
import Filter from "./Filter";
import styled from "styled-components";

export default function App() {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const [filterName, setFilterName] = useState("");

  const visibleContacts = useMemo(() => {
    const normalizeFilter = filterName.toLocaleLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  }, [contacts, filterName]);

  const formSubmitHandler = (data) => {
    const checkName = contacts.find((el) => el.name === data.name);

    checkName === undefined
      ? setContacts((prevState) => [data, ...prevState])
      : alert(`${data.name} is already in contacts.`);
  };

  const deleteContact = (contactId) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== contactId)
    );
  };

  return (
    <Container>
      <Title>Phonebook &#128211;</Title>
      <Form onSubmit={formSubmitHandler} />
      <Filter
        value={filterName}
        onChange={(e) => setFilterName(e.currentTarget.value)}
      />
      <List data={visibleContacts} onDeleteContact={deleteContact} />
    </Container>
  );
}

const Title = styled.h1``;
