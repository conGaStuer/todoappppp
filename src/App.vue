<template>
  <body>
    <div class="bg"></div>
    <div class="badass-todo">
      <div class="todo-container">
        <div class="title has-text-centered">Todo</div>
        <form @submit.prevent="addTodo">
          <div class="field has-addons mb-5">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Add a todo  "
                v-model="newTodoContent"
              />
            </div>
            <div class="control">
              <button class="button is-info">Add</button>
            </div>
          </div>
        </form>
      </div>

      <div
        v-for="todo in todos"
        :key="todo.id"
        class="card mb-5"
        :class="{
          'has-background-light ': todo.done,
          'is-outlined': todo.done,
        }"
      >
        <div class="card-content">
          <div class="content">
            <div class="columns is-mobile is-vcentered">
              <div
                class="column"
                :class="{ 'has-text-dark line-through': todo.done }"
              >
                {{ todo.content }}
              </div>
              <div class="column is-5 has-text-right">
                <button
                  @click="toggleDone(todo.id)"
                  class="button"
                  :class="todo.done ? 'is-dark' : 'is-light'"
                >
                  &check;
                </button>
                <button
                  class="button is-danger ml-2"
                  @click="deleteTodo(todo.id)"
                >
                  &cross;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 class="footer-page">Made and design by ConGaStuer &#10084;</h3>
    </div>
  </body>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { db } from "@/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
/*
firebase ref
 */
const todoCollectionRef = collection(db, "todos");
const todoCollectionQuery = query(todoCollectionRef, orderBy("date", "desc"));
const todos = ref([
  // {
  //   id: "id1",
  //   content: "Shave my butt",
  //   done: false,
  // },
  // {
  //   id: "id2",
  //   content: "Wash my butt",
  //   done: true,
  // },
]);

/*
get todos
*/
onMounted(() => {
  onSnapshot(todoCollectionQuery, (querySnapshot) => {
    const fbTodo = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
      };
      fbTodo.push(todo);
    });
    todos.value = fbTodo;
  });
});

const newTodoContent = ref("");
const addTodo = () => {
  addDoc(todoCollectionRef, {
    content: newTodoContent.value,
    done: false,
    date: Date.now(),
  });

  newTodoContent.value = "";
};

const deleteTodo = (id) => {
  deleteDoc(doc(todoCollectionRef, id));
};
const toggleDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id);
  // Set the "capital" field of the city 'DC'
  updateDoc(doc(todoCollectionRef, id), {
    done: !todos.value[index].done,
  });
};
</script>

<style>
@import "bulma/css/bulma.min.css";

body {
  font-family: "Cabin", sans-serif;
  font-family: "Odibee Sans", cursive;
  text-transform: uppercase;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: hidden;
  position: relative;
}
.bg {
  width: 100%;
  height: 250px;
  background: url(../public/b1.jpg);
  background-size: 100%;
  background-position: center 25%;
  background-repeat: no-repeat;
  position: relative;
}
.badass-todo {
  max-width: 400px;
  overflow-y: auto;
  max-height: 450px;
  padding: 20px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0px 1px 3px 1px rgb(80, 79, 79);
  border-radius: 5px;
  position: relative;
  top: -220px;
}
.badass-todo::-webkit-scrollbar {
  display: none;
}
.title {
  letter-spacing: 9px;
  font-size: 50px;
  color: white;
  position: relative;
  top: 10px;
}
.input {
  width: 300px;
}
.input:focus {
  border: 1px solid black;
  box-shadow: 0px 1px 2px 1px rgb(130, 130, 130);
}
.line-through {
  text-decoration: line-through;
}
.todo-container {
  background-color: aqua;
  background: url(../public/b1.jpg);
  background-size: 100%;
  background-position: center 25%;
  background-repeat: no-repeat;
  border-radius: 5px;
}
.button.is-info {
  background-color: white;
  border: 1px solid black;
  color: black;
}
.button.is-info:hover {
  background-color: white;
  border: 1px solid black;
  color: black;
  box-shadow: 0px 1px 2px 1px rgb(130, 130, 130);
}
.button.is-info:focus {
  background-color: white;
  border: 1px solid black;
  color: black;
  box-shadow: 0px 1px 2px 1px rgb(130, 130, 130);
}
.footer-page {
  position: relative;
  text-align: center;
  text-transform: capitalize;
  top: 5px;
}
</style>
