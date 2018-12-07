<template>
            <section class="section">
               <div class="container">
                  <div class="columns">
                     <div class="column is-three-quarters">
                        <!-- detail thread -->
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
                                    </p>
                                    {{thread.content_text}}
                                    <p>
                                    </p>
                                    <img v-show="show" :src="thread.img_path">
                                 </div>
                              </div>
                           </article>
                           <article class="media" v-for="comment in comments">
                              <div class="media-left">
                                 <figure class="image is-48x48">
                                    <img :src="comment.user_photo" alt="Image">
                                 </figure>
                              </div>
                              <div class="media-content">
                                 <div class="content">
                                    <p>
                                       <strong>{{comment.name}}</strong> <small>date</small>
                                       <br>
                                       {{comment.comment}}       
                                    </p>
                                 </div>
                              </div>
                           </article>
                        </div>
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
                              show: '',
                              comment_text: '',
                        }
                  },
                  methods: {
                        fetchThread: function(id){
                              this.$http.get('http://slim.amicloud.me/public/api/thread/'+id)
                                    .then(function(response){
                                          this.thread = response.body;
                                          if(this.thread.img_path == ''){
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
                                    });
                        },
                  },
                  created: function(){
                        this.fetchThread(this.$route.params.post_id);
                        this.fetchComment(this.$route.params.post_id);
                  }
            }
         </script>