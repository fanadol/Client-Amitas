<template>
	<section class="section">
         <div class="container" style="width: 600px">
            <div class="column">
               <div class="box">
                   <div class="content">
                     <p class="title is-4">Edit Post</p>
                     <!-- edit post -->
                     <textarea class="textarea" placeholder="What do you want to share?" rows="3" v-model="post.content_text"></textarea>
                     <br>          
                      <div class="field is-grouped">
                        <div class="control">
                           <a @click="updatePost" class="button is-success"><span class="icon">
                           <i class="fa fa-floppy-o"></i>
                           </span>
                           <span>Update Post</span>
                           </a>
                        </div>
                        <div class="control">
                           <a @click="gobackToDetailGroup" class="button is-light">
                           <span>Cancel</span>
                           </a>
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
		name: 'group_edit_post',
		data(){
			return {
				post:{},
			}
		},
		methods: {
			fetchPostGroup: function(){
				this.$http.get('http://slim.amicloud.me/public/api/thread/'+ this.$route.params.post_id)
					.then(function(response){
						this.post = response.body;
					});
			},
			updatePost:function(){
				if(this.post.content_text == ''){
					console.log("Please Fill All Required Input!");
				} else {
					let editedPost = {
						content_text: this.post.content_text
					}
					this.$http.put('http://slim.amicloud.me/public/api/group/post/update/' + this.$route.params.post_id, editedPost)
					.then(function(response){
						this.$router.push({path: `/u/${this.$route.params.user_id}/group/detail/${this.$route.params.group_id}`});
					});
				}
			},
			gobackToDetailGroup:function(){
				this.$router.push({path: `/u/${this.$route.params.user_id}/group/detail/` + this.$route.params.group_id});
			},
		},
		created:function(){
			this.fetchPostGroup();
		}
	}
</script>