import BaseButton from "@/components/shared/form/BaseButton";
import BaseInput from "@/components/shared/form/BaseInput";
import { signIn } from "@/lib/appwrite";
import { SignInSchema } from "@/utils/validation/auth";
import useAuthStore from "@/store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const { fetchUser } = useAuthStore();
  
  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: async () => {
      Alert.alert("Success", "User signed in successfully");
      await fetchUser();
      router.push("/");
      console.log("User signed in successfully");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
      console.log(error);
    },
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      mutate({
        email: values.email,
        password: values.password,
      });
    },
  });

  return (
    <View className="p-5 gap-5">
      <BaseInput
        label="Email"
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        placeholder="Enter your email"
        keyboardType="email-address"
        secureTextEntry={false}
        error={
          formik.touched.email && formik.errors.email
            ? formik.errors.email
            : undefined
        }
        autoCapitalize="none"
      />

      <BaseInput
        label="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        placeholder="Enter your password"
        secureTextEntry
        keyboardType="default"
        error={
          formik.touched.password && formik.errors.password
            ? formik.errors.password
            : undefined
        }
      />

      <BaseButton
        label="Sign In"
        onPress={formik.handleSubmit as any}
        isLoading={isPending}
        disabled={!formik.isValid || isPending}
      />

      <Text className="text-gray-500 text-center mt-5">
        Don{"'"}t have an account?{" "}
        <Link href="/sign-up" className="text-primary">
          Sign Up
        </Link>
      </Text>
    </View>
  );
};

export default SignIn;
