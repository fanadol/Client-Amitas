<template>
	<section class="section">
         <div class="container">
         <div class="columns">
            <div class="column is-three-fifths">
               <nav class="breadcrumb" aria-label="breadcrumbs">
                  <ul>
                     <li><a href="#">Home</a></li>
                     <li class="is-active"><a href="#" aria-current="page">Create Announcement</a></li>
                  </ul>
               </nav>
               <!-- list thread -->
               <div class="box">
                  <div class="content">
                     <p class="title is-3">Create New Announcement</p>
                     <p class="subtitle is-6">Please tell us what you know .</p>
                     <div class="field">
                        <label class="label">Title</label>
                        <div class="control">                        
                           <input class="input" type="text" placeholder="Title" v-model="an_title">
                        </div>
                     </div>
                     <div class="field">
                        <label class="label">Category</label>
                        <div class="control is-expanded">
                           <div class="select is-fullwidth">
                              <select v-model="an_label">
                                <option v-for="tag in tags" :value="tag.label_id">{{tag.label_name}}</option>
                              </select>
                           </div>
                        </div>
                     </div>
                     <div class="field">
                        <label class="label">Description</label>
                        <div class="control">
                           <textarea class="textarea" placeholder="Write content here" v-model="an_description"></textarea>
                        </div>
                     </div>
                     <div class="field">
                        <label class="label">Upload Image</label>
                        <div class="file has-name is-fullwidth">
                           <label class="file-label">
                           <input class="file-input" type="file" @change="uploadPhoto">
                           <span class="file-cta">
                           <span class="file-icon">
                           <i class="fa fa-upload"></i>
                           </span>
                           <span class="file-label">
                           Choose a photo…
                           </span>
                           </span>
                           </label>
                        </div>
                     </div>
                     <div class="field">
                        <label class="label">Upload Banner Image</label>
                        <div class="file has-name is-fullwidth">
                           <label class="file-label">
                           <input class="file-input" type="file" @change="uploadBanner">
                           <span class="file-cta">
                           <span class="file-icon">
                           <i class="fa fa-upload"></i>
                           </span>
                           <span class="file-label">
                           Choose a photo…
                           </span>
                           </span>
                           </label>
                        </div>
                     </div>
                     <br>
                     <div class="field is-grouped">
                        <div class="control">
                           <a @click="createAnnouncement" class="button is-success"><span class="icon">
                           <i class="fa fa-paper-plane"></i>
                           </span>
                           <span>Submit</span>
                           </a>
                        </div>
                        <div class="control">
                           <a @click="gotoHome" class="button is-light">
                           <span>Cancel</span>
                           </a>
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
		name: 'newAnnouncement',
		data(){
			return {
				an_description: '',
				an_title: '',
				an_label: '',
				tags: [],
            image: '',
            banner: '',
			}
		},
		methods: {
			fetchTag: function(){
            this.$http.get('http://slim.amicloud.me/public/api/tags')
               .then(function(response){
                  this.tags = response.body;
               });
         	},
            uploadPhoto: function(e){

               var reader = new FileReader()
               reader.readAsDataURL(e.target.files[0])

               reader.onload = (e) => {
                  this.image = e.target.result
                  }
            },
            uploadBanner: function(e){

               var reader = new FileReader()
               reader.readAsDataURL(e.target.files[0])

               reader.onload = (e) => {
                  this.banner = e.target.result
               }
            },
            createAnnouncement:function(){
               if(this.an_description == '' || this.an_title == '' || this.an_label == '' || this.image == '' || this.banner == ''){
                  console.log("Please fill all available forms");
               } else {
                  let dataForm = {
                  user_id: this.$route.params.user_id,
                  title: this.an_title,
                  label_id: this.an_label,
                  content_text: this.an_description,
                  img_path: this.image,
                  banner: this.banner,

                  }

                  this.$http.post('http://slim.amicloud.me/public/api/announcement/add', dataForm)
                     .then(function(response){
                        console.log("announcement created");
                        this.$router.push({path: `/u/${this.$route.params.user_id}/home`});
                     });
                  }
            },
            gotoHome:function(){
               this.$router.push({path: `/u/${this.$route.params.user_id}/home`});
            },
		},
      created:function(){
         this.fetchTag();
      }
	}
</script>