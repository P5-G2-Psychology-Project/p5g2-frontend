<template>
    <div class="Home">
        <div class="home-container-1">  
                <h1> <span id="LogedUser">{{ userFullNameById.name }}</span>, recuerda que el seguimiento de tu proceso te ayudará a progresar y a tomar mejores decisiones</h1>
        </div>
        <div class="imagehome">
            <img src="../images/calendar.jpg">
        </div>
    </div>
   
</template>

<script>
    import jwt_decode from 'jwt-decode';
    import gql        from 'graphql-tag';

    export default{
        name: "Home",
        /*Recuerde que esta función de data se carga antes de todo y por eso pone el username de una*/
        data: function(){
            return {
                userId           : jwt_decode(localStorage.getItem("tokenRefresh")).user_id,
                username         : localStorage.getItem("username"),
                userFullNameById : {
                    name : "",
                }
            }
            
        },

        components:{

        },

        apollo: {
            //Take in account that this MS require authorization to perform this activity.
            userFullNameById : {
                query : gql`
                    query Query($userId: Int!) {
                    UserDetailById(userId: $userId) {
                      name
                    }
                }

                `,
                variables(){
                    return {
                        userId : this.userId,
                    }
                }
            }
        }

    }
</script>

<style>

    .Home{
        height:80%; 
    }
    .home-container-1{
        position: relative;
        height: 100%;
        width: 40%;
        display: block;
        justify-content: center;
        align-items: left;
        align-content: left;
        margin-top:150px;
        color: black;
        left:100px;
        overflow: hidden;
        z-index:-1;
        
    }

    h1{
        color:black;
        font-family: "Arial", "Courier New", monospace;
        text-align: left;
        z-index:10;
    }


    #LogedUser{
        color:#303F9F;
        font-size: 3rem;
    }

    .imagehome{
        position: relative;
        top:-550px;
        left:300px;
        z-index: -1;
    }

</style>
