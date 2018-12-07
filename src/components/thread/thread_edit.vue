<template>
	<section class="section">
         <div class="container">
         <div class="columns">
            <div class="column is-three-fifths">
               <!-- edit thread -->
               <div class="box">
                  <div class="content">
                     <p class="title is-3">Edit Thread</p>
                     <p class="subtitle is-6">Please make some changes.</p>
                     <div class="field">
                        <label class="label">Title</label>
                        <div class="control">
                           <input class="input" type="text" v-model="thread.title">
                        </div>
                     </div>
                     <div class="field">
                        <label class="label">Category</label>
                        <div class="control is-expanded">
                           <div class="select is-fullwidth">
                              <select v-model="thread.label_name">
                                <option v-for="tag in tags" :value="tag.label_name" :is-selected="tag.label_name == 'thread.label_name'">{{tag.label_name}}</option>
                              </select>
                           </div>
                        </div>
                     </div>
                     <div class="field">
                        <label class="label">Description</label>
                        <div class="control">
                           <textarea class="textarea" placeholder="Write content here" rows="5" v-model="thread.content_text"></textarea>
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
                           <a @click="updateThread" class="button is-success"><span class="icon">
                           <i class="fa fa-floppy-o"></i>
                           </span>
                           <span>Save Changes</span>
                           </a>
                        </div>
                        <div class="control">
                           <a @click="gotoDetailThread" class="button is-light">
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
		name: 'thread_edit',
		data(){
			return {
				thread: {},
				tags: [
          {label_name : 'Kampus'},
          {label_name : 'Acara'},
          {label_name : 'Seminar'},
          {label_name : 'Fasilitas'},
          {label_name : 'Lowongan'}
        ],
				label_name: null,
				image: null,
            filename: '',
			}
		},
		methods: {
			fetchThread: function(id){
				this.$http.get('http://slim.amicloud.me/public/api/thread/'+id)
					.then(function(response){
						this.thread = response.body;
					});
			},
			fetchTag: function(){
				this.$http.get('http://slim.amicloud.me/public/api/tags')
					.then(function(response){
						this.tags = response.body;
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
      	updateThread:function(){
      		if(!this.thread.title || !this.thread.content_text || !this.label_name){
				console.log("Please Fill All Required Input!");
			} else {
				let updThread = {
					title: this.thread.title,
					content_text: this.thread.content_text,
					label_id: this.label_name,
					img_path: this.image,
				}

				this.$http.put('http://slim.amicloud.me/public/api/thread/update/' + this.$route.params.post_id, updThread)
				.then(function(response){
					console.log("Thread Updated");
					this.$router.push({path: `/u/${this.$route.params.user_id}/thread/${this.$route.params.post_id}`});
				});
			}
      	},
      	gotoDetailThread:function(){
      		this.$router.push({path: `/u/${this.$route.params.user_id}/thread/${this.$route.params.post_id}`});
      	}
		},
		created: function(){
			this.fetchThread(this.$route.params.post_id);
			this.fetchTag();
		}
	}
</script>