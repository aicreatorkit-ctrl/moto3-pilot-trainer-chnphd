
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { colors, borderRadius, spacing } from '@/styles/commonStyles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Button component con varianti e stati
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    disabled && styles.buttonDisabled,
    style,
  ];

  const textStyleCombined = [
    styles.buttonText,
    styles[`buttonText_${variant}`],
    styles[`buttonText_${size}`],
    disabled && styles.buttonTextDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.textInverse : colors.primary} />
      ) : (
        <Text style={textStyleCombined}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_primary: {
    backgroundColor: '#FF4444',
  },
  button_secondary: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF4444',
  },
  button_danger: {
    backgroundColor: colors.error,
  },
  button_small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  button_medium: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  button_large: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonText_primary: {
    color: colors.textInverse,
    fontSize: 17,
  },
  buttonText_secondary: {
    color: colors.text,
    fontSize: 17,
  },
  buttonText_outline: {
    color: '#FF4444',
    fontSize: 17,
  },
  buttonText_danger: {
    color: colors.textInverse,
    fontSize: 17,
  },
  buttonText_small: {
    fontSize: 14,
  },
  buttonText_medium: {
    fontSize: 17,
  },
  buttonText_large: {
    fontSize: 19,
  },
  buttonTextDisabled: {
    opacity: 0.7,
  },
});
