import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import React from "react";

const CustomButton = ({
	title,
	textStyles,
	handlePress,
	containerStyles,
	isLoading,
}) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
				isLoading ? "opacity-50" : ""
			}`}>
			<Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
				{title}
			</Text>

			{isLoading && (
				<ActivityIndicator
					animating={isLoading}
					size='small'
					color='#fff'
					className='ml-2'
				/>
			)}
		</TouchableOpacity>
	);
};

export default CustomButton;
