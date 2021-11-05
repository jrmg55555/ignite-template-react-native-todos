import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

import { light, dark } from "../styles/themes";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [darkTheme, setDarkTheme] = useState(false);

  function handleAddTask(newTaskTitle: string) {
    const existTask = tasks.find((task) => task.title === newTaskTitle);

    if (existTask) {
      return Alert.alert(
        "Task já cadastrada!",
        "Você não pode cadastrar uma task com o mesmo nome."
      );
    }

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updateTask = tasks.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done,
        };
      } else {
        return item;
      }
    });

    setTasks(updateTask);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Você tem certeza que deseja remover este item?",
      [
        {
          text: "Sim",
          onPress: () => {
            setTasks(tasks.filter((task) => task.id !== id));
          },
        },
        {
          text: "Não",
          style: "cancel",
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const searchTask = updatedTasks.find((task) => task.id === taskId);

    if (!searchTask) {
      return;
    }

    searchTask.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
