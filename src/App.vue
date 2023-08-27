<template>
  <div class="badass-todo">
    <div class="title has-text-centered">Badass Todo</div>
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
          <button class="button is-info" :disabled="!newTodoContent">
            Add
          </button>
        </div>
      </div>
    </form>

    <div
      v-for="todo in todos"
      :key="todo.id"
      class="card mb-5"
      :class="{ 'has-background-success-light': todo.done }"
    >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div
              class="column"
              :class="{ 'has-text-success line-through': todo.done }"
            >
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button
                @click="toggleDone(todo.id)"
                class="button"
                :class="todo.done ? 'is-success' : 'is-light'"
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
  </div>
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
.badass-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
.input {
  width: 300px;
}
.line-through {
  text-decoration: line-through;
}
</style>
