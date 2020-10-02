import { inject } from "aurelia-framework";
import { PostService } from "../../services/post-service";
import { EventAggregator } from "aurelia-event-aggregator";

//@inject using dependency injection for using the same instance of PostService everywhere
@inject(PostService, EventAggregator)
export class TagView {
  //
  constructor(PostService, EventAggregator) {
    this.postService = PostService;
    this.ea = EventAggregator;
  }

  //activate(): to fetch info from the get-params from the url
  activate(params) {
    this.error = "";
    //postsByTag() from PostService
    this.tag = params.tag;
    this.title = `Viewing posts from ${this.tag}`;
    this.postService
      .postsByTag(this.tag)
      .then(data => {
        this.posts = data.posts;
      })
      .catch(error => {
        //the error in this view-model = the error from the promise on the backend
        //this.error = error.message;
        this.ea.publish('bread', {
          type: 'error',
          message: error.message
        })
      });
  }
}
