<template>
	<div>
	<!-- tab menu -->
      <nav class="navbar has-shadow">
         <div class="container">
            <div class="tabs">
               <a class="navbar-item is-tab" @click="gotoGroupList">
               <span class="icon is-small"><i class="fa fa-globe"></i></span>
               <span>All Groups</span>
               </a>
               <a class="navbar-item is-tab is-active" @click="gotoMyGroup">
               <span class="icon is-small"><i class="fa fa-users"></i></span>
               <span>My Groups</span>
               </a>
            </div>
         </div>
      </nav>
      <section class="section">
         <div class="container">
            <!-- groups info -->
            <div class="columns">
               <div class="column is-four-fifths is-left">
                  <h3 class="title is-4">{{count}} Groups</h3>
               </div>
            </div>
            <!-- list groups -->
            <div class="columns is-multiline is-mobile">
               <div class="column is-3" v-for="group in groups">
                  <div class="card">
                     <div class="card-content">
                        <article class="media">
                           <div class="media-left">
                              <figure class="image is-64x64">
                                 <img :src="group.logo" alt="Placeholder image">
                              </figure>
                           </div>
                           <div class="media-content">
                              <p class="title is-5" style="margin-bottom: 15px">{{group.name}}</p>
                              <p class="field">
                              	 <a v-if="check(group.group_id)" @click="gotoDetailGroup(group.group_id)" class="button is-success is-outlined">
                                 <span class="icon is-small">
                                 <i class="fa fa-check"></i>
                                 </span>
                                 <span>Joined</span>
                                 </a>
                                 <a v-else class="button is-success">
                                 <span class="icon is-small">
                                 <i class="fa fa-plus"></i>
                                 </span>
                                 <span>Join</span>
                                 </a>
                              </p>
                           </div>
                        </article>
                     </div>
                  </div>
               </div>
            </div>
            <!-- end groups -->
         </div>
      </section>
	</div>
</template>

<script>
	export default {
		name: 'group_list',
		data(){
			return {
				user_data: {},
				groups: [],
				checkMember: [],
				user_id: this.$route.params.user_id,
            count: '',
			}
		},
		methods: {
			fetchUser:function(){
				this.$http.get('http://slim.amicloud.me/public/api/user/'+ this.$route.params.user_id)
            		.then(function(response){
                		this.user_data = response.body;
					});
			},
			fetchGroup:function(){
				this.$http.get('http://slim.amicloud.me/public/api/mygroup/' + this.$route.params.user_id)
					.then(function(response){
						this.groups = response.body;
                  this.count = this.groups.length;
					});
			},
			fetchGroupMember:function(){
				this.$http.get('http://slim.amicloud.me/public/api/group/check/' + this.user_id)
					.then(function(response){
						this.checkMember = response.body;
					});
			},
			check:function(group_id){
				for (var i = 0; i < this.checkMember.length; i++) {
					if(this.checkMember[i].group_id == group_id){
						return true;
					}
				}
				return false;
			},
			gotoDetailGroup:function(idgroup){
				this.$router.push({path: `/u/${this.user_id}/group/detail/` + idgroup});
			},
			gotoGroupList:function(){
            	this.$router.push({path: `/u/${this.$route.params.user_id}/group_list`});
         	},
         gotoMyGroup:function(){
               this.$router.push({path: `/u/${this.$route.params.user_id}/mygroup_list`});
            },
		},
		created:function(){
			this.fetchGroup();
			this.fetchGroupMember();
			this.fetchUser();
		}
	}
</script>