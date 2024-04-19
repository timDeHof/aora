import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Create = () => {
	return (
		<SafeAreaView className='h-full bg-primary'>
			<ScrollView className='px-4 my-6'>
				<Text>Create</Text>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Create;
