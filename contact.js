import React, { Component } from 'react';
import styled from 'styled-components';

const initialState = {
  name: '',
  email: '',
  message: ''
};

class ContactForm extends Component {
  state = { formData: initialState, submitted: false };

  componentDidUpdate() {
    const { submitted } = this.state;
    if (submitted) {
      setTimeout(() => this.setState({ submitted: false }), 3000);
    }
  }

  handleInputChange = e => {
    const { formData } = this.state;
    this.setState({
      formData: { ...formData, [e.target.name]: e.target.value }
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...this.state.formData })
    })
      .then(() => this.setState({ formData: initialState, submitted: true }))
      .catch(error => alert(error));
  };

  render() {
    const { name, email, message } = this.state.formData;
    const { submitted } = this.state;
    return (
      <StyledForm
        onSubmit={this.handleFormSubmit}
        data-netlify="true"
        name="portfolio"
      >
        {submitted ? (
          <div className="message">Success! Thank you for reaching out!</div>
        ) : null}
        <h3>Send me a message:</h3>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Enter name"
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Enter email"
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Message:</label>
          <textarea
            name="message"
            id="message"
            value={message}
            placeholder="Enter message"
            onChange={this.handleInputChange}
          />
        </div>
        <button>Submit</button>
      </StyledForm>
    );
  }
}

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
  }
  .message {
    width: 100%;
    text-align: center;
    color: #fff;
    background: #8fdfde;
    font-weight: bold;
    padding: 1rem;
    border: 2px solid transparent;
    border-radius: 5px;
    transition: all 0.2s;
  }
  h3 {
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
    label {
      font-size: 1.4rem;
      margin-bottom: 5px;
    }
    input,
    textarea {
      font-size: 1.6rem;
      padding: 1rem;
      border: 1px solid #dddddd;
      border-radius: 5px;
      transition: all 0.2s;
      &:focus {
        outline: 0;
        border: 2px solid #8fdfde;
      }
    }
    textarea {
      min-width: 100%;
      max-width: 100%;
      min-height: 14rem;
    }
  }
  button {
    font-size: 1.6rem;
    color: #fefefe;
    background: #8fdfde;
    width: 100%;
    padding: 1rem;
    border-radius: 5px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: 0.2s all;
    text-align: center;
    text-decoration: none;
    &:hover {
      background: transparent;
      border: 1px solid #8fdfde;
    }
  }
`;

export default ContactForm;