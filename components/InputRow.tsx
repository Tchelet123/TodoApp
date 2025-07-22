import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const tagColors = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe', '#fd79a8'];

interface Props {
  inputValue: string;
  onInputChange: (text: string) => void;
  onAddTodo: () => void;
  selectedColor: string | null;
  onSelectColor: (color: string | null) => void;
}

export default function InputRow({ inputValue, onInputChange, onAddTodo, selectedColor, onSelectColor }: Props) {
  return (
    <>
      <View style={styles.inputRow}>
        <TextInput
          value={inputValue}
          onChangeText={onInputChange}
          placeholder="What's your next mission?"
          style={styles.input}
        />
        <TouchableOpacity onPress={onAddTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.colorPickerRow}>
        {tagColors.map(color => (
          <TouchableOpacity
            key={color}
            style={[styles.colorDot, { backgroundColor: color, borderWidth: selectedColor === color ? 2 : 0 }]}
            onPress={() => onSelectColor(selectedColor === color ? null : color)}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#fab1a0',
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#fd79a8',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 12,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  colorPickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 8,
  },
  colorDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});
