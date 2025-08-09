import { Redirect, Slot } from "expo-router";
import React from "react";

const AppLayout = () => {
  const isAuthenticated = false;

  if (!isAuthenticated) return <Redirect href="/(auth)/sign-in" />;
  return <Slot />;
};

export default AppLayout;
