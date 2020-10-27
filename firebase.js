
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDE_O5p2wYbsDnnqGga11XXZxpOp1nLmlI", //Most important part; adjust for each firebase account
    authDomain: "test-17c76.firebaseapp.com",
    databaseURL: "https://test-17c76.firebaseio.com",
    projectId: "test-17c76",
    storageBucket: "",
    messagingSenderId: "855722645833"
  };
  firebase.initializeApp(config); //Used to initialize the vue app with firebase

let db= firebase.firestore(); //Set the database to the firebase with Firestore function 

// Create Vue component
var todoList = new Vue({ //Establishing new Vue app
  el: '#todo', //This points to the html element that we mounting the Vue instance to 
  data: {
    newTodoText:'', //List of to dos  They have a test value 

    todos:[
      {
        text: 'Teach Firebase',
      }
    ],
  },
  created() { //Data function to create fetchTodos() function we are going to create to get the todo 
    this.fetchTodos();
  },
   methods: { //Next after data is the methods/functions we are going to use 
    
    async addTodo() { //Add ToDos from db collection  .add adds an instance of the new todo value   This – refers to the current Vue instance
      let docRef = await db.collection('todos').add({
        text: this.newTodoText
      })
      this.newTodoText = '';
      await this.fetchTodos()
    },
      
    async fetchTodos() { //Fetch the todos from database with .get()
      let querySnapshot = await db.collection('todos').get()
      this.todos = querySnapshot.docs.map(doc=>{ //Extract the id and text of each document
        let data = doc.data()
        return {
          id: doc.id,
          text: data.text
        }
      })
    },
    
    async removeTodo(id) { //Remove the value based on the id looking in the collection based on id then delete function  return empty todo
      await db.collection('todos').doc(id).delete()
      await this.fetchTodos()
    },
  }
})
  
