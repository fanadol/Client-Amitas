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
                              <img :src="announcement.img_path">
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
                  <!-- <div class="field">
                     <p class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="Search">
                        <span class="icon is-small is-left">
                        <i class="fa fa-search"></i>
                        </span>                
                     </p>
                  </div> -->
                  <!-- categories -->
                  <div class="box">
                     <div class="content">
                        <p class="title is-5">Categories</p>
                        <div class="field is-grouped is-grouped-multiline">
                           <div class="control">
                              <div class="tags has-addons">
                                 <a class="tag is-link" v-on:click="searchTag('Kampus')">Kampus</a>
                                 <span class="tag is-info"></span>
                              </div>
                           </div>
                           <div class="control">
                              <div class="tags has-addons">
                                 <a class="tag is-link" v-on:click="searchTag('Fasilitas')">Fasilitas</a>
                                 <span class="tag is-info"></span>
                              </div>
                           </div>
                           <div class="control">
                              <div class="tags has-addons">
                                 <a class="tag is-link" v-on:click="searchTag('Acara')">Acara</a>
                                 <span class="tag is-info"></span>
                              </div>
                           </div>
                           <div class="control">
                              <div class="tags has-addons">
                                 <a class="tag is-link" v-on:click="searchTag('Lowongan')">Lowongan</a>
                                 <span class="tag is-info"></span>
                              </div>
                           </div>
                           <div class="control">
                              <div class="tags has-addons">
                                 <a class="tag is-link" v-on:click="searchTag('Seminar')">Seminar</a>
                                 <span class="tag is-info"></span>
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
   import { Carousel, Slide } from 'vue-carousel';

	export default {
      components: {
         Carousel,
         Slide,
      },
		name: 'home',
		data(){
			return {
				dataThread:[],
				dataAnnouncement: [],
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
         searchTag: function(tag){
            this.$http.get('http://slim.amicloud.me/public/api/label_thread/' + tag)
               .then(function(response){
                  this.dataThread = response.body;
               });
         },
         detailThread: function(id){
            this.$router.push({path: `/u/thread/` + id});
         },
          
		},
      computed: {

      },
		created: function(){
			this.fetchThread();
			this.fetchAnnouncement();
		}

	}
</script>