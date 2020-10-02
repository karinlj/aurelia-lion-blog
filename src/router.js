//routes array
export default [
  {
    route: "",
    name: "blog-home",
    moduleId: PLATFORM.moduleName("./views/postsView/posts"),
    title: "All Posts",
  },
  {
    route: "post/:slug",
    name: "single-post",
    moduleId: PLATFORM.moduleName("./views/singleView/single"),
    title: "Single Post",
  },
  {
    route: "tag/:tag",
    name: "tag-view",
    moduleId: PLATFORM.moduleName("./views/tagView/tag-view"),
    title: "View Posts by Tag",
  },
  {
    route: "archive/:archive",
    name: "archive-view",
    moduleId: PLATFORM.moduleName("./views/archiveView/archive-view"),
    title: "View Posts by Archive",
  },
  {
    route: "login",
    name: "login",
    moduleId: PLATFORM.moduleName("./views/login/login"),
    title: "login",
  },
  {
    route: "signup",
    name: "signup",
    moduleId: PLATFORM.moduleName("./views/signup/signup"),
    title: "signup",
  },
  {
    route: "create-post",
    name: "create-post",
    moduleId: PLATFORM.moduleName("./views/createPost/create"),
    title: "create-post",
    settings: { auth: true },
  },
  {
    route: "post/:slug/edit",
    name: "edit-post",
    moduleId: PLATFORM.moduleName("./views/editPost/edit"),
    title: "Edit Post",
    settings: { auth: true },
  },
];
