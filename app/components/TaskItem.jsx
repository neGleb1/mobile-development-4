import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TaskItem({ item, toggleTask }) {
    return (
        <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.taskItem}>
            <Text style={item.done ? styles.taskDone : styles.task}>{item.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  taskItem: { padding: 10, borderBottomWidth: 1 },
  task: { fontSize: 18 },
  taskDone: { fontSize: 18, textDecorationLine: "line-through", color: "gray" }
});