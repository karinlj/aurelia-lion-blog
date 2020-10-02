import { inject } from "aurelia-framework";
import { PostService } from "../../services/post-service";
import { AuthService } from "../../services/auth-service";
import { Router } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";

//@inject: for using dependency injection for using the same instance of PostService everywhere
@inject(EventAggregator, Router, PostService, AuthService)
export class Edit {
  //
  constructor(EventAggregator, Router, PostService, AuthService) {
    this.ea = EventAggregator;
    this.router = Router;
    this.postService = PostService;
    this.authService = AuthService;
  }

  //get the parameters for the post passed in the url
  activate(params) {
    this.postService
      .find(params.slug)
      .then(data => {

        //first check authorship
        if (data.post.author !== this.authService.currentUser) {
          this.router.navigateToRoute('blog-home');
        }
        this.post = data.post; //populate our post here

        console.log('myPost', this.post);
      })
      .catch(error => {
        console.log(error);
        //error message with toastr
        this.ea.publish('bread', {
          type: 'error',
          message: 'Post not found.'
        });
        this.router.navigateToRoute('blog-home');
      });
    this.title = "Edit Post";
    //populate all tags
  }

  editPost() {
    //update() in PostService
    this.postService
      .update(this.post)
      .then(data => {
        this.ea.publish("post-updated", Date()); //at this exact time, there was a change to our post
        //console.log(data);
        this.ea.publish('bread', {
          type: 'success',
          message: 'Post edited'
        })
        this.router.navigateToRoute("single-post", { slug: data.slug });
      })
      .catch(error => {
        //console.log(error);
        this.ea.publish('bread', {
          type: 'error',
          message: error.message
        })
      });
  }

  /*  detached() {
     //throw away the subscription
     this.breadSubscribition.dispose();
   } */
}
