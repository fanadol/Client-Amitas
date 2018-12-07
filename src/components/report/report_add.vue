<template>
	<section class="section">
         <div class="container" style="width: 600px">
            <div class="column">
               <!-- delete thread -->
               <div class="box">
                  <div class="content">
                     <p class="title is-4" style="margin-bottom: 34px">Report This Thread</p>
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
		name: 'report_addp',
		data(){
			return {
				thread: {},
				description_report: ''
			}
		},
		methods: {
			fetchThread: function(id){
                  this.$http.get('http://slim.amicloud.me/public/api/thread/'+id)
                        .then(function(response){
                              this.thread = response.body;
                        });
            },
            submitReport:function(){
            	if(this.description_report == ''){
            		console.log("Check the report first");
            	} else {
            		let reportData = {
            			user_id: this.thread.user_id,
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
      			this.$router.push({path: `/u/${this.$route.params.user_id}/thread/${this.$route.params.post_id}`});
      		},

		},
		created:function(){
			this.fetchThread(this.$route.params.post_id);
		}
	}
</script>