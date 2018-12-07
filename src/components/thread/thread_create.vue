<template>
	<section class="section">
         <div class="container">
         <div class="columns">
            <div class="column is-three-fifths">
               <nav class="breadcrumb" aria-label="breadcrumbs">
                  <ul>
                     <li><a href="index.html">Home</a></li>
                     <li class="is-active"><a href="#" aria-current="page">Create Thread</a></li>
                  </ul>
               </nav>
               <!-- list thread -->
               <div class="box">
                  <div class="content">
                     <p class="title is-3">Create New Thread</p>
                     <p class="subtitle is-6">Please tell us what you know .</p>
                     <div class="field">
                        <label class="label">Title</label>
                        <div class="control">                        
                           <input class="input" type="text" placeholder="Title" v-model="title">
                        </div>
                     </div>
                     <div class="field">
                        <label class="label">Tag</label>
                        <div class="control is-expanded">
                           <div class="select is-fullwidth">
                               <select v-model="label_id">
                                <option v-for="tag in tags" :value="tag.label_id">{{tag.label_name}}</option>
                              </select>
                           </div>
                        </div>
                     </div>
                     <div class="field">
                        <label class="label">Description</label>
                        <div class="control">
                           <textarea class="textarea" placeholder="Write content here" v-model="description"></textarea>
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
                           <span class="file-name">
                           {{filename}}
                           </span>
                           </label>
                        </div>
                     </div>
                     <br>
                     <div class="field is-grouped">
                        <div class="control">
                           <a @click="createThread" class="button is-success"><span class="icon">
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
	export default{
		name: 'thread_create',
		data(){
			return {
				user_id: this.$route.params.user_id,
            tags: [],
            label_id: null,
            title: '',
            description: '',
            image: null,
            filename: '',
			}
		},
		methods: {
			gotoHome: function(){
				this.$router.push({ path: `/u/${this.user_id}/home` })
			},
         fetchTag: function(){
            this.$http.get('http://slim.amicloud.me/public/api/tags')
               .then(function(response){
                  this.tags = response.body;
                  console.log(this.tags);
               });
         },
         uploadPhoto: function(e){
            this.filename = e.target.files[0].name;
            var reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])

            reader.onload = (e) => {
               this.image = e.target.result
            }
         },
         createThread: function(){
            let dataForm = {
               user_id: this.$route.params.user_id,
               title: this.title,
               label_id: this.label_id,
               content_text: this.description,
               img_path: this.image,
            }

            this.$http.post('http://slim.amicloud.me/public/api/thread/add', dataForm)
               .then(function(response){
                  console.log("thread created");
                  this.$router.push({path: `/u/${this.$route.params.user_id}/home`});
               });
         }
		},

      created: function(){
         this.fetchTag();
      }
	}
	
</script>