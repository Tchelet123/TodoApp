import React, { useEffect, useState } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

interface Props {
  show: boolean;
}

export default function CompleteMessage({ show }: Props) {
  const [anim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (show) {
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.delay(1000),
        Animated.timing(anim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    }
  }, [show]);

  if (!show) return null;

  return (
    <Animated.View style={[styles.completeMessageContainer, { opacity: anim }]}>
      <Text style={styles.wellDoneText}>🌟 WELL DONE! 🌟</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  completeMessageContainer: {
    position: 'absolute',
    top: 400,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  wellDoneText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fd79a8',
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
});
