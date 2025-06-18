import { useConfirm } from "@/hooks/useModal";
import { useCallback } from "react";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const showConfirm = useConfirm();
  const onPress = useCallback(async () => {
    try {
      const result = await showConfirm({
        title: "Are you sure?",
        content: "balabalabala....",
        overlay: {
          // overlayPressCloaseable: false,
          bgColor: "rgba(0,0,0,0.2)",
          // orientation: "centerBottom",
        },
      });
      console.log(`you chose ${result}`);
    } catch (err) {
      console.log(err);
    }
  }, [showConfirm]);
  return (
    <View className="flex flex-1 bg-background">
      <Pressable onPress={onPress}>
        <Text className="text-[16@s] text-red-600">Test Portal</Text>
      </Pressable>

      <View className="w-[350px] h-[350px] bg-red-300"></View>
      <View className="w-[350] h-[350] border-red-500 bg-yellow-300"></View>
    </View>
  );
}
