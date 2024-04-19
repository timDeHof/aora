import { View, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import EmptyState from "../../components/EmptyState";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import InfoBox from "../../components/InfoBox";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import { router } from "expo-router";
const Profile = () => {
	const { user, setUser, setIsLoggedIn } = useGlobalContext();
	const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

	const logout = async () => {
		await signOut();
		setUser(null);
		setIsLoggedIn(false);
		router.replace("/sign-in");
	};
	return (
		<>
			<SafeAreaView className='h-full bg-primary'>
				<FlatList
					data={posts}
					keyExtractor={(item) => item.$id}
					renderItem={({ item }) => <VideoCard video={item} />}
					ListHeaderComponent={() => (
						<View className='items-center justify-center w-full px-4 mt-6 mb-12'>
							<TouchableOpacity
								className='items-end w-full mb-10'
								onPress={logout}>
								<Image
									source={icons.logout}
									className='w-6 h-6'
									resizeMode='contain'
								/>
							</TouchableOpacity>
							<View className='items-center justify-center w-16 h-16 border rounded-lg border-secondary'>
								<Image
									source={{ uri: user?.avatar }}
									className='w-[90%] h-[90%] rounded-lg'
									resizeMode='cover'
								/>
							</View>
							<InfoBox
								title={user?.username}
								containerStyles='mt-5'
								titleStyles='text-lg'
							/>
							<View className='flex-row mt-5'>
								<InfoBox
									title={posts.length || 0}
									subtitle='Posts'
									containerStyles='mr-10'
									titleStyles='text-xl'
								/>
								<InfoBox
									title='1.2k'
									subtitle='Followers'
									titleStyles='text-xl'
								/>
							</View>
						</View>
					)}
					ListEmptyComponent={() => (
						<EmptyState
							title='No videos found'
							subtitle='No Videos found for this query'
						/>
					)}
				/>
			</SafeAreaView>
			<StatusBar backgroundColor='#161622' style='light' />
		</>
	);
};

export default Profile;
