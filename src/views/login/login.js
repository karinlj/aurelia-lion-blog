import { inject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { Router } from "aurelia-router";
import { AuthService } from "../../services/auth-service";

@inject(EventAggregator, Router, AuthService)
export class Login {
  //
  constructor(EventAggregator, Router, AuthService) {
    this.ea = EventAggregator; //ea??
    this.router = Router;
    this.authService = AuthService;
  }

  //when this comp is activated
  /*   activate() {
    //using toastr instead
      this.error = null;
    } */

  //gjord  utan förklaring
  login() {
    // this.error = null;
    /* did our 2-way-binding with name on the input */
    this.authService
      .login(this.name)
      .then(data => {
        //success
        //console.log(data.user);
        //publishing to user that says we have logged out
        this.ea.publish("user", data.name);
        this.router.navigateToRoute("blog-home");
      })
      .catch(error => {
        //this.error = error.message;
        this.ea.publish('bread', {
          type: 'error',
          message: error.message
        })
      });
  }
}
