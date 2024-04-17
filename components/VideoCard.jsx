import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { icons } from "../constants";

const VideoCard = ({
	video: {
		title,
		video,
		thumbnail,
		creators: { username, avatar },
	},
}) => {
	const [play, setPlay] = React.useState(false);
	return (
		<View className='flex-col items-center px-4 mb-14'>
			<View className='flex-row items-start gap-3'>
				<View className='flex-row items-center justify-center flex-1'>
					<View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5'>
						<Image
							source={{ uri: avatar }}
							className='w-full h-full rounded-lg'
							resizeMode='cover'
						/>
					</View>
					<View className='flex justify-center flex-1 ml-3 gap-y-1'>
						<Text
							className='text-sm text-white font-psemibold'
							numberOfLines={1}>
							{title}
						</Text>
						<Text
							className='text-sm text-white font-pregular'
							numberOfLines={1}>
							{username}
						</Text>
					</View>
				</View>
				<View className='pt-2'>
					<Image source={icons.menu} className='w-5 h-5' resizeMode='contain' />
				</View>
			</View>
			{play ? (
				<Text>Playing</Text>
			) : (
				<TouchableOpacity className='w-full rounded-lg h-60'>
					<Image
						source={{ uri: thumbnail }}
						className='w-full h-full mt-3 rounded-xl'
						resizeMode='cover'
					/>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default VideoCard;
