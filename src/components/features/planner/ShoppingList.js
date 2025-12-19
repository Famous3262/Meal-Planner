import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../../utils/theme';
import { Typography } from '../../ui/Typography';

export const ShoppingList = ({ plan }) => {
    const [checkedItems, setCheckedItems] = useState({});

    if (!plan) return (
        <View style={styles.centered}>
            <Typography>Plan your meals first!</Typography>
        </View>
    );

    const toggleItem = (name) => {
        setCheckedItems(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const ingredients = Object.values(plan)
        .filter(m => m)
        .flatMap(m => m.ingredients);

    const grouped = ingredients.reduce((acc, curr) => {
        const key = curr.name.toLowerCase();
        if (!acc[key]) {
            acc[key] = { ...curr };
        } else {
            // Check if units are the same before adding
            if (acc[key].unit === curr.unit) {
                acc[key].amount = (parseFloat(acc[key].amount) + parseFloat(curr.amount)).toString();
            }
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
                {Object.values(grouped).length === 0 ? (
                    <Typography>No ingredients found.</Typography>
                ) : (
                    Object.values(grouped).map((item, i) => {
                        const isChecked = checkedItems[item.name];
                        return (
                            <TouchableOpacity
                                key={i}
                                style={[styles.item, isChecked && styles.itemChecked]}
                                onPress={() => toggleItem(item.name)}
                            >
                                <View style={[styles.checkbox, isChecked && styles.checkboxActive]} />
                                <Typography style={[styles.itemName, isChecked && styles.textChecked]}>
                                    {item.name}
                                </Typography>
                                <Typography
                                    color={isChecked ? THEME.colors.textMuted : THEME.colors.primary}
                                    style={{ fontWeight: '700' }}
                                >
                                    {item.amount} {item.unit}
                                </Typography>
                            </TouchableOpacity>
                        );
                    })
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: THEME.colors.primary,
        fontWeight: '800',
    },
    subtitle: {
        marginBottom: THEME.spacing.lg,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: THEME.spacing.md,
        backgroundColor: 'white',
        borderRadius: THEME.radius.lg,
        marginBottom: THEME.spacing.sm,
        borderWidth: 1,
        borderColor: THEME.colors.border,
    },
    itemChecked: {
        backgroundColor: '#F3F4F6',
        borderColor: '#E5E7EB',
        opacity: 0.8,
    },
    itemName: {
        flex: 1,
        fontSize: 16,
    },
    textChecked: {
        textDecorationLine: 'line-through',
        color: THEME.colors.textMuted,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: THEME.colors.border,
        marginRight: THEME.spacing.md,
        backgroundColor: 'white',
    },
    checkboxActive: {
        backgroundColor: THEME.colors.success,
        borderColor: THEME.colors.success,
    }
});
