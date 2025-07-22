import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FilterType } from '../assets/types';

interface Props {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function FilterButtons({ filter, onFilterChange }: Props) {
  return (
    <View style={styles.filters}>
      {(['All', 'Completed', 'Incomplete'] as FilterType[]).map(f => (
        <TouchableOpacity
          key={f}
          onPress={() => onFilterChange(f)}
          style={[styles.filterButton, filter === f && styles.activeFilter]}
        >
          <Text style={styles.filterText}>{f}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#ffeaa7',
  },
  activeFilter: {
    backgroundColor: '#fd79a8',
  },
  filterText: {
    fontWeight: 'bold',
    color: '#2d3436',
  },
});
