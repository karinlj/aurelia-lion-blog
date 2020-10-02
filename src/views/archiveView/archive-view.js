import { inject } from "aurelia-framework";
import { PostService } from "../../services/post-service";
import { EventAggregator } from "aurelia-event-aggregator";


//@inject: for using dependency injection for using the same instance of PostService everywhere
@inject(PostService, EventAggregator)
export class ArchiveView {
  //
  constructor(PostService, EventAggregator) {
    this.postService = PostService;
    this.ea = EventAggregator;
  }

  //activate(): to fetch info from the get-params from the url
  activate(params) {
    this.error = "";
    //postsByArchive() from PostService
    this.archive = params.archive;
    this.postService
      .postsByArchive(this.archive)
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
