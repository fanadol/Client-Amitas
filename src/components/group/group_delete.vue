<template>
	<section class="section">
         <div class="container" style="width: 600px">
            <div class="column">
               <!-- delete thread -->
               <div class="box">
                   <div class="content">
                     <p class="title is-4" style="margin-bottom: 34px">Delete This Group</p>
                     <p class="subtitle is-6">Are you sure that you want to delete this group?</p>
                     <div class="field is-grouped">
                        <div class="control">
                           <a @click="deleteGroup" class="button is-danger"><span class="icon">
                           <i class="fa fa-trash-o"></i>
                           </span>
                           <span>Yes, Delete!</span>
                           </a>
                        </div>
                        <div class="control">
                           <a @click="gotoEditGroup" class="button">                 
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
		name: 'group_delete',
		data(){
			return {
				
			}
		},
		methods: {
			gotoEditGroup:function(){
				this.$router.push({path: `/u/${this.$route.params.user_id}/group/edit/${this.$route.params.group_id}`});
			},
			deleteGroup:function(){
				this.$http.delete('http://slim.amicloud.me/public/api/group/delete/'+ this.$route.params.group_id)
					.then(function(response){
						this.$router.push({path: `/u/${this.$route.params.user_id}/group_list`});
						console.log("Group Deleted");
					});
			}
		}
	}
</script>