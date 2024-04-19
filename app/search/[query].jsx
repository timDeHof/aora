import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Query = () => {
	const { query } = useLocalSearchParams();
	const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

	useEffect(() => {
		refetch();
	}, [query]);

	return (
		<>
			<SafeAreaView className='h-full bg-primary'>
				<FlatList
					data={posts}
					keyExtractor={(item) => item.$id}
					renderItem={({ item }) => <VideoCard video={item} />}
					ListHeaderComponent={() => (
						<View className='flex px-4 my-6'>
							<Text className='text-sm text-gray-100 font-pmedium'>
								Search Results
							</Text>
							<Text className='text-2xl text-white font-psemibold'>
								{query}
							</Text>
							<View className='mt-6 mb-8'>
								<SearchInput initialQuery={query} />
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

export default Query;
