import { useState } from "react";
import Input from "../Input";
import PropTypes from "prop-types";
import PhoneInput from "react-phone-number-input";
import styled from "styled-components";
import { nanoid } from "nanoid";
import "react-phone-number-input/style.css";

export default function Form({ onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    if (number.length > 13) return alert("Please enter correct phone number");
    e.preventDefault();
    onSubmit({ name, number, id });
    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
    setId("");
  };

  const handleInputChange = (e) => {
    setName(e.currentTarget.value);
    setId(nanoid());
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        onChange={handleInputChange}
        title="Name"
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        placeholder="Enter please name"
      />
      <PhoneInput
        defaultCountry="UA"
        onChange={(number) => {
          setNumber(number);
        }}
        region="Europe"
        title="Number"
        type="tel"
        name="number"
        value={number}
        placeholder="Enter phone number"
        autoComplete="off"
        international
        className="inputPhone"
        maxLength="16"
      />
      <BtnSubmit onSubmit={handleSubmit}>Add contact</BtnSubmit>
    </FormContainer>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  width: 300px;
  border-radius: 10px;
  color: #fff;
  background: linear-gradient(
    335deg,
    rgba(41, 30, 94, 1) 0%,
    rgba(29, 59, 201, 1) 50%,
    rgba(5, 196, 207, 1) 100%
  );
`;

const BtnSubmit = styled.button.attrs(() => ({
  type: "submit",
}))`
  position: relative;
  padding: 5px 10px;
  display: inline-block;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 29px;
    background: rgba(2, 94, 252, 0.308);
    border-radius: 5px;
    transition: all 1.5s ease;
  }
  &:hover:before {
    width: 100%;
  }
`;
