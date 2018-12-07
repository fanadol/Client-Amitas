<template>
<section class="section">
        <div class="container">
        <div class="column">
                <div class="box">
                <div class="content">
                <p class="title is-3">Total Members: {{anggota.Jumlah_Anggota}}</p>
                <table class="table is-striped is-hoverable">
                        <thead>
                        <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Program Studi</th>
                        <th>Joined Date</th>
                        <th>Role</th>
                        </tr>
                        </thead>
                        <tbody v-for="member in memberList">
                        <tr>
                        <td>{{member.user_id}}</td>
                        <td>{{member.name}}</td>
                        <td>{{member.prodi}}</td>
                        <td>{{member.join_date}}</td>
                        <td>{{member.role}}</td>
                        </tr>
                        </tbody>
                </table>
                <div class="field is-grouped">
                        <div class="control">
                        <a @click="gotoDetailGroup" class="button">
                        <span class="icon"><i class="fa fa-angle-left"></i></span>
                        <span>Back to Group</span>
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
        name: 'group_member_list',
        data() {
                return {
                        memberList: [],
                        anggota: {},
                }
        },
        methods: {
                fetchGroupMemberList:function(){
                        this.$http.get('http://slim.amicloud.me/public/api/group/member_list/' + this.$route.params.group_id)
                        .then(function(response){
                                this.memberList = response.body;
                        });
                },
                fetchCountAnggota:function(){
                        this.$http.get('http://slim.amicloud.me/public/api/group/member/'+ this.$route.params.group_id)
                        .then(function(response){
                        this.anggota = response.body;
                });
                },
                gotoDetailGroup:function(){
                        this.$router.push({path: `/u/${this.$route.params.user_id}/group/detail/` + this.$route.params.group_id});
                }
        },
        created:function(){
                this.fetchGroupMemberList();
                this.fetchCountAnggota();
        }
}

</script>