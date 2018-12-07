<template>
	<section class="section">
         <div class="container">
            <div class="columns">
               <div class="column is-three-fifths">
                  <nav class="breadcrumb" aria-label="breadcrumbs">
                     <ul>
                        <li><a href="groups.html">Groups</a></li>
                        <li><a href=" group_detail.html">Ubuntu Linux ..</a></li>
                        <li class="is-active"><a href="#" aria-current="page">Edit Group</a></li>
                     </ul>
                  </nav>
                  <!-- edit thread -->
                  <div class="box">
                     <p class="title is-3">Edit My Group</p>
                     <div class="field">
                        <div class="control">
                           <label class="label">Group Photo</label>
                           <figure class="image is-96x96">
                              <img :src="detailGroup.logo">
                           </figure>
                        </div>
                     </div>
                     <div class="content">
                        <!-- start edit -->
                        <div class="field">
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
                        <div class="field">
                           <label class="label">Group Name</label>
                           <div class="control has-icons-left">           
                              <input class="input" type="text" v-model="detailGroup.name">
                              <span class="icon is-small is-left">
                              <i class="fa fa-users"></i>
                              </span>
                           </div>
                        </div>
                        <div class="field">
                           <label class="label">Group Info</label>
                           <div class="control">           
                              <textarea class="textarea" placeholder="Enter your group description" v-model="detailGroup.description"></textarea>         
                           </div>
                        </div>
                        <div class="field">
                           <label class="label">Website Link</label>
                           <div class="control has-icons-left">           
                              <input class="input" type="text" v-model="detailGroup.web_url">
                              <span class="icon is-small is-left">
                              <i class="fa fa-facebook-square"></i>
                              </span>
                           </div>
                        </div>
                        <!-- finish edit -->
                        <br>
                        <div class="field is-grouped">
                           <div class="control">
                              <a @click="updateGroup" class="button is-success"><span class="icon">
                              <i class="fa fa-floppy-o"></i>
                              </span>
                              <span>Save Changes</span>
                              </a>
                           </div>
                           <div class="control">
                              <a @click="gotoDetailGroup" class="button is-light">
                              <span>Cancel</span>
                              </a>
                           </div>
                           <div class="control">
                              <a @click="deleteGroup" class="button is-danger"><span class="icon">
                              <i class="fa fa-trash"></i>
                              </span>
                              <span>Delete Group</span>
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
		name: 'group_edit',
		data(){
			return {
				detailGroup: {},
            filename: '',
			}
		},
		methods: {
			fetchDetailGroup: function(){
				this.$http.get('http://slim.amicloud.me/public/api/group/' + this.$route.params.group_id)
      				.then(function(response){
      					this.detailGroup = response.body;
				});
			},
			gotoDetailGroup:function(){
				this.$router.push({path: `/u/${this.$route.params.user_id}/group/detail/` + this.$route.params.group_id});
			},
			updateGroup:function(){
				if(!this.detailGroup.name || !this.detailGroup.description || !this.detailGroup.logo){
					console.log("Diisi dulu buos");
				} else {
					let upGroup = {
						group_name: this.detailGroup.name,
						logo: this.detailGroup.logo,
						description: this.detailGroup.description,
						web_url: this.detailGroup.web_url,
					}

					this.$http.put('http://slim.amicloud.me/public/api/group/update/' + this.$route.params.group_id, upGroup)
						.then(function(response){
							console.log("group updated");
							this.$router.push({path: `/u/${this.$route.params.user_id}/group/detail/${this.$route.params.group_id}`});
						});
				}
			},
			uploadPhoto: function(e){
               this.filename = e.target.files[0].name;
            	var reader = new FileReader()
            	reader.readAsDataURL(e.target.files[0])

            	reader.onload = (e) => {
               		this.detailGroup.logo = e.target.result
            	}
      		},
      		deleteGroup:function(){
      			this.$router.push({path: `/u/${this.$route.params.user_id}/group/delete/${this.$route.params.group_id}`});
      		}
		},
		created:function(){
			this.fetchDetailGroup();
		}
	}
</script>