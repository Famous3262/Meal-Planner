import { StyleSheet, Text } from 'react-native';
import { THEME } from '../../utils/theme';

export const Typography = ({
    children,
    variant = 'base',
    color = THEME.colors.textMain,
    style,
    ...props
}) => {
    return (
        <Text
            style={[
                styles.text,
                styles[variant],
                { color },
                style
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'System', // Use default for now, can add Inter later
    },
    xs: { fontSize: THEME.typography.xs },
    sm: { fontSize: THEME.typography.sm },
    base: { fontSize: THEME.typography.base },
    lg: { fontSize: THEME.typography.lg, fontWeight: '600' },
    xl: { fontSize: THEME.typography.xl, fontWeight: '700' },
    xxl: { fontSize: THEME.typography.xxl, fontWeight: '700' },
    xxxl: { fontSize: THEME.typography.xxxl, fontWeight: '800' },
});
