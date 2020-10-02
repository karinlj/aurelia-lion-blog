import { Redirect } from "aurelia-router";
import { inject } from "aurelia-framework";
import { AuthService } from "../services/auth-service";

@inject(AuthService)
export class AuthorizeStep {
  constructor(AuthService) {
    this.authService = AuthService
  }
  //mark routes where you need to be logged in
  run(navigationInstruction, next) {
    //if we find a setting in the routes with auth=true, lets use this pipeline
    //if user needs to be logged in - check for login

    /*    if (navigationInstruction, getAllInstructions().some(i => i.config.settings.auth)) {
         //check for login
         //if user is not logged in - send them to login page
           if (!this.authService.currentUser) {
             //pretend login check fails - redirect to login page
             return next.cancel(new Redirect("login"));
           } 
       } */
    return next();
  }
}
