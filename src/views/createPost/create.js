import { inject } from "aurelia-framework";
import { PostService } from "../../services/post-service";
import { Router } from "aurelia-router";
import { EventAggregator } from "aurelia-event-aggregator";

//@inject: for using dependency injection for using the same instance of PostService everywhere
@inject(EventAggregator, Router, PostService)
export class Create {
  //
  constructor(EventAggregator, Router, PostService) {
    this.ea = EventAggregator;
    this.router = Router;
    this.postService = PostService;
  }

  attached() {
    this.post = {
      title: "",
      body: "",
      tags: []
    };
    this.title = "Create Post";
  }

  createPost() {
    this.postService
      //create() in PostService
      .create(this.post)
      .then(data => {
        this.ea.publish("post-updated", Date()); //at this exact time, there was a change to our post
        // console.log(data);
        this.ea.publish('bread', {
          type: 'success',
          message: 'Post created!'
        })
        this.router.navigateToRoute("single-post", { slug: data.slug });
      })
      .catch(error => {
        // console.log(error);
        this.ea.publish('bread', {
          type: 'error',
          message: error.message
        })
      });
  }
}
