import { inject } from "aurelia-framework";
import { PostService } from "../../services/post-service";
import { AuthService } from "../../services/auth-service";
import { EventAggregator } from "aurelia-event-aggregator";
import { Router } from 'aurelia-router';

//@inject: for using dependency injection for using the same instance of PostService everywhere
@inject(PostService, AuthService, EventAggregator, Router)
export class Single {
  //
  constructor(PostService, AuthService, EventAggregator, Router) {
    this.postService = PostService;
    this.authService = AuthService;
    this.ea = EventAggregator;
    this.router = Router;
  }
  attached() {
    this.title = "Click me!";
    this.currentUser = this.authService.currentUser; //not going to refresh if we dont tell it to
    //EventAggregator is subscribing to user
    this.userSubscribition = this.ea.subscribe("user", user => {
      //this info is going to be our updated user
      this.currentUser = this.authService.currentUser;
    });
  }

  //activate(): to fetch info from the get-params from the url
  activate(params) {
    // this.error = "";
    //find(slug) from PostService
    this.postService
      .find(params.slug)
      .then(data => {

        console.log('slug', params.slug);
        this.post = data.post;
      })
      .catch(error => {
        //this.error = error.message;
        this.ea.publish('bread', {
          type: 'error',
          message: error.message
        })
        this.router.navigateToRoute('blog-home');
      });
  }
  /* 
    detached() {
      //throw away the subscription
      this.userSubscribition.dispose();
      this.breadSubscribition.dispose();
    } */
  hello() {
    alert("hello banan");
  }
}
