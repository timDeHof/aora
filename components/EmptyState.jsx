import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import { images } from "../constants";
const EmptyState = ({ title, subtitle }) => {
	return (
		<View className='flex items-center justify-center px-4'>
			<Image
				source={images.empty}
				className='w-[270px] h-[216px]'
				resizeMode='contain'
			/>
			<Text className='text-sm text-gray-100 font-pmedium'>{title}</Text>
			<Text className='mt-2 text-xl text-center text-white font-psemibold'>
				{subtitle}
			</Text>

			<CustomButton
				title='Create video'
				handlePress={() => {
					router.push("/create");
				}}
				containerStyles='w-full my-5'
			/>
		</View>
	);
};

export default EmptyState;
