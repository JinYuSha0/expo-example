import React from "react";
import { Pressable, Text, View } from "react-native";

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
  return (
    <View className="w-[315@s] rounded-[16@s] bg-card overflow-hidden">
      <View className="flex justify-center items-center border-b border-b-border p-[12@s]">
        <Text className="text-[16@s]">{title}</Text>
      </View>
      {!!content && (
        <View className="p-[16@s]">
          <Text className="text-[14@s]">{content}</Text>
        </View>
      )}
      <View className="flex flex-row border-t border-t-border w-full h-[46@s]">
        <Pressable
          className="flex flex-1 justify-center items-center"
          onPress={onOk}
        >
          <Text className="text-[16@s]">{okText ?? "Ok"}</Text>
        </Pressable>
        <View className="w-[1] h-full bg-border" />
        <Pressable
          className="flex flex-1 justify-center items-center"
          onPress={onCancel}
        >
          <Text className="text-[16@s]">{cancelText ?? "Cancel"}</Text>
        </Pressable>
      </View>
    </View>
  );
};
