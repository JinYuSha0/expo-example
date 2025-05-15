import clsx from "clsx";
import React, { memo, ReactNode, useCallback, useEffect } from "react";
import { BackHandler, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface OverlayProps {
  children: ReactNode | undefined;
  name: string;
  closeable?: boolean;
  overlayPressCloaseable?: boolean;
  orientation?:
    | "leftTop"
    | "leftMiddle"
    | "leftBottom"
    | "centerTop"
    | "centerMiddle"
    | "centerBottom"
    | "rightTop"
    | "rightMiddle"
    | "rightBottom";
  bgColor?: string;
  onClose: (error: Error) => void;
  handleBack: () => boolean;
}

export class PortalCloseError extends Error {}

const Overlay: React.FC<OverlayProps> = ({
  children,
  name,
  closeable = true,
  overlayPressCloaseable = true,
  orientation = "centerMiddle",
  bgColor = "bg-black/40",
  onClose,
  handleBack,
}) => {
  const close = useCallback(() => {
    if (!closeable || !overlayPressCloaseable) return;
    onClose(new PortalCloseError(`${name} Close by overlayPress`));
  }, [name, closeable, overlayPressCloaseable, onClose]);
  useEffect(() => {
    if (!closeable) return;
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        const isHandle = handleBack();
        if (isHandle)
          onClose(new PortalCloseError(`${name} Close by hardwareBackPress`));
        return isHandle;
      }
    );
    return subscription.remove;
  }, [name, closeable, handleBack, onClose]);
  return (
    <Pressable
      onPress={close}
      className={clsx("absolute inset-0 flex flex-row", bgColor, {
        "justify-start items-start": orientation === "leftTop",
        "justify-start items-center": orientation === "leftMiddle",
        "justify-start items-end": orientation === "leftBottom",
        "justify-center items-start": orientation === "centerTop",
        "justify-center items-center": orientation === "centerMiddle",
        "justify-center items-end": orientation === "centerBottom",
        "justify-end items-start": orientation === "rightTop",
        "justify-end items-center": orientation === "rightMiddle",
        "justify-end items-end": orientation === "rightBottom",
      })}
    >
      <SafeAreaView>{children}</SafeAreaView>
    </Pressable>
  );
};

export default memo(Overlay);
