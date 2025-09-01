import CartCard from "@/components/CartCard";
import PaymentInfo from "@/components/PaymentInfo";
import CustomHeader from "@/components/shared/CustomHeader";
import BaseButton from "@/components/shared/form/BaseButton";
import { createOrder, createPaymentIntent } from "@/lib/appwrite";
import { useCartStore } from "@/store/cart.store";
import { useStripe } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import { Alert, FlatList, SafeAreaView, Text, View } from "react-native";

const Cart = () => {
  const { items, clearCart } = useCartStore();
  const { confirmPayment } = useStripe();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const calculateTotal = () => {
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const deliveryFee = 5.0;
    const discount = 0.5;
    return subtotal + deliveryFee - discount;
  };

  async function handlePayment() {
    if (items.length === 0) {
      Alert.alert(
        "Empty Cart",
        "Please add items to your cart before ordering."
      );
      return;
    }

    setIsProcessingPayment(true);

    try {
      const totalAmount = Math.round(calculateTotal() * 100); // Convert to cents
      const clientSecret = await createPaymentIntent(totalAmount, "usd");

      console.log("Client Secret:", clientSecret);

      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: {},
      });

      console.log("PaymentIntent:", paymentIntent);
      console.log("Error:", error);

      if (error) {
        Alert.alert(
          "Payment Failed",
          error.localizedMessage || "Something went wrong with the payment"
        );
      } else if (paymentIntent && paymentIntent.status === "Succeeded") {
        // Create order in Appwrite database
        const orderData = {
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image_url,
          })),
          total: calculateTotal(),
          paymentIntentId: paymentIntent.id,
          status: "confirmed",
          createdAt: new Date().toISOString(),
        };

        await createOrder(orderData);

        Alert.alert(
          "Order Successful!",
          "Your order has been placed successfully. You will receive a confirmation shortly.",
          [
            {
              text: "OK",
              onPress: () => clearCart(),
            },
          ]
        );
      }
    } catch (err) {
      console.error("Payment error:", err);
      Alert.alert(
        "Error",
        "Something went wrong while processing your payment. Please try again."
      );
    } finally {
      setIsProcessingPayment(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={items}
        contentContainerClassName="gap-5 px-5 pb-32 mt-5"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartCard item={item} />}
        ListHeaderComponent={() => (
          <CustomHeader title="Your Cart" className="mb-5" />
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center py-10">
            <Text className="text-gray-500">No results found</Text>
          </View>
        )}
        ListFooterComponent={() =>
          items.length > 0 && (
            <View className="gap-5">
              <View className="p-4 rounded-xl border border-slate-400 gap-1.5">
                <Text className="base-bold text-lg mb-3">Payment Summary</Text>

                <PaymentInfo
                  title={`Total Items (${items.length})`}
                  value={`$${items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}`}
                />
                <PaymentInfo title={`Delivery Fee`} value={`$5.00`} />
                <PaymentInfo
                  title={`Discount`}
                  value={`- $0.50`}
                  valueStyle="text-green-500"
                />

                <View className="border-t border-slate-400 my-4"></View>

                <PaymentInfo
                  title="Total"
                  titleStyle="font-bold text-lg text-black"
                  value={`$${calculateTotal().toFixed(2)}`}
                  valueStyle="text-xl"
                />
              </View>

              <BaseButton
                label="Order Now"
                isLoading={isProcessingPayment}
                onPress={handlePayment}
              />
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default Cart;
