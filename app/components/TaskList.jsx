import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TaskItem from "./TaskItem";

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");
  
    useEffect(() => {
      loadTasks();
    }, []);
  
    useEffect(() => {
      saveTasks();
    }, [tasks]);
  
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem("tasks");
        if (savedTasks) setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error("Failed to load tasks", error);
      }
    };
  
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to save tasks", error);
      }
    };
  
    const addTask = () => {
      if (taskText.trim()) {
        setTasks([...tasks, { id: Date.now().toString(), text: taskText, done: false }]);
        setTaskText("");
      }
    };
  
    const toggleTask = (id) => {
      setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todo List</Text>
        <TextInput
          style={styles.input}
          value={taskText}
          onChangeText={setTaskText}
          placeholder="Enter a task"
        />
        <Button title = "Add Task" onPress = {addTask} />
        <FlatList
          data = {tasks}
          keyExtractor = {(item) => item.id}
          renderItem = {({ item }) => <TaskItem item = {item} toggleTask = {toggleTask} />}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, width: "100%", backgroundColor: "#fff" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }
});