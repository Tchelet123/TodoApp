import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import InputRow from "./components/InputRow";
import CompleteMessage from "./components/completeMessage";
import { FilterType, TaskItemProps } from "./assets/types";
import TaskItem from "./components/TaskItem";
import FilterButtons from "./components/FilterButtons";
import ColorFilterTabs from "./components/ColorFilterTabs";


const STORAGE_KEY = "todos";

export default function App() {
  const [tasksList, setTodos] = useState<TaskItemProps[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [colorFilter, setColorFilter] = useState<string | null>(null);
  const [showWellDone, setShowWellDone] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setTodos(JSON.parse(stored));
      } catch (e) {
        console.error("Load todos error:", e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasksList));
      } catch (e) {
        console.error("Save todos error:", e);
      }
    })();
  }, [tasksList]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: input,
        completed: false,
        tagColor: selectedColor,
      },
    ]);
    setInput("");
    setSelectedColor(null);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          const newCompleted = !todo.completed;
          if (newCompleted) {
            setShowWellDone(true);
            setTimeout(() => setShowWellDone(false), 1500);
          }
          return { ...todo, completed: newCompleted };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filterTasksList = tasksList.filter((todo) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Completed" && todo.completed) ||
      (filter === "Incomplete" && !todo.completed);
    const matchesColor = !colorFilter || todo.tagColor === colorFilter;
    return matchesFilter && matchesColor;
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <CompleteMessage show={showWellDone} />
      <Text style={styles.mainTitle}>🎯 Task Master</Text>

      <InputRow
        inputValue={input}
        onInputChange={setInput}
        onAddTodo={addTodo}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
      />

      <FilterButtons filter={filter} onFilterChange={setFilter} />

      <ColorFilterTabs
        colorFilter={colorFilter}
        onColorFilterChange={setColorFilter}
      />
      {filterTasksList.length == 0 && (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyList}>No tasks yet… </Text>
          <Text style={styles.emptyList}>Ready to start your journey?</Text>
        </View>
      )}
      <FlatList
        data={filterTasksList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            todo={item}
            onTaskPress={toggleTodo}
            onDelete={deleteTodo}
          />
        )}
        style={{ flex: 1,marginBottom:50, }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0f6",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
    color: "#d63031",
  },
  emptyListContainer: {
    position: "absolute",
    top: 400,
    left: 0,
    right: 0,
    alignItems: "center",
    
  },
  emptyList: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fd79a8",
    backgroundColor: "black",
    padding: 10,
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
    borderRadius:40,
  },
});
