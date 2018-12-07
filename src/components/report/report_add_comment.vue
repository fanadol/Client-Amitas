<template>
	<section class="section">
         <div class="container" style="width: 600px">
            <div class="column">
               <!-- delete thread -->
               <div class="box">
                  <div class="content">
                     <p class="title is-4" style="margin-bottom: 34px">Report This Comment</p>
                     <p class="subtitle is-6">Help us understand what's happening?</p>                     
                     <div class="field">
                        <div class="control">
                           <input class="is-checkradio" id="1" type="radio" name="reportType" value="Sexual Content" v-model="description_report">
                           <label for="1">Sexual Content</label>
                        </div>
                     </div>
                     <div class="field">
                        <div class="control">
                           <input class="is-checkradio" id="2" type="radio" name="reportType" value="Hateful Content" v-model="description_report">
                           <label for="2">Hateful Content</label>
                        </div>
                     </div>
                     <div class="field">
                        <div class="control">
                           <input class="is-checkradio" id="3" type="radio" name="reportType" value="Spam or Misleading" v-model="description_report">
                           <label for="3">Spam or Misleading</label>
                        </div>
                     </div>
                     <div class="field">
                        <div class="control">
                           <input class="is-checkradio" id="4" type="radio" name="reportType" value="Fool Language" v-model="description_report">
                           <label for="4">Fool Language</label>
                        </div>
                     </div>
                     <br>
                     <div class="field is-grouped">
                        <div class="control">
                           <a @click="submitReport" class="button is-success"><span class="icon">
                           <i class="fa fa-paper-plane"></i>
                           </span>
                           <span>Submit</span>
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
		name: 'report_addc',
		data(){
			return {
				comment: {},
				description_report: '',
            group_post: {},
			}
		},
		methods: {
			fetchComment: function(id){
                  this.$http.get('http://slim.amicloud.me/public/api/singlecomment/'+id)
                        .then(function(response){
                              this.comment = response.body;
                              this.fetchLocationPost(this.comment.post_id);
                        });
            },
         submitReport:function(){
         	if(this.description_report == ''){
         		console.log("Check the report first");
         	} else {
         		let reportData = {
         			user_id: this.comment.user_id,
         			reporter_id: this.$route.params.user_id,
         			report_message: this.description_report,
         		}
         		this.$http.post('http://slim.amicloud.me/public/api/report/add',reportData)
         			.then(function(response){
         				this.gotoDetailThread();
         			});
         	}
         },
         gotoDetailThread:function(){
            this.$router.push({path: `/u/${this.$route.params.user_id}/group/detail/`+ this.group_post.group_id});
         },
         fetchLocationPost:function(idpost){
            this.$http.get('http://slim.amicloud.me/public/api/group/locatepost/'+idpost)
               .then(function(response){
                  this.group_post = response.body;
               });
         },
		},
		created:function(){
			this.fetchComment(this.$route.params.comment_id);
		}
	}
</script>