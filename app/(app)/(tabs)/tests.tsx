import CircleButton from '@/components/drafts/CircleButton';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useState } from 'react';
import { Text, View } from 'react-native';

export default function Tests() {
	const colorPool = [
		'#222',
		'#333',
		'#444',
		'#555',
		'#666',
		'#777',
		'#888',
		'#999',
		'#aaa',
		'#bbb',
		'#ccc',
		'#ddd',
		'#eee',
		'#fff',
	];
	const colors = useThemeColor('light');
	const [count, setCount] = useState(0);
	const [bgColor, setBgColor] = useState(0);

	function handleRandomColor() {
		const index = Math.floor(Math.random() * colorPool.length);
		setBgColor(index);
	}

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: colors['background-1'],
			}}
		>
			<Text style={{ fontSize: 30, color: colors['text-primary'] }}>Hello</Text>
			<Text style={{ fontSize: 30, color: colors['text-primary'] }}>
				{count}
			</Text>
			<CircleButton
				color='primary-1'
				style={{ marginTop: 20 }}
				iconName='add'
				onPress={() => {
					setCount(count + 1);
					// handleRandomColor();
				}}
			></CircleButton>
		</View>
	);
}
