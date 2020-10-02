import { inject } from 'aurelia-framework';
import { AuthService } from './auth-service';

@inject(AuthService)
export class PostService {
  constructor(AuthService) {
    this.authService = AuthService;
    // Fake a server response delay
    this.delay = 100;
    // Seed post data if it doesn't exist
    if (!this.posts) {
      this.posts = [
        {
          title: 'The wild cats',
          body:
						'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, ',
          author: 'Nick Shallee',
          slug: 'the-wild-cats',
          tags: ['cheetas', 'lions', 'leopards'],
          createdAt: new Date('July 1, 2017')
        },
        {
          title: 'The spotted leopard',
          body:
						'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, ',
          author: 'Jane Doe',
          slug: 'the-spotted-leopard',
          tags: ['lions', 'leopards', 'tiger'],
          createdAt: new Date('August 17, 2017')
        },
        {
          title: 'The majestic lion',
          body:
						'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, ',
          author: 'Nick Shallee',
          slug: 'the-majestic-lion',
          tags: ['lions'],
          createdAt: new Date('December 1, 2017')
        }
      ];
    }
  }

  allPostPreviews() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.posts) {
          let previews = this.posts.map(post => {
            return {
              title: post.title,
              body: post.body.substring(0, 200) + '...', //exerpt: extract letter 0->200
              author: post.author,
              slug: post.slug,
              tags: post.tags,
              createdAt: post.createdAt
            };
          });
          previews.sort((a, b) => b.createdAt - a.createdAt);
          resolve({ posts: previews });
        } else {
          reject(new Error('There was an error retrieving the posts.'));
        }
      }, this.delay);
    });
  }

  allArchives() {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let archives = [];
        this.posts.sort((a, b) => b.createdAt - a.createdAt);
        this.posts.forEach(post => {
          archives.push(`${months[post.createdAt.getMonth()]} ${post.createdAt.getFullYear()}`);
        });
        if (archives) {
          resolve({
            archives: archives.filter((v, i, a) => a.indexOf(v) === i)
          });
        } else {
          reject(new Error('There was an error retrieving the archives.'));
        }
      }, this.delay);
    });
  }

  allTags() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let tags = [];
        this.posts.forEach(post => {
          //tags = tags.concat(post.tags);
          tags = [...tags, ...post.tags];
        });
        if (tags) {
          resolve({ tags: tags.filter((v, i, a) => a.indexOf(v) === i) });
        } else {
          reject(new Error('There was an error retrieving the tags.'));
        }
      }, this.delay);
    });
  }

  create(post) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let currentUser = this.authService.currentUser;
        let slug = this.slugify(post.title);
        if (currentUser) {
          this.posts.push({
            title: post.title,
            body: post.body,
            author: currentUser,
            slug,
            tags: post.tags,
            createdAt: new Date()
          });
          //success
          resolve({ slug });
        } else {
          reject(new Error('You must be logged in to create a post.'));
        }
      }, this.delay);
    });
  }

  find(slug) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let post = this.posts
          .sort((a, b) => b.createdAt - a.createdAt)
          .find(post => post.slug.toLowerCase() === slug.toLowerCase());
        if (post) {
          resolve({ post });
        } else {
          reject(new Error('Post not found.'));
        }
      }, this.delay);
    });
  }

  postsByTag(tag) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.posts) {
          reject(new Error('Error finding posts.'));
        } else {
          resolve({
            posts: this.posts
              .filter(post => post.tags.includes(tag))
              .sort((a, b) => b.createdAt - a.createdAt)
          });
        }
      }, this.delay);
    });
  }

  postsByArchive(archive) {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.posts) {
          reject(new Error('Error finding posts.'));
        } else {
          resolve({
            posts: this.posts
              .filter(post => {
                return (
                  archive === `${months[post.createdAt.getMonth()]} ${post.createdAt.getFullYear()}`
                );
              })
              .sort((a, b) => b.createdAt - a.createdAt)
          });
        }
      }, this.delay);
    });
  }

  slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  update(post) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Get post based on slug and auther
        let toUpdate = this.posts.find(x => {
          return x.slug === post.slug && x.author === this.authService.currentUser;
        });
        if (!toUpdate) {
          reject(new Error('There was an error updating the post.'));
        } else {
          toUpdate = post;
          resolve({ slug: toUpdate.slug });
        }
      }, this.delay);
    });
  }
}
