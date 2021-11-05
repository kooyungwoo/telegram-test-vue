<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:searchListSub="searchListSub"></TodoInput>
    <TodoList v-bind:propsdata="msgItems" v-on:remove-todo="removeTodo"></TodoList>
    <TodoFooter v-on:clearAllSub="clearAllSub"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  data(){
      return{
          msgItems:[]
      }
  },
  created(){
      this.clearAll(this.msgItems);
  },  
  methods:{
    clearAllSub(){
      this.clearAll(this.msgItems);
    },
    searchListSub(serachItem){
      this.searchList(this.msgItems, serachItem);
    },
    searchList(msgItems, serachItem){
      msgItems.splice(0);      
      this.$http.get('http://localhost:8080/telegram/msg/list', {params: {searchWord: serachItem}})
				.then((response) => {
					if(response.status==200) {
						return response.data;
					}				
					throw new Error('Network response was not ok');
				})
				.then((json) => {
					json.forEach(function(value, index){
            msgItems.push({
              messId: value.messId,
              messDate: value.messDate,
              messText: value.messText,
              messLan: value.messLan,
              messLastNm: value.messLastNm,
              messFirstNm: value.messFirstNm,
              chatId: value.chatId,
              isBot: value.isBot
            });
          });
				})
				.catch((error) => {
					console.log(error);
				});
    },
    removeTodo(messId, index){
     this.$http.delete('http://localhost:8080/telegram/msg/data/'+messId).then((response) => {
       if(response.status==200){
         alert("delete ok");
         this.msgItems.splice(index, 1);
       }else{
        alert("delete fail"); 
       }
      });
    },
    clearAll(msgItems){
      msgItems.splice(0);
      this.$http.get('http://localhost:8080/telegram/msg/list')
				.then((response) => {
					if(response.status==200) {
						return response.data;
					}				
					throw new Error('Network response was not ok');
				})
				.then((json) => {
					json.forEach(function(value, index){
            msgItems.push({
              messId: value.messId,
              messDate: value.messDate,
              messText: value.messText,
              messLan: value.messLan,
              messLastNm: value.messLastNm,
              messFirstNm: value.messFirstNm,
              chatId: value.chatId,
              isBot: value.isBot
            });
          });
				})
				.catch((error) => {
					console.log(error);
				});
    }
  },
  components:{
   'TodoHeader' : TodoHeader,
   'TodoInput' : TodoInput,
   'TodoList' : TodoList,
   'TodoFooter' : TodoFooter,
 }
}
</script>

<style>
body {
  text-align: center;
  background-color: #F6F6F8;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
