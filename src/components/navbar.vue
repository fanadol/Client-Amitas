<template>
  <!--Not Login Navbar-->
  <nav v-if="$route.meta.navbartype === 'notlogin'" class="navbar is-primary" role="navigation" aria-label="main navigation">
     <div class="container">
        <div class="navbar-brand">
           <a class="navbar-item" @click="gotoForum">
           <img src="../assets/amitas_logo.svg" alt="Logo" width="112" height="28">
           </a>
           <div class="navbar-burger burger" data-target="navMenu">
              <span></span>
              <span></span>
              <span></span>
           </div>
        </div>
        <div class="navbar-menu" id="navMenu">
           <div class="navbar-start">
              <a class="navbar-item" @click="gotoForum">
              Forum
              </a>
           </div>
           <div class="navbar-end">
              <!-- login form -->
              <form name="formLogin" id="formLogin">
                 <div class="navbar-item">
                    <div class="field is-grouped is-grouped-right">
                       <p class="control has-icons-left has-icons-right" style="width:30%">
                          <input class="input" type="text" placeholder="Student ID" v-model="nim">
                          <span class="icon is-small is-left">
                          <i class="fa fa-user"></i>
                          </span>                
                       </p>
                       <p class="control has-icons-left has-icons-right" style="width:30%">
                          <input class="input" type="password" placeholder="Password" v-model="password" @keydown.enter="login">
                          <span class="icon is-small is-left">
                          <i class="fa fa-lock"></i>
                          </span>                
                       </p>
                       <p class="control">
                          <a class="button is-primary" @click="login">
                          <span class="icon">
                          <i class="fa fa-sign-in"></i>
                          </span>
                          <span>Login</span>
                          </a>
                       </p>
                    </div>
                 </div>
              </form>
           </div>
        </div>
     </div>
  </nav>
  
  <!--Logined Navbar-->
  <nav v-else class="navbar is-primary" role="navigation" aria-label="main navigation">
     <div class="container">
        <div class="navbar-brand">
           <a class="navbar-item" @click="gotoHome">
           <img src="../assets/amitas_logo.svg" alt="Logo" width="112" height="28">
           </a>
           <div class="navbar-burger burger" data-target="navMenu">
              <span></span>
              <span></span>
              <span></span>
           </div>
        </div>
        <div class="navbar-menu" id="navMenu">
           <div class="navbar-start">
              <a class="navbar-item" @click="gotoHome">
              Forum
              </a>
              <a class="navbar-item" @click="gotoGroupList">
              Communities
              </a>
           </div>
           <div class="navbar-end">
              <!-- <a v-show="Role" class="navbar-item" @click="newAnnouncement">
                 <span class="icon">                
                 <i class="fa fa-md fa-plus-square"></i>
                 </span>New Announcement</a> -->
              <!-- notif -->
              <a class="navbar-item" href="#">
              <span class="icon" style="color: #FFF;">
              <i class="fa fa-lg fa-bell-o"></i>
              </span>
              </a>
              <!-- my account -->
              <div class="navbar-item has-dropdown is-hoverable">
                 <a class="navbar-link" target="_blank">
                 My Account
                 </a>
                 <div class="navbar-dropdown is-boxed">
                    <a class="navbar-item" @click="gotoMyProfile">My Profile</a>
                    <a class="navbar-item" @click="gotoMyGroup">My Group</a>        
                    <hr class="navbar-divider">
                    <a class="navbar-item" @click="goLogout">Logout</a>
                 </div>
              </div>
           </div>
        </div>
     </div>
  </nav>
</template>

<script>
  export default {
    name: 'navbar_user',
    data(){
      return {
        user_data: {},
        user_id: this.$route.params.user_id,
        nim: '',
        password: '',
        Role: ''
      }
    },
    methods: {
      login: function(){
        let DataLogin = {
          user_id: this.nim,
          password: this.password,
        }
        this.$http.post('http://slim.amicloud.me/public/api/user/login', DataLogin)
          .then(function(response){
            if(response.body == false){
              console.log("NIM atau Password Salah!");
            } else {
              this.user_data = response.body;
              this.checkRole();
              this.$router.push({path: `/u/${this.user_data.user_id}/home`});
            }
          });
      },
      fetchUser:function(){
        this.$http.get('http://slim.amicloud.me/public/api/user/'+ this.$route.params.user_id)
                 .then(function(response){
                     this.user_data = response.body;
                     this.checkRole();
          });
      },
      gotoHome: function(){
        this.$router.push({path: `/u/${this.$route.params.user_id}/home`});
        location.reload();
      },
      gotoForum: function(){
        if(this.$route.path == '/'){
          location.reload();
        } else {
          this.$router.push({path: '/'});
        }
  
      },
      goLogout:function(){
        this.$router.push({path: '/'});
             location.reload();
      },
      checkRole:function(){
        if(this.user_data.status == "UKM"){
          this.Role = true;
        } else {
          this.Role = false;
        }
      },
          gotoGroupList:function(){
             this.$router.push({path: `/u/${this.$route.params.user_id}/group_list`});
          },
          newAnnouncement:function(){
             this.$router.push({path: `/u/${this.$route.params.user_id}/create/announcement`});
          },
          gotoMyProfile:function(){
             this.$router.push({path: `/u/${this.$route.params.user_id}/profile`});
          },
          gotoMyGroup:function(){
             this.$router.push({path: `/u/${this.$route.params.user_id}/mygroup_list`});
          }
    },
    created:function(){
      this.fetchUser();
    }
  }
</script>