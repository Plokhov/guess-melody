import React from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import {ActionCreator, Operation} from "../../reducer.js";

const widthAuthorization = (Component) => {
  class WidthAuthorization extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        login: ``,
        password: ``,
      };

      this.handleChangeLogin = this.handleChangeLogin.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeLogin(evt) {
      this.setState({
        login: evt.target.value,
      });
    }

    handleChangePassword(evt) {
      this.setState({
        password: evt.target.value,
      });
    }

    handleSubmit(evt) {
      // здесь пока логин вместо email
      const {onUserLogin} = this.props;
      const {login, password} = this.state;

      evt.preventDefault();
      onUserLogin(login, password);
    }

    render() {
      return (<Component
        userInfo={this.state}
        onChangeLogin={this.handleChangeLogin}
        onChangePassword={this.handleChangePassword}
        onSubmitUserInfo={this.handleSubmit}
      />);
    }
  }

  WidthAuthorization.propTypes = {
    onUserLogin: PropTypes.func.isRequired,
  };

  const mapDispatchToProps = (dispatch) => ({
    onUserLogin: (email, password) => {
      dispatch(ActionCreator.getUserEmail(email));
      dispatch(ActionCreator.getUserPassword(password));
      dispatch(Operation.getAuthorization(email, password));
    }
  });

  return connect(null, mapDispatchToProps)(WidthAuthorization);
};

export default widthAuthorization;
