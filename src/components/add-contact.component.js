import React, { Component } from "react";
import { connect } from "react-redux";
import { createContact } from "../actions/contacts";

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.onChangefirstName = this.onChangefirstName.bind(this);
    this.onChangelastName = this.onChangelastName.bind(this);
    this.onChangeage = this.onChangeage.bind(this);
    this.onChangephoto = this.onChangephoto.bind(this);
    this.saveContact = this.saveContact.bind(this);
    this.newContact = this.newContact.bind(this);

    this.state = {
      id: null,
      firstName: "",
      lastName: "",
      age: "",
      photo: "",
      submitted: false,
    };
  }

    onChangefirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

    onChangelastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

    onChangeage(e) {
    this.setState({
      age: e.target.value,
    });
  }

    onChangephoto(e) {
    this.setState({
      photo: e.target.value,
    });
  }


  saveContact() {
    const {firstName, lastName, age, photo  } = this.state;

    this.props
      .createContact( firstName, lastName, age, photo)
      .then((data) => {
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          photo: data.photo,
          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newContact() {
    this.setState({
      id: null,
      firstName: "",
      lastName: "",
      age: "",
      photo: "",
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newContact}>
              Add
            </button>
          </div>
        ) : (
          <div>
             <div className="form-group">
              <label htmlFor="firstName">Firstname</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                required
                value={this.state.firstName}
                onChange={this.onChangefirstName}
                name="firstName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Lastname</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                required
                value={this.state.lastName}
                onChange={this.onChangelastName}

                name="lastName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                className="form-control"
                id="age"
                required
                value={this.state.age}
                onChange={this.onChangeage}

                name="age"
              />
            </div>
            <div className="form-group">
              <label htmlFor="photo">Photo</label>
              <input
                type="text"
                className="form-control"
                id="photo"
                required
                value={this.state.photo}
                onChange={this.onChangephoto}

                name="photo"
              />
            </div>

            <button onClick={this.saveContact} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createContact })(AddContact);
