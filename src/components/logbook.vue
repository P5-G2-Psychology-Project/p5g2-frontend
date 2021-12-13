<template>
    <div class="Logbook">
        <div class="logbook-container-1" >  
           
            <div class="menu-logbook">
                <ul>
                    <li>
                        
                       <button> <a  @click="scrollMeTo('crearEntrada')">Añadir</a></button>
                       <button> <a  @click="scrollMeTo('actualizarEntrada')">Actualizar</a></button>
                        <button> Ver </button>
                        <button> Eliminar </button> 
                    </li>
                </ul>
            </div>
            <br/>
            <br/>

            <div class="table-boots table-responsive">
                <table class="table table-bordered table-hover" id="tableLogbook">
                    <thead>
                    <tr>
                        <th scope="col" style ="width:5%">  Fecha</th>
                        <th scope="col" style ="width:15%"> Profesional</th>
                        <th scope="col" style ="width:10%"> Asistencia</th>
                        <th scope="col" style ="width:40%"> Descripción</th>
                        <th scope="col" cstyle="width:5%">  Satisfacción</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr height="10px" v-for="entry in entriesDetailByUsername" :key="entry.id"  class="hideextra">
                            <td>{{entry.fecha}}</td>
                            <td>{{entry.psicologo}}</td>
                            <td>{{entry.asistencia}}</td>
                            <td>
                                <div class="hideextra" style="width:450px">
                                    {{entry.descripcion}}
                                </div>
                            </td>                    
                            <td>{{entry.satisfaccion}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <input type="text" ref="row-selected">
        </div>
        <br/>
        <br/>

        <div class="logbook-container-2" ref="crearEntrada">
            <fieldset>
                <legend>Crear entrada</legend>
                <form class="formCreateEntry" v-on:submit.prevent="processCreateEntry">
                    <input type="text" v-model="entryTicket.physichologist" placeholder="Profesional">
                    <br/>
                    <input type="date" v-model="entryTicket.date" placeholder="Date">
                    <br/>
                    <textarea rows="4" cols="31" v-model="entryTicket.description" placeholder="Descripción"></textarea>
                    <br/>
                    <p>Asistencia</p>
                    <div class="create-radio-buttons">
                        <label for="1">Si</label>
                        <input class="radio-1" type="radio" id="1" value="1" v-model="entryTicket.attendance">
                        <label for="2">No</label>
                        <input class="radio-1" type="radio" id="0" value="0" v-model="entryTicket.attendance">
                    </div>
                    <input type="number" v-model="entryTicket.satisfaction" placeholder="Satisfacción">
                    <br/>
                    <button type="submit">Crear</button>
                </form>
           
            </fieldset>

          <div class="imageCreateEntry">
            <img src="../images/appointment.jpg" width="600" height="450">
        </div>   
        </div>
        <br/>
        <br/>

        
        <div class="logbook-container-3" ref="actualizarEntrada">
            
             <div class="imageUpdateEntry">
            <img src="../images/appointment2.jpg" width="500" height="450">
        </div> 
            <fieldset>
                <legend>Actualizar entrada</legend>
                <form class="formUpdateEntry" v-on:submit.prevent="processUpdateEntry">
                    <input type="text" v-model="updateTicket.physichologist" placeholder="Profesional">
                    <br/>
                    <input type="date" v-model="updateTicket.date" placeholder="Date">
                    <br/>
                    <textarea rows="4" cols="40" v-model="updateTicket.description" placeholder="Descripción"></textarea>
                    <br/>
                    <p>Asistencia</p>
                    <div class="create-radio-buttons">
                        <label for="1">Si</label>
                        <input class="radio-1" type="radio" id="1" value="1" >
                        <label for="2">No</label>
                        <input class="radio-1" type="radio" id="0" value="0" >
                    </div>
                    <input type="number" v-model="updateTicket.satisfaction" placeholder="Satisfacción">
                    <br/>
                    <button type="submit">Crear</button>
                </form>
            </fieldset>
        </div>

<div class="footer">
      <h2>MisionTic 2022 - P5 - Grupo2 ©</h2>
    </div>
    </div>
</template>


<script>
var table = document.getElementById('tableLogbook')
alert(table)

    import gql        from 'graphql-tag';

    export default{
        name: "Home",
        data: function(){
            return {
                username                : localStorage.getItem("username"),
                entriesDetailByUsername : [],
                entryTicket             : {
                    logbook         : localStorage.getItem("username"),
                    date            : "",
                    physichologist  : "",
                    attendance      : undefined,
                    description     : "",
                    satisfaction    : ""
                },

                updateTicket            : {
                    id              : 5,
                    logbook         : localStorage.getItem("username"),
                    date            : "",
                    physichologist  : "",
                    attendance      : false,
                    description     : "",
                    satisfaction    : ""
                },                
            }
            
        },

        methods: {
            scrollMeTo(refName) {
                var element = this.$refs[refName];
                var top = element.offsetTop;

                 window.scrollTo(0, top);
            },

            processCreateEntry: async function(){
                this.entryTicket.attendance = !!parseInt(this.entryTicket.attendance);
                console.log(this.entryTicket)
                await this.$apollo.mutate(
                    {
                        mutation: gql`
                            mutation EntryCreate($entryCreateInput: EntryCreation!) {
                              entryCreate(entryCreateInput: $entryCreateInput)
                            }
                         `,
                        variables : {
                            entryCreateInput: this.entryTicket,
                        }

                    }
                )
                .then((result) => {
                    let message = "La entrada ha sido añadida a tu bitácora";
                    alert(message);
                })
                .catch((error) => {
                    console.log(error)
                    alert("Ha ocurrido un error")
                })

            }
            },

        
     
        
        

        apollo: {
            entriesDetailByUsername : {
                query: gql`
                    query Query($username: String!) {
                      entriesDetailByUsername(username: $username) {
                        id
                        fecha
                        psicologo
                        asistencia
                        descripcion
                        satisfaccion
                      }
                    }
                `,
                variables() {    
                    return {
                        username: this.username,
                    };
                }
            }
        },

        created: function(){
            this.$apollo.queries.entriesDetailByUsername
            this.$apollo.queries.entriesDetailByUsername.refetch()
        }
    }   
</script>

<style>
    .logbook-container-1{
        position: relative;
        height: 400px;
        width: 80%;
        justify-content: center;
        align-items: center;
        align-content: center;
        align-self:center;
        margin-top:150px;
        color: black;
        left:130px;
        top:-50px;
            }

    .logbook-container-2{
        position: relative;
        display:flex;
        width: 80%;
        height : 600px;
        align-self: center;
        left: 100px;
        
    }

    .imageCreateEntry{
        position:relative;
        right:-100px;
        z-index:-1;
    }

    .logbook-container-3{
       position: relative;
        display:flex;
        width: 80%;
        height : 600px;
        align-self: center;
        left: 100px;
        
    }
    h3{
        color:black;
    }

    .formCreateEntry{
         border:1px solid black;
         padding-top: 20px;
         border-radius: 0 0 10px 10px;
         align-items: left;
         align-content: left;
         margin-top:-0px;
    }
    
    .formUpdateEntry{
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

    .table-responsive {
        max-height:300px;
    }

    .menu-logbook{
        align-self: center;
        position:absolute;
        left:200px;
    }

    .menu-logbook button{
        height : 30px;
        width  : 120px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', sans-serif;
        color: white;
        padding: 5px;
        margin-right: 10px;
        border-radius:5px;
        background-color: #59309F;
        border-color: white;
    }


    .table-boots{
        right:210px;
    }
    
    .table-bordered th{
        color:black;
        z-index :10;    
    }

    .table-bordered td{
        z-index :10;    
        height: 14px
    }

    .table-bordered tr{
         line-height: 20px;
    } 

    .hideextra {
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
        color:black;
    }

    .logbook-container-2 input{
        height: 45px;
        width: 80%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin-bottom: 5px;
        border: 1px solid #283747;
    }

    .logbook-container-3 input{
        height: 45px;
        width: 80%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin-bottom: 5px;
        border: 1px solid #283747;
    }

    .logbook-container-2 button{
        width: 40%;
        height: 40px;
        color: #E5E7E9;
        background: #303F9F;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        margin-bottom:15px;
    }
    .logbook-container-2 button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }

    .logbook-container-3 button{
        width: 40%;
        height: 40px;
        color: #E5E7E9;
        background: #303F9F;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        margin-bottom:15px;
    }
    .logbook-container-3 button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }

    .create-radio-buttons{
        align-items: center;
        display:flex;
        height: 20px;
        margin-right: 20px;
        margin-left: 20px;
        margin-bottom: 20px;
        padding-left: 120px;
        width:50%
    }
    input[type=radio] {
        border: 0px;
        width: 100%;
        height: 1em;
    }

    table tr:not(:first-child){
    cursor: pointer;transition: all .25s ease-in-out;
    }

    table tr:not(:first-child):hover{
        background-color: #ddd;
    }

</style>