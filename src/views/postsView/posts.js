import { inject } from "aurelia-framework";
import { PostService } from "../../services/post-service";
import { EventAggregator } from "aurelia-event-aggregator";

//@inject: for using dependency injection for using the same instance of PostService everywhere
@inject(PostService, EventAggregator)
export class Posts {
  constructor(PostService, EventAggregator) {
    this.postService = PostService;
    this.ea = EventAggregator;
  }

  //when component is attached to the dom
  attached() {
    this.title = "Click me!";

    // this.error = "";
    //allPostPreviews() from PostService
    this.postService
      .allPostPreviews()
      .then(data => {
        this.posts = data.posts; //fetching posts from post-service.js
        // console.log(this.posts);
      })
      .catch(error => {
        //the error in this view-model = the error from the promise on the backend
        //this.error = error.message;
        //error message with toastr
        this.ea.publish('bread', {
          type: 'error',
          message: error.message
        });
      });
  }

  hello() {
    alert("hello mandarin");
  }
}
