// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueResource from 'vue-resource'
import VueRouter from 'vue-router'
import navbar_user from './components/navbar.vue'
import Router from './router.js'
import VueCarousel from 'vue-carousel'

Vue.config.productionTip = false

Vue.use(vueResource)
Vue.use(VueRouter)
Vue.use(VueCarousel)

const router = new VueRouter({
	routes: Router,
});

/* eslint-disable no-new */
new Vue({
	el:'#app',
  	template: 
  	`
  	<div>
  	<navbar_user />
  	<section class="section">
		<div class="container is-fluid">
			<router-view></router-view>
		</div>
	</section>
	</div>
	`,
	router: router,
	components: { 
		navbar_user,
	},
})
