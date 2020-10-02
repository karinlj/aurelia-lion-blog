import { inject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { Router } from "aurelia-router";
import { AuthService } from "../../services/auth-service";

@inject(EventAggregator, Router, AuthService)
export class SignUp {
  constructor(EventAggregator, Router, AuthService) {
    this.ea = EventAggregator;
    this.router = Router;
    this.authService = AuthService;
    // this.error = null;
  }

  signup() {
    this.error = null;
    /* did our 2-way-binding with name on the input */
    this.authService
      .signup(this.name)
      .then(data => {
        //success
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
