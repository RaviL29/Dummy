import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
//import { response } from "express";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      pswd: "",
      proceed: false,
      //validate: false,
      B2B_MOCK: []
    };
    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    //this.addEmploye = this.addEmploye.bind(this);
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
       console.log("state captured is: ", this.refs.emp_id.value);
      let data = {
      emp_id: this.refs.emp_id.value,
      password: this.refs.password.value
     // memorable_info: "information"
    };
    console.log(this.refs.emp_id.value);
    console.log(this.refs.password.value);
    var request = new Request( 'http://localhost:3000/api/new_employe', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json','Accept': 'application/json' }),
      body: JSON.stringify(data),
      proceed: false,
    });
    var validate = 'false';

    //this.setState({
      //proceed: true
    //})

    //xmlhttprequest()
    function resolveAfter2Seconds() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
        }, 200);
      });
    }

    function verify(){
      console.log("before validate");
      if( validate === 'true'){
        console.log("I am validating");
       this.setState ({ 
        proceed: true
      }).bind(this);
      //value();
    }
   
    }

    async function wait1(){
      await resolveAfter2Seconds();
    }
    async function wait(){
    await resolveAfter2Seconds();
    console.log("I am waiting!!!!!!!!!!");
    console.log(responsedata); 
    //var r = '{message: "Data found !!!"}';
    if (JSON.stringify(responsedata) === '{"message":"Data found !!!"}')
            {
              console.log("HIIIIIIIIIIIIIII");
              validate = 'true';
              console.log(responsedata);
                verify().bind(this);;
                //this.setState.proceed = true
              
            }
    }

    let responsedata;
    console.log("I am before promiseeeeee")
    async function getPromise(){
      console.log("I am in Promiseeeee");
      
      const res = await Promise.all([getStatus()]);
      wait();
      return res;
    }

    getPromise().then(data => {
      console.log("its result");
    })

    //getData();  
    //Promise.allSettled([
    async function getStatus(){
      await fetch(request)
      .then(async function(response) {
        await response.json()
        .then(async function(data) {
          console.log(data); 
          responsedata = data;
          console.log(JSON.stringify(responsedata));   
       }) 
      })
      //return responsedata;
    };
    
    
    //]).then(responsedata = data) 
    
  
   //   .catch(function(err) {    
     //   console.log(err)
      //})
      
      
      

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
      <div className = "LoginForm">
        <center>
        <br/>
        <h1>Login to B2B</h1>
          <form ref="addEmploye">
          <div className="para">
              <p>
                <b>If you have used this service before</b>, please enter your
                security details adn click on the 'Continue' button
              </p>
              <hr />
              </div>         
              <p>Broker-ID</p>          
              <input type="text" ref="emp_id" placeholder="broker_id"/>              
              <p>Password</p>              
              <input type="text" ref="password" placeholder="password"/>                                       
              <div>
              <button onClick={this.addEmploye.bind(this)}> Continue </button>
              </div>              
          </form>
          </center>
      </div>    
      
      
    );
  }
}

export default LoginForm;
