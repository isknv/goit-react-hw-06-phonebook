import React from "react";
import { connect } from "react-redux";
import contactsActions from "../../redux/phoneBook/phoneBookActions";
import { Button } from "react-bootstrap";

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className="list-filter">
      {contacts.map((contact, index) => {
        const { id, name, number } = contact;

        return (
          <li className="item-filter" key={id}>
            <span className="index">{++index}</span>
            <p className="name">{name}:</p>
            <p className="number">{number}</p>
            <Button
              className="delBtn"
              type="button"
              onClick={() => onDeleteContact(id)}
            >
              Delete
            </Button>{" "}
          </li>
        );
      })}
    </ul>
  );
};

const getVisibleContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return allContacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};

const mapstateToProps = state => {
  return {
    contacts: getVisibleContacts(state.contacts.items, state.contacts.filter),
  };
};

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(contactsActions.deleteContact(id)),
});

export default connect(mapstateToProps, mapDispatchToProps)(ContactList);
