<template>
    <section class="section">
       <div class="container">
          <div class="columns">
             <!-- about group -->
             <div class="column is-one-quarter">
                <div class="box has-text-centered">
                   <div class="content">
                      <p class="level-item has-text-centered">
                         <img :src="detailGroup.logo" alt="group_logo" style="height: 96px;">
                      </p>
                   </div>
                   <div class="content">
                      <p class="title is-4" style="margin-bottom: 34px">{{detailGroup.name}}</p>
                      <p class="subtitle is-6">{{detailGroup.description}}</p>
                   </div>
                   <div class="content">
                      <p class="level-item has-text-centered">
                         <a @click="gotoEditGroup" class="button is-success is-outlined" v-show="this.checkAdmin()"><span class="icon">
                         <i class="fa fa-pencil"></i>
                         </span>
                         <span>Edit Group</span>
                         </a>
                      </p>
                   </div>
                   <div class="content">
                      <p class="level-item has-text-centered">
                         <a @click="gotoLeaveGroup" class="button is-danger is-outlined" v-show="this.checkMember()">
                         <span class="icon is-small">
                         <i class="fa fa-sign-out"></i>
                         </span>
                         <span>Leave Group</span>
                         </a>
                      </p>
                   </div>
                </div>
                <!-- group information -->
                <div class="box">
                   <aside class="menu">
                      <p class="menu-label">
                         Group Information
                      </p>
                      <ul class="menu-list">
                         <li>
                            <a @click="gotoMemberList">
                            <span class="icon">
                            <i class="fa fa-user-o"></i>
                            </span>
                            <span>{{anggota.Jumlah_Anggota}} Members</span>
                            </a>
                         </li>
                         <li>
                            <a @click="openUrl()">
                            <span class="icon">
                            <i class="fa fa-globe"></i>
                            </span>
                            <span>Social Link</span>
                            </a>
                         </li>
                      </ul>
                   </aside>
                </div>
             </div>
             <!-- end about group -->
             <div class="column is-two-fifths">
                <!-- write post -->
                <div class="box">
                   <article class="media">
                      <figure class="media-left">
                         <p class="image is-64x64">
                            <img :src="user_data.user_photo">
                         </p>
                      </figure>
                      <div class="media-content">
                         <div class="field">
                            <p class="control">
                               <textarea class="textarea" placeholder="What do you want to share?" rows="3" v-model="newStatus"></textarea>
                            </p>
                         </div>
                         <nav class="level-right">
                            <div class="level-item">
                               <a class="button is-info" @click="postStatusGroup">Post</a>
                            </div>
                         </nav>
                      </div>
                   </article>
                </div>
                <!-- write post -->
                <div class="columns is-multiline is-mobile">
                   <div class="column is-12">
                      <!-- post timeline -->
                      <div class="box" v-for="post in postGroup">
                         <!-- member post -->
                         <article class="media">
                            <figure class="media-left">
                               <p class="image is-48x48">
                                  <img :src="post.user_id.user_photo">
                               </p>
                            </figure>
                            <div class="media-content">
                               <div class="content">
                                  <p>
                                     <strong>{{post.user_id.name}}</strong>
                                     <small>Date</small>
                                     <br>{{post.content_text}} 
                                  </p>
                               </div>
                            </div>
                            <!-- more option -->
                            <div class="media-right">
                               <div class="navbar-item has-dropdown is-hoverable" v-show="checkPostAuthor(post.user_id.user_id)">
                                  <div class="navbar-link">                                  
                                  </div>
                                  <div class="navbar-dropdown is-boxed">
                                     <a @click="gotoEditPost(post.post_id)" class="button is-white">
                                     <span class="icon" style="color: #999;">
                                     <i class="fa fa-pencil"></i>
                                     </span>
                                     <span>Edit Post</span>
                                     </a>
                                     <br>
                                     <a @click="gotoDeletePost(post.post_id)" class="button is-white">
                                     <span class="icon" style="color: #999;">
                                     <i class="fa fa-trash"></i>
                                     </span>
                                     <span>Delete Post</span>
                                     </a>
                                  </div>
                               </div>
                            </div>
                            <!-- end more option -->
                         </article>
                         <!-- end member post -->
                         <article class="media" v-show="checkAvailableComment()">
                            <div class="media-left">
                               <p>Comments</p>
                            </div>
                         </article>
                         <!-- all user comment -->
                         <article class="media" v-for="comn in fetchCommentGroup(post.post_id)">
                            <figure class="media-left">
                               <p class="image is-48x48">
                                  <img :src="comn.user_photo">
                               </p>
                            </figure>
                            <div class="media-content">
                               <div class="content">
                                  <p>
                                     <strong>{{comn.name}} </strong>
                                     <small>03-11-0213</small>
                                     <br>
                                     {{comn.comment}}             
                                  </p>
                               </div>
                            </div>

                            <!-- edit / delete comment -->
                            <div class="media-right" v-show="checkCommentEdit(comn.user_id)">
                                  <div class="navbar-item has-dropdown is-hoverable">
                                  <div class="navbar-link">                                  
                                  </div>
                                  <div class="navbar-dropdown is-boxed">
                                        <a @click="gotoEditComment(comn.comments_id)" class="button is-white">
                                        <span class="icon" style="color: #999;">
                                        <i class="fa fa-pencil"></i>
                                        </span>
                                        <span>Edit Comment</span>
                                        </a>
                                        <br>
                                        <a @click="gotoDeleteComment(comn.comments_id)" class="button is-white">
                                        <span class="icon" style="color: #999;">
                                        <i class="fa fa-trash"></i>
                                        </span>
                                        <span>Delete Comment</span>
                                        </a>                              
                                  </div>
                                  </div>
                            </div>
                            <!-- end edit / delete comment -->

                            <!-- report comment -->
                            <div class="media-right" v-show="checkCommentReport(comn.user_id)">
                                <p class="control">
                                <a @click="gotoReportComment(comn.comments_id)" class="button is-white">
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
                                  <img :src="user_data.user_photo">
                               </p>
                            </figure>
                            <div class="media-content">
                               <div class="field">
                                  <p class="control">
                                     <textarea class="textarea" placeholder="Add a comment..." rows="1" v-model="comment_content"></textarea>
                                  </p>
                               </div>
                               <div class="field">
                                  <p class="control">
                                     <button class="button" @click="postComment(post.post_id)">Post comment</button>
                                  </p>
                               </div>
                            </div>
                         </article>
                         <!-- end write comment -->
                      </div>
                      <!-- end post timeline -->
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>
 </template>
 <script>
    export default {
      name: 'group_detail',
      data(){
        return {
          detailGroup: {},
          anggota: {},
          user_data: {},
          postGroup: [],
          commentGroup: [],
          comment_content: '',
          newStatus: null,
          index: 0,
          listpostid: [],
        }
      },
      methods: {
         openUrl () {
             location.href = this.detailGroup.web_url,          
             window.open(location.href, '_blank');
           },         
        fetchDetailGroup: function(){
          this.$http.get('http://slim.amicloud.me/public/api/group/' + this.$route.params.group_id)
                   .then(function(response){
                       this.detailGroup = response.body;
            });
        },
        fetchUser:function(){
          this.$http.get('http://slim.amicloud.me/public/api/user/'+ this.$route.params.user_id)
                   .then(function(response){
                       this.user_data = response.body;
            });
        },
        fetchPostGroup:function(){
          this.$http.get('http://slim.amicloud.me/public/api/group/post/'+ this.$route.params.group_id)
                   .then(function(response){
                       this.postGroup = response.body;
                       // for (var i = 0; i < this.postGroup.length; i++) {
                       //    this.listpostid[i] = this.postGroup[i].post_id;
                       // }
            });
        },
         fetchCountAnggota:function(){
           this.$http.get('http://slim.amicloud.me/public/api/group/member/'+ this.$route.params.group_id)
                   .then(function(response){
                       this.anggota = response.body;
                       // for (var i = 0; i < this.postGroup.length; i++) {
                       //    this.listpostid[i] = this.postGroup[i].post_id;
                       // }
             });
         },
        fetchCommentGroup: function(idpost){
               this.$http.get('http://slim.amicloud.me/public/api/comment/'+ idpost)
                    .then(function(response){
                       this.commentGroup = response.body;
                    });
                    return this.commentGroup;
        },
         postStatusGroup:function(){
           if(this.newStatus == null){
               console.log("Isi dulu statusnya");
           } else {
               let postStatus = {
                 postStatus: this.newStatus,
                 user_id: this.$route.params.user_id,
                 group_id: this.$route.params.group_id,
    
           }
             this.$http.post('http://slim.amicloud.me/public/api/group/posting', postStatus)
               .then(function(response){
                 console.log("Post Berhasil");
                 location.reload();
               });
           }
         },
         gotoEditPost:function(id){
             this.$router.push({path: `/u/${this.$route.params.user_id}/group/${this.$route.params.group_id}/edit/post/` + id});
         },
         gotoDeletePost:function(id){
             this.$router.push({path: `/u/${this.$route.params.user_id}/group/${this.$route.params.group_id}/delete/post/` + id});
         },
         checkAdmin:function(){
             if(this.detailGroup.admin == this.user_data.name){
               return true;
             } else {
               return false;
             }
         },
         checkMember:function(){
           if(this.detailGroup.admin == this.user_data.name){
               return false;
             } else {
               return true;
             }
         },
         gotoEditGroup:function(){
             this.$router.push({path: `/u/${this.$route.params.user_id}/group/edit/${this.$route.params.group_id}`});
         },
         gotoLeaveGroup:function(){
             this.$router.push({path: `/u/${this.$route.params.user_id}/group/leave/${this.$route.params.group_id}`});
         },
         postComment:function(post_id){
             if(this.comment_content == ''){
               console.log("Isi dulu komentarnya");
             } else {
               let postingKomentar = {
                   user_id: this.$route.params.user_id,
                   post_id: post_id,
                   comment: this.comment_content,
               }
               this.$http.post('http://slim.amicloud.me/public/api/comment/add', postingKomentar)
                 .then(function(response){
                   location.reload();
                 });
             }
         },
         checkAvailableComment:function(){
             if(this.commentGroup.length == 0){
               return false;
             } else {
               return true;
             }
         },
         gotoMemberList:function(){
             this.$router.push({path: `/u/${this.$route.params.user_id}/group/member_list/${this.$route.params.group_id}`});
         },
         checkPostAuthor:function(post_id){
             if(this.user_data.user_id == post_id){
                return true;
             } else {
                return false;
             }
         },
         checkCommentReport:function(comn_id){
             if(this.user_data.user_id == comn_id){
                return false;
             } else {
                return true;
             }
         },
         checkCommentEdit:function(comn_id){
             if(this.user_data.user_id == comn_id){
                return true;
             } else {
                return false;
             }
         },
         gotoEditComment:function(id){
            this.$router.push({path: `/u/${this.$route.params.user_id}/g/${this.$route.params.group_id}/comment/edit/` + id});
            location.reload();
        },
         gotoDeleteComment:function(id){
            this.$router.push({path: `/u/${this.$route.params.user_id}/g/${this.$route.params.group_id}/comment/delete/` + id});
        },
         gotoReportComment:function(comment_id){
            this.$router.push({path: `/u/${this.$route.params.user_id}/report/c/` + comment_id});
            location.reload();
        }
      },
       computed: {
         
       },
      created: function(){
        this.fetchUser();
        this.fetchDetailGroup();
        this.fetchPostGroup();
        this.fetchCountAnggota();
      },
      mounted: function(){
        //this.fetchCommentGroup();
      }
    }
 </script>