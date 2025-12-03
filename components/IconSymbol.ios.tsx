
import { SymbolView, SymbolViewProps, SymbolWeight } from "expo-symbols";
import { StyleProp, ViewStyle } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export function IconSymbol({
  ios_icon_name,
  android_material_icon_name,
  name,
  size = 24,
  color,
  style,
  weight = "regular",
}: {
  ios_icon_name?: SymbolViewProps["name"];
  android_material_icon_name?: React.ComponentProps<typeof MaterialIcons>["name"];
  name?: SymbolViewProps["name"];
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  // Use ios_icon_name if provided, otherwise fallback to name
  const iconName = ios_icon_name || name;
  
  if (!iconName) {
    console.warn('IconSymbol: No icon name provided');
    return null;
  }

  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={iconName}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
