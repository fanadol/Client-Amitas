import home from './components/home.vue'
import homelogin from './components/homelogin.vue'
import thread_create from './components/thread/thread_create.vue'
import thread_detail from './components/thread/thread_detail.vue'
import thread_detail_notlogin from './components/thread/thread_detail_notlogin.vue'
import thread_edit from './components/thread/thread_edit.vue'
import thread_delete from './components/thread/thread_delete.vue'

import mygroup_list from './components/group/mygroup_list.vue'
import group_add from './components/group/group_add.vue'
import group_list from './components/group/group_list.vue'
import group_detail from './components/group/group_detail.vue'
import group_edit from './components/group/group_edit.vue'
import group_delete from './components/group/group_delete.vue'
import group_edit_post from './components/group/group_edit_post.vue'
import group_delete_post from './components/group/group_delete_post.vue'
import group_leave from './components/group/group_leave.vue'
import group_member_list from './components/group/group_member_list.vue'

import comment_edit from './components/comment/comment_edit.vue'
import comment_delete from './components/comment/comment_delete.vue'

import newAnnouncement from './components/newAnnouncement.vue'
import userProfile from './components/userProfile.vue'
import userEdit from './components/userEdit.vue'

import report_addp from './components/report/report_add.vue'
import report_addc from './components/report/report_add_comment.vue'

export default [
	{ path: '/', component: home, meta: {navbartype: "notlogin"} },
	{ path: '/u/thread/:post_id', component:thread_detail_notlogin, meta: {navbartype: "notlogin"} },

	{ path: '/u/:user_id/home', component: homelogin, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/profile', component: userProfile, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/profile/edit', component: userEdit, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/create/announcement', component: newAnnouncement, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/thread/create', component: thread_create, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/thread/:post_id', component:thread_detail, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/thread/edit/:post_id', component:thread_edit, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/thread/delete/:post_id', component:thread_delete, meta: {navbartype: "login"} },

	{ path: '/u/:user_id/g/:group_id/comment/edit/:comment_id', component:comment_edit, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/g/:group_id/comment/delete/:comment_id', component:comment_delete, meta: {navbartype: "login"} },

	{ path: '/u/:user_id/group_add', component: group_add, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/group_list', component: group_list, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/mygroup_list', component: mygroup_list, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/group/detail/:group_id', component: group_detail, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/group/edit/:group_id', component: group_edit, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/group/member_list/:group_id', component: group_member_list, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/group/leave/:group_id', component: group_leave, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/group/delete/:group_id', component: group_delete, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/group/:group_id/edit/post/:post_id', component: group_edit_post, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/group/:group_id/delete/post/:post_id', component: group_delete_post, meta: {navbartype: "login"} },

	{ path: '/u/:user_id/report/p/:post_id', component: report_addp, meta: {navbartype: "login"} },
	{ path: '/u/:user_id/report/c/:comment_id', component: report_addc, meta: {navbartype: "login"} },
]