<template>
	<section class="section">
         <div class="container" style="width: 600px">
            <div class="column">
               <div class="box">
                   <div class="content">
                     <p class="title is-4">Edit Comment</p>
                     <!-- edit post -->
                     <textarea class="textarea" placeholder="What do you want to share?" rows="3" v-model="comment.comment"></textarea>
                     <br>          
                      <div class="field is-grouped">
                        <div class="control">
                           <a @click="updateComment" class="button is-success"><span class="icon">
                           <i class="fa fa-floppy-o"></i>
                           </span>
                           <span>Update</span>
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
      </section>
</template>

<script>
	export default{
		name: 'comment_edit',
		data(){
			return {
				comment:{},
			}
		},
		methods: {
			fetchCommentThread: function(){
				this.$http.get('http://slim.amicloud.me/public/api/singlecomment/'+ this.$route.params.comment_id)
					.then(function(response){
						this.comment = response.body;
					});
			},
			updateComment:function(){
				if(this.comment.comment == ''){
					console.log("Please Fill All Required Input!");
				} else {
					let editComment = {
						comment: this.comment.comment,
					}
					this.$http.put('http://slim.amicloud.me/public/api/comment/update/' + this.$route.params.comment_id, editComment)
					.then(function(response){
						this.$router.push({path: `/u/${this.$route.params.user_id}/group/detail/` + this.$route.params.group_id});
					});
				}
			},
			gotoDetailThread:function(){
				this.$router.push({path: `/u/${this.$route.params.user_id}/group/detail/` + this.$route.params.group_id});
			},
		},
		created:function(){
			this.fetchCommentThread();
		}
	}
</script>