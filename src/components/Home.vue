<template>
  <div class="container">
      <div class="form-group data">
        <input type="text" class="form-control" name="fname" id="fname" placeholder="First Name" />
        <input type="text" class="form-control" name="lname" id="lname" placeholder="Last Name" />
        <button type="button" id="save" data-pid="" class="btn btn-primary">Save</button>
        <button type="button" id="cancel" class="btn btn-warning">Cancel</button>
      </div>
      <ul class="list-group">
        <li class="list-group-item"
            v-for="p in pers" 
            :key="p._id"
            @click="edit(p)">
              {{p.firstname}} {{p.lastname}}              
              &nbsp;&nbsp;
              <button type="button" id="delete" :value=p._id class="btn btn-sm btn-danger">Delete</button>
            </li>
      </ul>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'Home',
  data() {
    return {
      pers: []
    }
  },
  props: {
    msg: String
  },
  created(){
    let v = this
    $(document).on("click","#save",function(e){
      e.preventDefault()
      v.save()
    })
    $(document).on("click","#cancel",function(e){
      e.preventDefault()
      v.cancel()
    })
    $(document).on("click","#delete",function(e){
      e.preventDefault()
      v.delete($(this).val())
    })
  },
  mounted(){    
    this.reloadList()
  },
  methods: {
    save(){      
      let pid = $("#save").attr("data-pid").length
      if(pid > 0){
        //console.log("update",pid)
        this.update()
      } else {
        //console.log("insert",pid)
        this.insert()    
      }    
    },
    cancel(){
      this.clear()
    },
    clear(){
      $("#fname").val("")
      $("#lname").val("")
      $("#save").attr("data-pid","")
      $("#fname").focus()
    },
    valid(){
      return ($("#fname").val().length > 0 && $("#lname").val().length > 0) ? true : false
    },
    insert(){
      if(!this.valid()) return;
      this.axios
      .post(uri, {fname: $("#fname").val(),lname:$("#lname").val()})  
      .then((response) => { 
        this.reloadList()
        this.clear()
      })
      .catch((err) => { console.log(err) })
    },
    update(){
      if(!this.valid()) return;
      this.axios
      .put(uri+'/'+$("#save").attr("data-pid"), {fname: $("#fname").val(),lname:$("#lname").val()})  
      .then((response) => { 
        this.reloadList()
        this.clear()        
      })
      .catch((err) => { console.log(err) })
    },
    delete(id){
      this.axios
      .delete(uri+'/'+id)  
      .then((response) => { 
        this.reloadList()
        this.clear()        
      })
      .catch((err) => { console.log(err) })
    },
    reloadList(){
      this.axios
      .get(uri)    
      .then((response) => {
        this.pers = response.data
        this.pers.reverse()
      })
      .catch((err) => { console.log(err) })
    },
    edit(person){
      $("#fname").val(person.firstname)
      $("#lname").val(person.lastname)
      $("#save").attr("data-pid", person._id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .data { margin-top: 15px }
  .data input { margin-bottom: 8px }
  #cancel {margin-left: 5px}
  .list-group {
    max-height: 400px;
    overflow-y: scroll;
  }
</style>
