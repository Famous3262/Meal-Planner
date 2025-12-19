import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../utils/theme';
import { Typography } from '../ui/Typography';

export const MealCard = ({ type, meal, onSwap, onPress }) => {
    if (!meal) return (
        <View style={[styles.card, styles.emptyCard]}>
            <Typography variant="sm" color={THEME.colors.textMuted}>{type.toUpperCase()}</Typography>
            <Typography>No meal recommended.</Typography>
        </View>
    );

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            <Image source={{ uri: meal.image }} style={styles.image} />
            <View style={styles.info}>
                <Typography variant="sm" color={THEME.colors.secondary} style={styles.mealType}>
                    {type.toUpperCase()}
                </Typography>
                <Typography variant="lg" style={styles.name}>{meal.name}</Typography>

                <View style={styles.nutritionRow}>
                    <View style={[styles.badge, styles.calBadge]}>
                        <Typography variant="xs" color="#4338CA">{meal.nutrition.calories} kcal</Typography>
                    </View>
                    <View style={[styles.badge, styles.pBadge]}>
                        <Typography variant="xs" color="#047857">{meal.nutrition.protein}g P</Typography>
                    </View>
                    {meal.culture === 'african' && (
                        <View style={[styles.badge, { borderColor: THEME.colors.success }]}>
                            <Typography variant="xs" color={THEME.colors.success}>African Choice</Typography>
                        </View>
                    )}
                </View>
            </View>
            <View style={styles.footer}>
                <Typography variant="xs" color={THEME.colors.textMuted}>⏱ {meal.preparationTime} min</Typography>
                <TouchableOpacity style={styles.swapBtn} onPress={onSwap}>
                    <Typography variant="xs" color={THEME.colors.primary} style={{ fontWeight: '600' }}>Swap</Typography>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: THEME.radius.lg,
        marginBottom: THEME.spacing.md,
        borderWidth: 1,
        borderColor: THEME.colors.border,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    emptyCard: {
        padding: THEME.spacing.lg,
        borderStyle: 'dashed',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 150,
    },
    info: {
        padding: THEME.spacing.md,
    },
    mealType: {
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 4,
    },
    name: {
        marginBottom: THEME.spacing.sm,
    },
    nutritionRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: THEME.spacing.xs,
    },
    badge: {
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: THEME.radius.full,
        borderWidth: 1,
        borderColor: THEME.colors.border,
        backgroundColor: THEME.colors.background,
    },
    calBadge: { backgroundColor: '#EEF2FF', borderColor: '#C7D2FE' },
    pBadge: { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: THEME.spacing.sm,
        backgroundColor: '#F9FAFB',
        borderTopWidth: 1,
        borderTopColor: THEME.colors.border,
    },
    swapBtn: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: THEME.radius.full,
        borderWidth: 1,
        borderColor: THEME.colors.primary,
    }
});
