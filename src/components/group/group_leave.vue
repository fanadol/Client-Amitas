<template>
	<section class="section">
         <div class="container" style="width: 600px">
            <div class="column">
               <!-- delete thread -->
               <div class="box">
                   <div class="content">
                     <p class="title is-4" style="margin-bottom: 34px">Leave This Group</p>
                     <p class="subtitle is-6">Are you sure that you want to leave this group?</p>
                     <div class="field is-grouped">
                        <div class="control">
                           <a @click="leaveGroup" class="button is-danger"><span class="icon">
                           <i class="fa fa-trash-o"></i>
                           </span>
                           <span>Yes, Leave!</span>
                           </a>
                        </div>
                        <div class="control">
                           <a @click="gobackToDetailGroup" class="button">                 
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
		name: 'group_leave',
		data(){
			return {
				
			}
		},
		methods: {
			gobackToDetailGroup:function(){
				this.$router.push({path: `/u/${this.$route.params.user_id}/group/detail/` + this.$route.params.group_id});
			},
			leaveGroup: function(){
            let leave = {
               user_id: this.$route.params.user_id,
               group_id: this.$route.params.group_id
            }
				this.$http.delete('http://slim.amicloud.me/public/api/group/leave/'+this.$route.params.group_id+'/u/'+this.$route.params.user_id)
					.then(function(response){
						this.$router.push({path: `/u/${this.$route.params.user_id}/mygroup_list`});
					});
			},
		}
	}
</script>