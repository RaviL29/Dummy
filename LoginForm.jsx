import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Redirect } from "react-router-dom";


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      pswd: "",
      proceed: false,
      B2B_MOCK: []
    };
    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //Make AJAX CALLS HERE

  componentDidMount() {
    console.log('COMPONENT HAS MOUNTED')
  }

addEmploye = (event) => {
  event.preventDefault();
    console.log("I am in method");
    console.log("state captured is: ", this.state);
      let data = {
      emp_id: this.state.userId,
      password: this.state.pswd
     // memorable_info: "information"
    };
    console.log(this.state.userId);
    var request = new Request( 'http://localhost:3000/api/new_employe', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.(data),
      proceed: true,
    });
    
    //xmlhttprequest()

    fetch(request)
      .then(function(response) {
        response.json()
         .then(function(data) {
           console.log(data)
         })
      })
      .catch(function(err) {
        console.log(err)
      })


};
  //handleSubmit = (event) => {
   // event.preventDefault();
   // console.log("state captured is: ", this.state);
    
   // if (this.state.userId && this.state.pswd) {
     // this.setState({
     //   proceed: true,
     // });
   // }
 // };

  render() {
    if (this.state.proceed) {
      return <Redirect to="/memorableinfo" />;
    }
    return (
      <div>
        <div className="container p-3 my-3 border">
          <form className="form-horizontal-inline" onSubmit={this.addEmploye}>
            <div className="para">
              <p>
                <b>If you have used this service before</b>, please enter your
                security details adn click on the 'Continue' button
              </p>
              <hr />
            </div>
            <div className="form-group row">
              <label
                className="control-label col-2 font-weight-bold pl-4"
                htmlFor="userId"
              >
                User ID
              </label>
              <input
                type="text"
                className="form-control col-4"
                id="userId"
                autoComplete="off"
                placeholder=""
                name="userId"
                value={this.state.userId}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group row">
              <label className="col-2 font-weight-bold pl-4" htmlFor="pswd">
                Password
              </label>
              <input
                type="password"
                className="form-control col-4"
                id="pswd"
                placeholder=""
                name="pswd"
                value={this.state.pswd}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" onClick={this.addEmploye.bind(this)} className="btn btn-primary" id="continueBtn">
              Continue
            </button>
            <hr />
            <div className="para">
              {`Give here Registered Borker Id and Password.On clicking submit,authentication of credentials will be started from backend.
              `}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
