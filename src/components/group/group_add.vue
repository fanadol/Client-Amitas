<template>
	<section class="section">
         <div class="container" style="width: 700px">
             <!-- new group -->
                  <div class="box">
                     <p class="title is-3">Create New Group</p>                
                     <div class="content">
                        <!-- start edit -->
                        <div class="field">
                           <label class="label">Group Photo</label>
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
                              <input class="input" type="text" placeholder="enter group name" v-model="group_name">
                              <span class="icon is-small is-left">
                              <i class="fa fa-users"></i>
                              </span>
                           </div>
                        </div>
                        <div class="field">
                           <label class="label">Group Info</label>
                           <div class="control">           
                              <textarea class="textarea" placeholder="Enter your group description" v-model="group_info"></textarea>
                           </div>
                        </div>
                        <div class="field">
                           <label class="label">Website Link</label>
                           <div class="control has-icons-left">           
                              <input class="input" type="text" placeholder="enter website url if any"  v-model="website_link">
                              <span class="icon is-small is-left">
                              <i class="fa fa-facebook-square"></i>
                              </span>
                           </div>
                        </div>
                        <!-- finish edit -->
                        <br>
                        <div class="field is-grouped">
                           <div class="control">
                              <a @click="validateCreateGroup" class="button is-success"><span class="icon">
                              <i class="fa fa-paper-plane"></i>
                              </span>
                              <span>Submit</span>
                              </a>
                           </div>
                           <div class="control">
                              <a @click="gotoGroupList" class="button is-light">
                              <span>Cancel</span>
                              </a>
                           </div>
                        </div>
                     </div>
               </div>       
         </div>
      </section>
</template>

<script>
	export default {
		name: 'group_add',
		data(){
			return {
				image: '',
				group_name: null,
				group_info: null,
				website_link: '',
            filename: '',
			}
		},
		methods: {
			uploadPhoto: function(e){
               this.filename = e.target.files[0].name;
            	var reader = new FileReader()
            	reader.readAsDataURL(e.target.files[0])

            	reader.onload = (e) => {
               		this.image = e.target.result
            	}
      		},
      		createGroup:function(){
      			let newGroup = {
               user_id: this.$route.params.user_id,
      			logo: this.image,
					group_name: this.group_name,
					group_info: this.group_info,
					website_link: this.website_link,
      			}

      			this.$http.post('http://slim.amicloud.me/public/api/group/add', newGroup)
	               .then(function(response){
	                  console.log("group created");
	                  this.$router.push({path: `/u/${this.$route.params.user_id}/mygroup_list`});
               	});
      		},
      		validateCreateGroup:function(){
      			if(!this.image || !this.group_name || !this.group_info){
      				console.log("Please fill all required form");
      			} else {
      				this.createGroup();
      			}
      		},
      		gotoGroupList:function(){
            	this.$router.push({path: `/u/${this.$route.params.user_id}/group_list`});
         	},
		}

	}
</script>