import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Region } from 'react-native-maps';
import { Emoji, emojis } from '@/constants/Emojis';
import { fontSize, FontSize } from '@/constants/Fonts';

interface FakeMarkerProps {
  icon?: Emoji;
  region: Region;
  size?: FontSize;
  shadow?: boolean;
  onLoading: boolean;
}

export default function FakeMarker({
  icon = 'epingle',
  region,
  size = 'xlarge',
  shadow = false,
  onLoading = false,
}: FakeMarkerProps) {
  return (
    <View style={styles.container}>
      <Pressable>
        {onLoading ? (
          <ActivityIndicator
            style={styles.indicator}
            color={'red'}
          />
        ) : (
          <Text
            style={[styles.marker, { fontSize: fontSize[size] }, shadow ? styles.shadow : null]}
          >
            {emojis[icon]}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  calloutContainer: {
    position: 'relative',
  },
  marker: {},
  shadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  indicator: {
    zIndex: 3,
  },
});
