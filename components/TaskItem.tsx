import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TaskItemProps } from '../assets/types';

interface Props {
  todo: TaskItemProps;
  onTaskPress: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ todo, onTaskPress, onDelete }: Props) {
  return (
 
    <View style={styles.todoItem}>
      <TouchableOpacity style={styles.todoLeft} onPress={() => onTaskPress(todo.id)}>
        <View style={[styles.circle, todo.completed && styles.circleCompleted]}>
          {todo.completed && <AntDesign name="check" size={16} color="white" />}
        </View>
        <Text style={[styles.todoText, todo.completed && styles.completedText]}>{todo.text}</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {todo.tagColor && <View style={[styles.tag, { backgroundColor: todo.tagColor, marginRight: 10 }]} />}
        <TouchableOpacity onPress={() => onDelete(todo.id)} style={styles.deleteButton}>
          <AntDesign name="delete" size={20} color="#d63031" />
        </TouchableOpacity>
      </View>
     </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    backgroundColor: '#FFF9E3',
    marginVertical: 6,
    padding: 12,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  todoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#2d3436',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleCompleted: {
    backgroundColor: '#55efc4',
    borderColor: '#55efc4',
  },
  todoText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2d3436',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#636e72',
  },
  tag: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  deleteButton: {
    padding: 6,
  },
});
