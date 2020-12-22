import React, { useState, useEffect, Component } from "react";
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { loginUser } from "../auth/action"
import classnames from "classnames"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault()
    const userData = {
      name: this.state.name
    }
    this.props.loginUser(userData)
  }

  render() {
    const { errors } = this.state;

    return (
      <form noValidate onSubmit={this.onSubmit}>
        <input
          onChange={this.onChange}
          value={this.state.name}
          error={errors}
          id="name"
          type="name"
          className={classnames("", {
            invalid: errors.email || errors.emailnotfound
          })}
        />

        <button
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem"
          }}
          type="submit"
        >
          Login
        </button>
      </form>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { loginUser }
)(Login)