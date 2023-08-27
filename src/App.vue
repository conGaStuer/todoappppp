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
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
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
const newTodoContent = ref("");
const addTodo = () => {
  const newTodo = {
    id: uuidv4(),
    content: newTodoContent.value,
    done: false,
  };

  todos.value.unshift(newTodo);
  newTodoContent.value = "";
};

const deleteTodo = (id) => {
  console.log(id);
  todos.value = todos.value.filter((todo) => todo.id !== id);
};
const toggleDone = (id) => {
  console.log(id);
  const index = todos.value.findIndex((todo) => todo.id === id);
  todos.value[index].done = !todos.value[index].done;
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
