import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveContacts,
} from "../actions/contacts";
import { Link } from "react-router-dom";

class ContactsList extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveContact = this.setActiveContact.bind(this);

    this.state = {
      currentContact: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.props.retrieveContacts();
  }

  refreshData() {
    this.setState({
      currentContact: null,
      currentIndex: -1,
    });
  }

  setActiveContact(contact, index) {
    this.setState({
      currentContact: contact,
      currentIndex: index,
    });
  }



  render() {
    const { currentContact, currentIndex } = this.state;
    const { contacts } = this.props;

    return (
      <div className="list row">
      
        <div className="col-md-6">
          <h4>Contacts List</h4>

          <ul className="list-group">
            {contacts &&
              contacts.map((contact, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveContact(contact, index)}
                  key={index}
                >
                  {contact.firstName}
                </li>
              ))}
          </ul>

           
        </div>
        <div className="col-md-6">
          {currentContact ? (
            <div>
              <h4>Contact</h4>
              <div>
                <label>
                  <strong>First Name:</strong>
                </label>{" "}
                {currentContact.firstName}
              </div>
              <div>
                <label>
                  <strong>Last Name:</strong>
                </label>{" "}
                {currentContact.lastName}
              </div>
              <div>
                <label>
                  <strong>Age:</strong>
                </label>{" "}
                {currentContact.age}
              </div>
              <div>
                <label>
                  <strong>Photo:</strong>
                </label>{" "}
                <img src={currentContact.photo} alt=""></img>
              </div>
              <Link
                to={"/contacts/" + currentContact.id}
                class="btn btn-primary"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Contact...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  };
};

export default connect(mapStateToProps, {
  retrieveContacts,
})(ContactsList);
