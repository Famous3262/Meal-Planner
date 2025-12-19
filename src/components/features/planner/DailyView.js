import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { recommendMealsForDay } from '../../../utils/recommendationEngine';
import { THEME } from '../../../utils/theme';
import { Typography } from '../../ui/Typography';
import { MealCard } from './MealCard';
import { MealDetail } from './MealDetail';

export const DailyView = ({ profile, plan, onPlanUpdate }) => {
    const [selectedMeal, setSelectedMeal] = useState(null);

    const handleSwap = (type) => {
        const currentIds = Object.values(plan).filter(m => m).map(m => m.id);
        const newPlan = recommendMealsForDay(profile, currentIds);
        onPlanUpdate({
            ...plan,
            [type]: newPlan[type] || plan[type]
        });
    };

    if (!plan) return <Typography>Generating plan...</Typography>;

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.dayHeader}>
                    <Typography variant="xl">Today's Meals</Typography>
                    <Typography color={THEME.colors.textMuted}>
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </Typography>
                </View>

                {['breakfast', 'lunch', 'dinner', 'snack'].map(type => (
                    <MealCard
                        key={type}
                        type={type}
                        meal={plan[type]}
                        onSwap={() => handleSwap(type)}
                        onPress={() => setSelectedMeal(plan[type])}
                    />
                ))}

                <View style={styles.summary}>
                    <Typography variant="lg">Daily Totals</Typography>
                    <Typography variant="xxl" color={THEME.colors.primary}>
                        {Object.values(plan).filter(m => m).reduce((a, b) => a + b.nutrition.calories, 0)} kcal
                    </Typography>
                </View>
            </ScrollView>

            <MealDetail
                visible={!!selectedMeal}
                meal={selectedMeal}
                profile={profile}
                onClose={() => setSelectedMeal(null)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        paddingBottom: 40,
    },
    dayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: THEME.spacing.lg,
    },
    summary: {
        marginTop: THEME.spacing.lg,
        padding: THEME.spacing.lg,
        backgroundColor: 'white',
        borderRadius: THEME.radius.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: THEME.colors.border,
    }
});
