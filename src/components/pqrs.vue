<template>
    <div class="pqrs">
        <div class="logbook-container-2" ref="crearEntrada">
            <fieldset>
                <legend>Cuéntanos</legend>
                <form class="formCreateEntry" v-on:submit.prevent="processCreateEntry">
                    <input type="text" v-model="cuentanos.physichologist" placeholder="Email">
                    <br/>
                    <input type="text" v-model="cuentanos.ventajas" placeholder="Ventaja">
                    <br/>
                    <input type="text" v-model="cuentanos.terapias" placeholder="Terapias">
                    <br/>
                    <input type="text" v-model="cuentanos.negativo" placeholder="Negativo">
                    <br/>
                    <input type="text" v-model="cuentanos.sugerencia" placeholder="Sugerencias">
                    <br/>
                    <button type="submit">Crear</button>
                </form>

            </fieldset>

            <div class="imageCreateEntry">
                <img src="../images/pqrsRequest.png" width="600" height="400">
            </div>   
        </div>

         <!-- ======= Contact Section ======= -->
            <section id="contact" class="contact section-bg">
            <div class="container" data-aos="fade-up">

                <div class="section-title">
                
             

                </div>

                <div class="row">

                <div class="col-lg-6">

                    <div class="row">
                    <div class="col-md-12">
                        <div class="info-box">
                        <i class="bx bx-map"></i>
                        <h3>Our Address</h3>
                        <p>A108 Adam Street, New York, NY 535022</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="info-box mt-4">
                        <i class="bx bx-envelope"></i>
                        <h3>Email Us</h3>
                        <p>info@example.com<br>contact@example.com</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="info-box mt-4">
                        <i class="bx bx-phone-call"></i>
                        <h3>Call Us</h3>
                        <p>+1 5589 55488 55<br>+1 6678 254445 41</p>
                        </div>
                    </div>
                    </div>

                </div>

                <div class="col-lg-6 mt-4 mt-md-0">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16289433.790265229!2d-83.39978676614085!3d4.609674209206876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e15a43aae1594a3%3A0x9a0d9a04eff2a340!2sColombia!5e0!3m2!1sen!2sco!4v1639426055177!5m2!1sen!2sco" 
                            width="600" height="380" style="border:0;" allowfullscreen="" loading="lazy"></iframe>

                </div>

                </div>

            </div>
            
            </section><!-- End Contact Section -->
        <hr style="border:15px;color:transparent;"><hr style="border:2px;color:transparent;">

        <!-- ======= Footer Section ======= -->
        <section class="footerAbout" >
        <div>
            <h2 class="footertext">MisionTic 2022 - P5 - Grupo2 ©</h2>
            </div>  <!-- End Footer Section -->
        </section>
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
                userId           : jwt_decode(localStorage.getItem("tokenRefresh")).user_id ,
                username         : localStorage.getItem("username"),
                cuentanos : {
                    nombre          : localStorage.getItem("username"),
                    fecha           : "",
                    email           : "",
                    ventajas        : "",
                    terapias        : "",
                    negativo        : "",
                    sugerencia      : "",
                }
            }
            
        },

        components:{

        },

        apollo: {
            //Take in account that this MS require authorization to perform this activity.
            UserDetailById : {
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

    .logbook-container-2{
        position: relative;
        display:flex;
        width: 80%;
        height : 600px;
        align-self: center;
        left: 100px;
        top: 50px;      
    }

    .formCreateEntry{
        border:1px solid black;
        padding-top: 20px;
        border-radius: 0 0 10px 10px;
        align-items: left;
        align-content: left;
        margin-top:-0px;
    }
    fieldset{
        position:relative;
        color:black;
        border-color: black;
        border-style : solid;
        width: 60%;
        height: 60%;
        left: 60px;
        top: 50px;
        z-index:10;  
    }

    fieldset legend{
    background-color:#303F9F;
    border-radius: 10px 10px 0px 0px;
    color: white;
    height : 50px;
    font-family: 'Times New Roman', Times, serif, Helvetica, sans-serif;
    margin-bottom: 0px;
    padding-top:10px;
    }

    .logbook-container-2 button:hover{
    color: #E5E7E9;
    background: crimson;
    border: 1px solid #283747;
    }

    .imageCreateEntry{
        top: 20px;
    }

/*--------------------------------------------------------------
# Contact
--------------------------------------------------------------*/
.contact .info-box {
  color: #2d405f;
  text-align: center;
  box-shadow: 0 0 30px rgba(214, 215, 216, 0.6);
  padding: 20px 0 30px 0;
  background: #fff;
}
.contact .info-box i {
  font-size: 32px;
  color: #3b4ef8;
  padding: 8px;
}
.contact .info-box h3 {
  font-size: 20px;
  color: #777777;
  font-weight: 700;
  margin: 10px 0;
}
.contact .info-box p {
  padding: 0;
  line-height: 24px;
  font-size: 14px;
  margin-bottom: 0;
}

</style>