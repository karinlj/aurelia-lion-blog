import { inject } from "aurelia-framework";
import { AuthService } from "../../services/auth-service";
import { PostService } from "../../services/post-service";
import { EventAggregator } from "aurelia-event-aggregator";

@inject(EventAggregator, AuthService, PostService)
export class Sidebar {
  constructor(EventAggregator, AuthService, PostService) {
    this.ea = EventAggregator;
    this.postService = PostService;
    this.authService = AuthService;
  }

  //when we attach this comp
  attached() {
    this.updateSidebar();
    //when the post is updated, lets update the sidebar
    this.postSubscription = this.ea.subscribe("post-updated", updatedAt => {
      //getting the time here
      // console.log("subscribe");
      this.updateSidebar();
    });
  }

  updateSidebar() {
    //allTags() and allArchives() from post-service.js
    this.postService
      .allTags()
      .then(data => {
        this.tags = data.tags;
      })
      .catch(error => {
        //this.error = error.message;
        //error message with toastr
        this.ea.publish('bread', {
          type: 'error',
          message: error.message
        });
      });

    this.postService
      .allArchives()
      .then(data => {
        this.archives = data.archives;
      })
      .catch(error => {
        // this.error = error.message;
        //error message with toastr
        this.ea.publish('bread', {
          type: 'error',
          message: error.message
        });
      });
  }

  //when we detach this comp 
  detached() {
    //throw away the subscription
    this.postSubscription.dispose();
    // this.userSubscribition.dispose();
    //this.breadSubscribition.dispose();
  }
}
