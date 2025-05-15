import React from "react";
import { View } from "react-native";

export interface ConfirmModalProps {
  title: React.ReactNode;
  content?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  content,
  okText,
  cancelText,
  onOk,
  onCancel,
}) => {
  console.log(111);
  return (
    <View className="w-10/12 h-[200px] rounded-lg bg-red-300">
      {/* <View className="flex justify-center items-center border-b-border border-b-1">
        <Text>{title}</Text>
      </View>
      {!!content && (
        <View className="p-4">
          <Text>{content}</Text>
        </View>
      )}
      <View className="flex flex-row">
        <Pressable className="flex felx-1" onPress={onOk}>
          <Text>{okText ?? "Ok"}</Text>
        </Pressable>
        <Pressable className="flex felx-1" onPress={onCancel}>
          <Text>{cancelText ?? "Cancel"}</Text>
        </Pressable>
      </View> */}
    </View>
  );
};
