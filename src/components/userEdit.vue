<template>
	<section class="section">
         <div class="container" style="width: 700px">
            <div class="box">
               <p class="title is-3">Edit Profile</p>
               <!-- start edit -->
               <div class="content">
                  <div class="field">
                     <div class="control">
                        <label class="label">Profile Photo</label>            
                        <img :src="user_data.user_photo" alt="profile photo" style="height: 96px; width: 96px; object-fit: cover; margin-bottom: 10px">               
                        <br>
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
                  </div>
                  <div class="field">
                     <label class="label">Name</label>
                     <div class="control has-icons-left">           
                        <input class="input" type="text" v-model="user_data.name">
                        <span class="icon is-small is-left">
                        <i class="fa fa-user"></i>
                        </span>
                     </div>
                  </div>
                  <div class="field">
                     <label class="label">Prodi</label>
                     <div class="control has-icons-left">           
                        <input class="input" type="text" v-model="user_data.prodi" readonly="">
                        <span class="icon is-small is-left">
                        <i class="fa fa-user"></i>
                        </span>
                     </div>
                  </div>
                  <div class="field">
                     <label class="label">Social Link</label>
                     <div class="control has-icons-left">           
                        <input class="input" type="text" v-model="user_data.social_link">
                        <span class="icon is-small is-left">
                        <i class="fa fa-facebook-square"></i>
                        </span>
                     </div>
                  </div>
                  <hr>
                  <div class="field">
                     <label class="label">Current Password</label>
                     <div class="control has-icons-left">           
                        <input class="input" type="text" v-model="user_data.password" placeholder="enter password">
                        <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                        </span>
                     </div>
                  </div>
                  <div class="field">
                     <label class="label">New Password</label>
                     <div class="control has-icons-left">           
                        <input class="input" type="password" placeholder="enter new password" v-model="new_password">
                        <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                        </span>
                     </div>
                  </div>
                  <div class="field">
                     <label class="label">Confirm Password</label>
                     <div class="control has-icons-left">           
                        <input class="input" type="password" placeholder="confirm new password" v-model="confirm_new_password">
                        <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                        </span>
                     </div>
                  </div>
                  <!-- finish edit -->
                  <br>
                  <div class="field is-grouped">
                     <div class="control">
                        <a @click="validationUpdateUser" class="button is-success"><span class="icon">
                        <i class="fa fa-floppy-o"></i>
                        </span>
                        <span>Update Profile</span>
                        </a>
                     </div>
                     <div class="control">
                        <a @click="gotoMyProfile" class="button">                 
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
		name: 'userEdit',
		data(){
			return {
				user_data: {},
				new_password: '',
				confirm_new_password: '',
        filename: '',
			}
		},
		methods: {
			fetchUser:function(){
				this.$http.get('http://slim.amicloud.me/public/api/user/'+ this.$route.params.user_id)
            		.then(function(response){
                		this.user_data = response.body;
					});
			},
			gotoMyProfile:function(){
            	this.$router.push({path: `/u/${this.$route.params.user_id}/profile`});
         	},
         uploadPhoto: function(e){
               this.filename = e.target.files[0].name;
               var reader = new FileReader()
               reader.readAsDataURL(e.target.files[0])

               reader.onload = (e) => {
                     this.user_data.user_photo = e.target.result
               }
         },
         updateUser:function(){
             let updUser = {
               name: this.user_data.name,
               social_link: this.user_data.social_link,
               password: this.user_data.password,
               user_photo: this.user_data.user_photo,
             }

             this.$http.put('http://slim.amicloud.me/public/api/user/profile/update/'+ this.$route.params.user_id, updUser)
               .then(function(response){
                 console.log('User Updated');
                 this.gotoMyProfile();
             });
         },
         validationUpdateUser: function(){
              if(!this.user_data.name || !this.user_data.password){
                console.log('Please Fill in all required fields');
              } else if(this.new_password!=''){
                  if(this.new_password != this.confirm_new_password){
                    console.log('Password doesnt match!');
                  } else{
                this.user_data.password = this.new_password;
                this.updateUser();
                  }
                } 
                else {
                this.updateUser();
              }
         },
		},
		created:function(){
			this.fetchUser();
		}
	}
</script>