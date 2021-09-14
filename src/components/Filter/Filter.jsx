import React from "react";
import { connect } from "react-redux";
import contactsActions from "../../redux/phoneBook/phoneBookActions";
import { FormControl, InputGroup } from "react-bootstrap";

const Filter = ({ filter, onChange }) => {
  return (
    <>
      {" "}
      <form>
        <label>
          <InputGroup className="mb-3">
            <FormControl
              aria-label="Text input with checkbox"
              type="text"
              name="name"
              value={filter}
              required
              onChange={onChange}
              className="finde-input"
              autoComplete="off"
            />
          </InputGroup>
        </label>
      </form>
    </>
  );
};

const mapstateToProps = state => ({
  value: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
  onChange: event => dispatch(contactsActions.changeFilter(event.target.value)),
});

export default connect(mapstateToProps, mapDispatchToProps)(Filter);
