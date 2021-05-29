import React, { Component } from "react";
import { connect } from "react-redux";
import { updateContact, deleteContact } from "../actions/contacts";
import ContactDataService from "../services/contact.service";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.onChangefirstName = this.onChangefirstName.bind(this);
    this.onChangelastName = this.onChangelastName.bind(this);
    this.onChangeage = this.onChangeage.bind(this);
    this.onChangephoto = this.onChangephoto.bind(this);
    this.getContact = this.getContact.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeContact = this.removeContact.bind(this);

    this.state = {
      currentContact: {
        id: null,
        firstName: "",
        lastName: "",
        age: "",
        photo: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getContact(this.props.match.params.id);
  }

  onChangefirstName(e) {
  const firstName = e.target.value;

  this.setState(function (prevState) {
    return {
      currentContact: {
        ...prevState.currentfirstName,
        firstName: firstName,
      },
    };
  });
  }
    onChangelastName(e) {
    const lastName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentContact: {
          ...prevState.currentfirstName,
          lastName: lastName,
        },
      };
    });
  }

      onChangeage(e) {
    const age = e.target.value;

    this.setState(function (prevState) {
      return {
        currentContact: {
          ...prevState.currentfirstName,
          age: age,
        },
      };
    });
  }

  onChangephoto(e) {
    const photo = e.target.value;

    this.setState(function (prevState) {
      return {
        currentContact: {
          ...prevState.currentfirstName,
          photo: photo,
        },
      };
    });
  }

  getContact(id) {
    ContactDataService.get(id)
      .then((response) => {
        this.setState({
          currentContact: response.data.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateContact(this.props.match.params.id, this.state.currentContact)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The contact was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeContact() {
    this.props
      .deleteContact(this.props.match.params.id)
      .then(() => {
        this.props.history.push("/contacts");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentContact } = this.state;

    return (
      <div>
        {currentContact ? (
          <div className="edit-form">
            <h4>Contact</h4>
            <form>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={currentContact.firstName}
                  onChange={this.onChangefirstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={currentContact.lastName}
                  onChange={this.onChangelastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  value={currentContact.age}
                  onChange={this.onChangeage}
                />
              </div>

               <div className="form-group">
                <label htmlFor="photo">Photo</label>
                <input
                  type="text"
                  className="form-control"
                  id="photo"
                  value={currentContact.photo}
                  onChange={this.onChangephoto}
                />
              </div>

               
            </form>

           

            <button
              class="btn btn-danger"
              onClick={this.removeContact}
            >
              Delete
            </button>

            <button
              type="submit"
              class="btn btn-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Contact...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateContact, deleteContact })(Contact);
