<template>
    <section class="section">
       <div class="container" style="width: 500px">
          <!-- about me -->    
          <div class="box has-text-centered">
             <div class="content">
                <p class="level-item has-text-centered">
                   <img :src="user_data.user_photo" alt="profile photo" style="height: 96px; width: 96px; object-fit: cover;">
                </p>
             </div>
             <div class="content">
                <p class="title is-4" style="margin-bottom: 34px">{{user_data.name}}</p>
                <p class="subtitle is-6">{{user_data.prodi}}</p>
             </div>
             <div class="content">
                <p class="level-item has-text-centered">
                   <a @click="gotoEditProfile" class="button is-success is-outlined"><span class="icon">
                   <i class="fa fa-pencil"></i>
                   </span>
                   <span>Edit Profile</span>
                   </a>
                </p>
             </div>
          </div>
          <!-- group information -->
          <div class="box">
             <aside class="menu">
                <p class="menu-label">
                   Profile Information
                </p>
                <ul class="menu-list">
                   <li>
                      <a>
                      <span class="icon">
                      <i class="fa fa-calendar"></i>
                      </span>
                      <span>{{user_data.join_date}}</span>
                      </a>
                   </li>
                   <li>
                      <a @click="openUrl()">
                      <span class="icon">
                      <i class="fa fa-globe"></i>
                      </span>
                      <span>Social Link</span>
                      </a>
                   </li>
                </ul>
             </aside>
          </div>
       </div>
    </section>
 </template>
 <script>
    export default {
      name: 'userProfile',    
      data(){
        return {
          user_data: {}        
        }
      },
      methods: {
        fetchUser:function(){
          this.$http.get('http://slim.amicloud.me/public/api/user/'+ this.$route.params.user_id)
                   .then(function(response){
                   this.user_data = response.body;
            });
        },
        gotoEditProfile:function(){
              this.$router.push({
              path: `/u/${this.$route.params.user_id}/profile/edit`});
        },
        openUrl () {
          location.href = this.user_data.social_link,          
          window.open(location.href, '_blank');
        }          
      },
      created:function(){
        this.fetchUser();
      }
    }
 </script>