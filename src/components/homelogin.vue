<template>
	<section class="section">
         <div class="container">
            <div class="columns">
               <div class="column is-three-quarters">
                  <!-- carousel -->
                  <!-- <div class='carousel' style="margin-bottom: 30px">
                     <div class='carousel-container'>
                        <div class='carousel-content carousel-animate carousel-animate-slide'>
                           <div class='carousel-item' v-for="announcement in dataAnnouncement">
                              <img class="is-background" :src="announcement.img_path" alt="" />
                           </div>
                        </div> -->
                        <!-- image navigation -->
                        <!-- <div class="carousel-nav-left">
                           <i class="fa fa-chevron-left" aria-hidden="true"></i>
                        </div>
                        <div class="carousel-nav-right">
                           <i class="fa fa-chevron-right" aria-hidden="true"></i>
                        </div>
                     </div>
                  </div> -->
                  <!-- end carousel -->

                  <!-- list thread -->
                  <div class="box">
                     <div class="content">
                        <p class="title is-5">Most Recent</p>
                     </div>
                     <article class="media" v-for="thread in dataThread.slice(0, 1)" v-if="dataThread === 'No Thread Found'">
                        <div class="media-content">
                            <div class="content">
                              <p class="title is-4" style="margin-bottom: 34px"> NO THREAD FOUND </p>
                            </div>
                        </div>
                     </article>
                     <article class="media" v-for="thread in dataThread.slice(0, 5)" v-else>
                        <div class="media-content">
                            <div class="content">
                              <p class="title is-4" style="margin-bottom: 34px"><a @click="detailThread(thread.post_id)">{{thread.title}}</a></p>
                              <p class="subtitle is-6" style="color: #ACACAC"><span class="tag is-link">{{thread.label_name}}</span>
                                 <small>By: {{thread.user_id.name}}</small> ᛫ <small>Comment: {{thread.comment_count}}</small> ᛫ <small>Uploaded: {{thread.date}}</small>
                              </p>
                            </div>
                        </div>
                     </article>
                  </div>
               </div>
               <div class="column">
                  <!-- search box -->
                 <!--  <div class="field">
                     <p class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="Search">
                        <span class="icon is-small is-left">
                        <i class="fa fa-search"></i>
                        </span>                
                     </p>
                  </div> -->
                  <!-- new thread -->
                  <div class="box">
                     <div class="content">
                        <p class="title is-3">Hello!</p>
                        <p class="subtitle is-6">Do you have any idea and question? please share to us your thread.</p>
                        <a @click="createThread" class="button is-success"><span class="icon">
                        <i class="fa fa-pencil-square-o"></i>
                        </span>
                        <span>New Thread</span>
                        </a>
                     </div>
                  </div>
                  <!-- categories -->
                  <div class="box">
                     <div class="content">
                        <p class="title is-5">Categories</p>
                        <div class="field is-grouped is-grouped-multiline">
                           <div class="control">
                              <div class="tags has-addons">
                                 <a class="tag is-link" v-on:click="searchByTag('Kampus')">Kampus</a>
                              </div>
                           </div>
                           <div class="control">
                              <div class="tags has-addons">
                                 <a class="tag is-link" v-on:click="searchByTag('Fasilitas')">Fasilitas</a>
                              </div>
                           </div>
                           <div class="control">
                              <div class="tags has-addons">
                                 <a class="tag is-link" v-on:click="searchByTag('Acara')">Acara</a>
                              </div>
                           </div>
                           <div class="control">
                              <div class="tags has-addons">
                                 <a class="tag is-link" v-on:click="searchByTag('Lowongan')">Lowongan</a>
                              </div>
                           </div>
                           <div class="control">
                              <div class="tags has-addons">
                                 <a class="tag is-link" v-on:click="searchByTag('Seminar')">Seminar</a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
</template>

<script>
	export default {
		name: 'home',
		data(){
			return {
				dataThread:[],
				dataAnnouncement: [],
            user_id: this.$route.params.user_id
			}
		},
		methods: {
			fetchThread: function(){
				this.$http.get('http://slim.amicloud.me/public/api/thread')
					.then(function(response){
						this.dataThread = response.body;
					});
			},
			fetchAnnouncement: function(){
				this.$http.get('http://slim.amicloud.me/public/api/announcement')
					.then(function(response){
						this.dataAnnouncement = response.body;
					});
			},
         createThread: function(){
            this.$router.push({path: `/u/${this.user_id}/thread/create`});
         },
         searchByTag: function(tag){
            this.$http.get('http://slim.amicloud.me/public/api/label_thread/' + tag)
               .then(function(response){
                  this.dataThread = response.body;
               });
         },
         detailThread: function(id){
            this.$router.push({path: `/u/${this.$route.params.user_id}/thread/` + id});
         }    
	   },
      created: function(){
         this.fetchThread();
         this.fetchAnnouncement();
      }
   }
</script>