import { Link, router } from "expo-router";
import { View, Text, Image, ScrollView, Dimensions, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signIn } from "../../lib/appwrite";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
const Signin = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [form, setForm] = useState({ email: "", password: "" });

	const submit = async () => {
		if (!form.email || !form.password) {
			Alert.alert("Error", "Please fill all fields");
			return;
		}
		setIsSubmitting(true);
		try {
			const result = await signIn(form.email, form.password);
			// set it to global state..
			router.replace("/home");
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView className='h-full bg-primary'>
			<ScrollView>
				<View
					className='flex justify-center w-full min-h-[85vh] px-4 my-6'
					style={{
						minHeight: Dimensions.get("window").height - 100,
					}}>
					<Image
						source={images.logo}
						resizeMode='contain'
						className='w-[115px] h-[34px]'
					/>
					<Text className='mt-10 text-2xl font-semibold text-white font-psemibold'>
						Log in to Aora{" "}
					</Text>
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
						keyboardType='visible-password'
					/>

					<CustomButton
						title='Log In'
						handlePress={submit}
						containerStyles='mt-7'
						isLoading={isSubmitting}
					/>
					<View className='flex flex-row justify-center gap-2 pt-5'>
						<Text className='text-lg text-gray-100 font-pregular'>
							Don't have an account?
						</Text>
						<Link
							href='/sign-up'
							className='text-lg font-psemibold text-secondary'>
							Signup
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Signin;
