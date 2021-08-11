import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    console.log("submitted");
  };

  validate = () => {
    const options = { abortEarly: false };
    // const result =
    const { error } = Joi.validate(this.state.account, this.schema, options);
    // if(!result.error)
    if (!error) return null; // returns null when error is falsy
    const errors = {};
    // for (let item of result.error.details)
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    // (input) --> ({name, value})
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    //e , e.currentTarget intead  <---
    const errors = { ...this.state.errors }; //clones the error object
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account }; // clones account object
    account[input.name] = input.value; //account[username or password]
    this.setState({ account, errors }); //account: account
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name={"username"}
            label={"Username"}
            value={account.username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name={"password"}
            label={"Password"}
            value={account.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
