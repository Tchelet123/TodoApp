import React from 'react';
import { View, TouchableOpacity, StyleSheet,Text } from 'react-native';

const tagColors = ['#ff7675', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe', '#fd79a8'];

interface Props {
  colorFilter: string | null;
  onColorFilterChange: (color: string | null) => void;
}

export default function ColorFilterTabs({ colorFilter, onColorFilterChange }: Props) {
  return (
    <View style={styles.colorFilters}>
        <Text>Filter by color:</Text>
      {tagColors.map(color => (
        <TouchableOpacity
          key={color}
          onPress={() => onColorFilterChange(colorFilter === color ? null : color)}
          style={[styles.colorFilterTab, colorFilter === color && styles.activeColorFilter]}
        >
          <View style={[styles.colorDotSmall, { backgroundColor: color }]} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  colorFilters: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
  },
  colorFilterTab: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfe6e9',
  },
  activeColorFilter: {
    borderWidth: 2,
    borderColor: '#2d3436',
  },
  colorDotSmall: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
