import { View, Text, ScrollView, Dimensions, Image } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
const Signup = () => {
	const [isSubmitting, setSubmitting] = useState(false);
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});

	return (
		<SafeAreaView className='h-full bg-primary'>
			<ScrollView>
				<View
					className='flex justify-center w-full h-full px-4 my-6'
					style={{
						minHeight: Dimensions.get("window").height - 100,
					}}>
					<Image
						source={images.logo}
						resizeMode='contain'
						className='w-[115px] h-[34px]'
					/>

					<Text className='mt-10 text-2xl font-semibold text-white font-psemibold'>
						Sign Up to Aora
					</Text>

					<FormField
						title='Username'
						value={form.username}
						handleChangeText={(e) => setForm({ ...form, username: e })}
						otherStyles='mt-10'
					/>

					<FormField
						title='Email'
						value={form.email}
						handleChangeText={(e) => setForm({ ...form, email: e })}
						otherStyles='mt-7'
						keyboardType='email-address'
					/>

					<FormField
						title='Password'
						value={form.password}
						handleChangeText={(e) => setForm({ ...form, password: e })}
						otherStyles='mt-7'
					/>

					<CustomButton
						title='Sign Up'
						handlePress={() => {}}
						containerStyles='mt-7'
						isLoading={isSubmitting}
					/>

					<View className='flex flex-row justify-center gap-2 pt-5'>
						<Text className='text-lg text-gray-100 font-pregular'>
							Have an account already?
						</Text>
						<Link
							href='/sign-in'
							className='text-lg font-psemibold text-secondary'>
							Login
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Signup;
