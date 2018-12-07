<template>
	<section class="section">
         <div class="container" style="width: 600px">
            <div class="column">
               <!-- delete thread -->
               <div class="box">
                   <div class="content">
                     <p class="title is-4" style="margin-bottom: 34px">Delete This Comment</p>
                     <p class="subtitle is-6">Are you sure that you want to delete this comment?</p>
                     <div class="field is-grouped">
                        <div class="control">
                           <a @click="deletePost" class="button is-danger"><span class="icon">
                           <i class="fa fa-trash-o"></i>
                           </span>
                           <span>Yes, Delete!</span>
                           </a>
                        </div>
                        <div class="control">
                           <a @click="gotoDetailThread" class="button">                 
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
		name: 'comment_delete',
		data(){
			return {
				
			}
		},
		methods: {
			gotoDetailThread:function(){
            this.$router.push({path: `/u/${this.$route.params.user_id}/group/detail/` + this.$route.params.group_id});
         },
			deletePost: function(){
				this.$http.delete('http://slim.amicloud.me/public/api/comment/delete/'+ this.$route.params.comment_id)
					.then(function(response){
						this.$router.push({path: `/u/${this.$route.params.user_id}/group/detail/` + this.$route.params.group_id});
					});
			},
		}
	}
</script>