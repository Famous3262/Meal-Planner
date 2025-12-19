import { ScrollView, StyleSheet, View } from 'react-native';
import { THEME } from '../../../utils/theme';
import { Typography } from '../../ui/Typography';

export const ShoppingList = ({ plan }) => {
    if (!plan) return <Typography>Plan your meals first!</Typography>;

    const ingredients = Object.values(plan)
        .filter(m => m)
        .flatMap(m => m.ingredients);

    const grouped = ingredients.reduce((acc, curr) => {
        const key = curr.name.toLowerCase();
        if (!acc[key]) {
            acc[key] = { ...curr };
        } else {
            acc[key].amount = (parseFloat(acc[key].amount) + parseFloat(curr.amount)).toString();
        }
        return acc;
    }, {});

    return (
        <View style={styles.container}>
            <Typography variant="xxl" style={styles.title}>Grocery List</Typography>
            <Typography color={THEME.colors.textMuted} style={styles.subtitle}>
                Everything you need for today's plan.
            </Typography>

            <ScrollView showsVerticalScrollIndicator={false}>
                {Object.values(grouped).map((item, i) => (
                    <View key={i} style={styles.item}>
                        <View style={styles.checkbox} />
                        <Typography style={{ flex: 1 }}>{item.name}</Typography>
                        <Typography color={THEME.colors.primary} style={{ fontWeight: '700' }}>
                            {item.amount} {item.unit}
                        </Typography>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: THEME.colors.primary,
    },
    subtitle: {
        marginBottom: THEME.spacing.xl,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: THEME.spacing.md,
        backgroundColor: 'white',
        borderRadius: THEME.radius.md,
        marginBottom: THEME.spacing.sm,
        borderWidth: 1,
        borderColor: THEME.colors.border,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: THEME.colors.border,
        marginRight: THEME.spacing.md,
    }
});
