import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../../utils/theme';
import { Typography } from './Typography';

export const Button = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style
}) => {
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity
            style={[
                styles.button,
                isPrimary ? styles.primary : styles.secondary,
                disabled && styles.disabled,
                style
            ]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={isPrimary ? 'white' : THEME.colors.primary} />
            ) : (
                <Typography
                    variant="base"
                    color={isPrimary ? 'white' : THEME.colors.primary}
                    style={{ fontWeight: '600' }}
                >
                    {title}
                </Typography>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: THEME.spacing.md,
        paddingHorizontal: THEME.spacing.lg,
        borderRadius: THEME.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    primary: {
        background: THEME.colors.primary, // Note: Use backgroundColor in RN
        backgroundColor: THEME.colors.primary,
    },
    secondary: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: THEME.colors.border,
    },
    disabled: {
        opacity: 0.5,
    },
});
