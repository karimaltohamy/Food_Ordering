import BaseButton from "@/components/shared/form/BaseButton";
import BaseInput from "@/components/shared/form/BaseInput";
import { createUser } from "@/lib/appwrite";
import { SignUpSchema } from "@/utils/validation/auth";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import { Alert, Text, View } from "react-native";

const SignIUp = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      Alert.alert("Success", "User created successfully");
      router.replace("/");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
      console.log(error);
    },
  });

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      mutate({
        email: values.email,
        password: values.password,
        name: values.full_name,
      });
    },
  });

  return (
    <View className="p-5 gap-2">
      <BaseInput
        label="Full Name"
        value={formik.values.full_name}
        onChangeText={formik.handleChange("full_name")}
        onBlur={formik.handleBlur("full_name")}
        placeholder="Enter your full name"
        keyboardType="default"
        error={
          formik.touched.full_name && formik.errors.full_name
            ? formik.errors.full_name
            : undefined
        }
      />
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
        label="Sign Up"
        onPress={formik.handleSubmit as any}
        isLoading={isPending}
        disabled={!formik.isValid || isPending}
      />

      <Text className="text-gray-500 text-center mt-5">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary">
          Sign In
        </Link>
      </Text>
    </View>
  );
};

export default SignIUp;
