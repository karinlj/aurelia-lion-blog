import { bindable } from "aurelia-framework";
import { inject } from "aurelia-framework";
import { PostService } from "../../../services/post-service";
import { EventAggregator } from "aurelia-event-aggregator";
import {
  ValidationRules,
  ValidationControllerFactory,
  validationMessages
} from "aurelia-validation";

@inject(PostService, EventAggregator, ValidationControllerFactory)
export class PostForm {
  //we will get a title and a post
  @bindable post;
  @bindable title; //   this.title = "Create Post"; i create.js

  constructor(PostService, EventAggregator, ValidationControllerFactory) {
    this.postService = PostService;
    this.ea = EventAggregator;
    this.controller = ValidationControllerFactory.createForCurrentScope();
  }

  attached() {
    //populate all tags
    this.postService
      .allTags()
      .then(data => {
        this.allTags = data.tags;
      })
      .catch(error => {
        //this.error = error.message;
        this.ea.publish('bread', {
          type: 'error',
          message: error.message
        })
      });
  }

  addTag() {
    console.log("allTags-banan", this.allTags);
    this.allTags.push(this.newTag);
    //this.allTags = [...this.allTags, this.newTag];
    this.post.tags.push(this.newTag);
    //this.post.tags = [...this.post.tags, this.newTag];
    this.newTag = "";
  }

  //addTag() {}
  submit() { }

  postChanged(newValue, oldValue) {
    //validation
    //if there is a post
    if (this.post) {
      validationMessages["required"] = `You must enter a \${$displayName}.`;

      ValidationRules
        //ensure that the title is required on the post
        // .ensure("title").required().withMessage("Enter a title, please")

        .ensure("title")
        .displayName("Title")
        .required()
        .minLength(5)

        .ensure("body")
        .displayName("Body")
        .required()

        .on(this.post);

      this.controller.validate();
    }
  }
}
