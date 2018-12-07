<template>
<section class="section">
      <div class="container">
      <div class="columns">
            <div class="column is-three-quarters">            
            <div class="box">
                  <article class="media">
                  <div class="media-content">
                        <div class="content">
                        <p class="title is-4" style="margin-bottom: 34px">{{thread.title}}</p>
                        <p class="subtitle is-6" style="color: #ACACAC"><span class="tag is-link">{{thread.label_name}}</span>
                        </p>
                        </div>
                  </div>
                  </article>

                  <article class="media">
                  <div class="media-left">
                        <figure class="image is-48x48">
                        <img :src="thread.user_photo" alt="Image">
                        </figure>
                  </div>
                  <div class="media-content">
                        <div class="content">
                        <p>
                              <strong>{{thread.name}}</strong><br><small>{{thread.date}}</small>
                        </p>  {{thread.content_text}}
                        <p>
                        </p>
                        <img v-show="show" :src="thread.img_path">
                        </div>
                  </div>

                  <!-- report author -->
                  <div class="media-right" v-show="this.checkReportAuthor()">
                        <p class="control">
                        <a @click="gotoReportPost(thread.post_id)" class="button is-white">
                        <span class="icon" style="color: #999;">
                        <i class="fa fa-flag"></i>
                        </span>
                        </a>
                        </p>
                  </div>
                  <!-- end report author -->

                  </article>

                  <article class="media">
                  <div class="media-left">
                        <p>Comments</p>
                  </div>
                  </article>

                  <!-- user comment -->
                  <article class="media" v-for="comment in comments">
                  <div class="media-left">
                        <figure class="image is-48x48">
                        <img :src="comment.user_photo" alt="Image">
                        </figure>
                  </div>
                  <div class="media-content">
                        <div class="content">
                        <p>
                              <strong>{{comment.name}}</strong> <small>{{thread.date}}</small>
                              <br>{{comment.comment}}       
                        </p>
                        </div>
                  </div>

                  <!-- more option -->
                  <div class="media-right" v-show="checkCommentAuthor(comment.user_id)">
                        <div class="navbar-item has-dropdown is-hoverable">
                        <div class="navbar-link">                                  
                        </div>
                        <div class="navbar-dropdown is-boxed">
                              <a @click="gotoEditComment(comment.comments_id)" class="button is-white">
                              <span class="icon" style="color: #999;">
                              <i class="fa fa-pencil"></i>
                              </span>
                              <span>Edit Comment</span>
                              </a>
                              <br>
                              <a @click="gotoDeleteComment(comment.comments_id)" class="button is-white">
                              <span class="icon" style="color: #999;">
                              <i class="fa fa-trash"></i>
                              </span>
                              <span>Delete Comment</span>
                              </a>                              
                        </div>
                        </div>
                  </div>
                  <!-- end more option -->

                  <!-- report comment -->
                  <div class="media-right" v-show="checkReportComment(comment.user_id)">
                        <p class="control">
                        <a @click="gotoReportComment(comment.comments_id)" class="button is-white">
                        <span class="icon" style="color: #999;">
                        <i class="fa fa-flag"></i>
                        </span>
                        </a>
                        </p>
                  </div>
                  <!-- report comment -->

                  </article>
                  <!-- end user comment -->

                  <!-- write comment -->
                  <article class="media">
                  <figure class="media-left">
                        <p class="image is-48x48">
                        <img :src="user.user_photo">
                        </p>
                  </figure>
                  <div class="media-content">
                        <div class="field">
                        <p class="control">
                              <textarea class="textarea" placeholder="Add a comment..." v-model="comment_text"></textarea>
                        </p>
                        </div>
                        <div class="field">
                        <p class="control">
                              <button class="button is-info" @click="submitComment">Post comment</button>
                        </p>
                        </div>
                  </div>
                  </article>
                  <!-- end write comment -->

            </div>
            </div>

            <div class="column">

            <!-- something else? -->
            <div class="box" v-show="this.checkThreadAuthor()">
                  <div class="content">
                  <p class="title is-4">Something else?</p>
                  <div class="field is-grouped">
                        <p class="control">
                        <a @click="editThread" class="button is-success"><span class="icon">
                        <i class="fa fa-pencil"></i>
                        </span>
                        <span>Edit Thread</span>
                        </a>
                        </p>
                        <p class="control">
                        <a @click="deleteThread" class="button is-danger">
                        <span class="icon">
                        <i class="fa fa-trash"></i>
                        </span>
                        <span>Delete</span>
                        </a>
                        </p>
                  </div>
                  </div>
            </div>
            <!-- end something else? -->

            </div>

      </div>
      </div>
</section>
</template>
<script>
export default {
      name: 'thread_detail',
      data(){
            return {
                  thread: {},
                  comments: [],
                  user: {},
                  show: '',
                  comment_text: '',
            }
      },
      methods: {
            fetchUser: function(id){
                  this.$http.get('http://slim.amicloud.me/public/api/user/'+id)
                        .then(function(response){
                              this.user = response.body;
                        });
                  },
            fetchThread: function(id){
                  this.$http.get('http://slim.amicloud.me/public/api/thread/'+id)
                        .then(function(response){
                              this.thread = response.body;
                              if(this.thread.img_path == 'data:image/png;base64,'){
                                    this.show = false;
                              } else {
                                    this.show = true;
                              }
                        });
            },
            fetchComment: function(id){
                  this.$http.get('http://slim.amicloud.me/public/api/comment/'+id)
                        .then(function(response){
                              this.comments = response.body;
                  console.log(this.comments);
                        });
            },
            editThread: function(){
                  this.$router.push({path: `/u/${this.$route.params.user_id}/thread/edit/${this.$route.params.post_id}`});
            },
            deleteThread: function(){
                  this.$router.push({path: `/u/${this.$route.params.user_id}/thread/delete/${this.$route.params.post_id}`});
            },
            submitComment: function(){
                  let commentData = {
                        user_id: this.$route.params.user_id,
                        post_id: this.$route.params.post_id,
                        comment: this.comment_text,
                  }

                  this.$http.post('http://slim.amicloud.me/public/api/comment/add', commentData)
                        .then(function(response){
                              console.log('Comment Added');
                              location.reload();
                        });
            },
            checkCommentAuthor:function(comen_id){
                  if(this.user.user_id == comen_id){
                        return true;
                  } else {
                        return false;
                  }
            },
            checkThreadAuthor:function(){
                  if(this.user.user_id == this.thread.user_id){
                        return true;
                  } else {
                        return false;
                  }
            },
            checkReportAuthor:function(){
                  if(this.user.user_id == this.thread.user_id){
                        return false;
                  } else {
                        return true;
                  }
            },
            checkReportComment:function(comen_id){
                  if(this.user.user_id == comen_id){
                        return false;
                  } else {
                        return true;
                  }
            },
            gotoEditComment:function(id){
                  this.$router.push({path: `/u/${this.$route.params.user_id}/t/${this.$route.params.post_id}/comment/edit/` + id});
            },
            gotoDeleteComment:function(id){
                  this.$router.push({path: `/u/${this.$route.params.user_id}/t/${this.$route.params.post_id}/comment/delete/` + id});
            },
            gotoReportPost:function(idpost){
                  this.$router.push({path: `/u/${this.$route.params.user_id}/report/p/` + idpost});
            },
            gotoReportComment:function(idcomment){
                  this.$router.push({path: `/u/${this.$route.params.user_id}/report/c/` + idcomment});
            },
      },
      computed: {

      },
      created: function(){
            this.fetchThread(this.$route.params.post_id);
            this.fetchComment(this.$route.params.post_id);
            this.fetchUser(this.$route.params.user_id);
      }
}
</script>