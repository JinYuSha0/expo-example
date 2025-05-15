import { usePortal } from "@/components/Portal";
import { useConfirm } from "@/hooks/useModal";
import { useCallback } from "react";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const { showWithOverlay } = usePortal();
  const showConfirm = useConfirm();
  const onPress = useCallback(async () => {
    try {
      showConfirm({
        title: "Are you sure?",
        content: "balabalabala....",
      });
    } catch (err) {
      console.log(err);
    }
  }, [showConfirm]);
  return (
    <View className="flex flex-1 bg-background">
      <Pressable onPress={onPress}>
        <Text>Test Portal</Text>
      </Pressable>
    </View>
  );
}
