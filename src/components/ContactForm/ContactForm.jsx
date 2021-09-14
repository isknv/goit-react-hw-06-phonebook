import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import contactsActions from "../../redux/phoneBook/phoneBookActions";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, FormControl, InputGroup } from "react-bootstrap";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  nameId = uuidv4();
  phoneId = uuidv4();

  handelInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handelFormSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const { contacts } = this.props;
    const existContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existContact) {
      return alert(`Contact "${name}" already exists`);
    }
    this.props.onSubmit(name, number);
    this.setState({ name: "", number: "" });
  };

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.handelFormSubmit}>
        <div className="container-name">
          <label className="form-label">
            Name
            <InputGroup className="mb-3">
              <FormControl
                aria-label="Text input with checkbox"
                className="form-input"
                type="text"
                name="name"
                value={this.state.name}
                required
                onChange={this.handelInputChange}
                autoComplete="off"
              />
            </InputGroup>
          </label>
        </div>
        <div className="container-number">
          <label className="form-label" id={this.phoneId}>
            Number
            <InputGroup className="mb-3">
              <FormControl
                aria-label="Text input with checkbox"
                className="form-input"
                type="tel"
                name="number"
                value={this.state.number}
                required
                id={this.phoneId}
                onChange={this.handelInputChange}
                autoComplete="off"
              />
            </InputGroup>
          </label>
        </div>
        <Button className="btn-form" type="submit" variant="outline-success">
          Add contact
        </Button>
      </form>
    );
  }
}

const mapstateToProps = state => ({
  contacts: state.contacts.items,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (name, number) =>
    dispatch(contactsActions.addContact(name, number)),
});

export default connect(mapstateToProps, mapDispatchToProps)(ContactForm);
