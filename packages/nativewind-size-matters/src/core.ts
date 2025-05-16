import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

let guidelineBaseWidth = 350;
let guidelineBaseHeight = 680;

export const initialUIScaleSize = (width: number, height: number) => {
  guidelineBaseWidth = width;
  guidelineBaseHeight = height;
};
export const getUIScaleSize = () => ({
  width: guidelineBaseWidth,
  height: guidelineBaseHeight,
});
export const scale = (size: number) =>
  (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;
