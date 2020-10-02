//import "bootstrap";
import { inject } from "aurelia-framework";
import { AuthService } from "./services/auth-service";
import { PostService } from "./services/post-service";
import routes from "router";
import { EventAggregator } from "aurelia-event-aggregator";
//import { AuthorizeStep } from "./pipelineSteps/authorize-step";
import * as toastr from "toastr";

//@inject: for using dependency injection for using the same instance of PostService everywhere
@inject(EventAggregator, AuthService, PostService)
export class App {
  //
  constructor(EventAggregator, AuthService, PostService) {
    this.ea = EventAggregator; //event-kombinerare
    this.heading = "Blog";
    this.postService = PostService;
    this.authService = AuthService;
  }

  //when we attach this comp
  attached() {
    this.currentUser = this.authService.currentUser; //not going to refresh if we dont tell it to
    //EventAggregator is subscribing to user
    this.userSubscribition = this.ea.subscribe("user", (user) => {
      //this info is going to be our updated user
      this.currentUser = this.authService.currentUser;
    });

    //testing toastr
    this.breadSubscription = this.ea.subscribe("bread", (bread) => {
      // toastr.success(bread);
      toastr[bread.type](bread.message);
    });
    //this.ea.publish('bread', 'Testing avent aggregator');
    /*  this.ea.publish('bread', {
       type: 'success',
       message: 'This was successful'
     }); */
  }

  //router config
  configureRouter(config, router) {
    this.router = router;
    config.title = ""; //title tag
    //config.addAuthorizeStep(AuthorizeStep); //mark routes where you need to be logged in

    config.map(routes); //map over routes array
  }

  //when we detach this comp
  detached() {
    //throw away the subscription
    this.userSubscribition.dispose();
    this.breadSubscribition.dispose();
  }

  //logout
  logout() {
    this.authService
      .logout()
      .then((data) => {
        //console.log(data.success);
        //publish in user: null
        this.ea.publish("user", null);

        //error message with toastr
        this.ea.publish("bread", {
          type: "success",
          message: "You have successfully logged out.",
        });
        this.router.navigateToRoute("blog-home");
      })
      .catch((error) => {
        // this.error = error.message;
        //error message with toastr
        this.ea.publish("bread", {
          type: "error",
          message: error.message,
        });
      });
  }
}
