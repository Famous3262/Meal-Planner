import { FlatList, Image, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MEAL_DATABASE } from '../../../data/meals';
import { THEME } from '../../../utils/theme';
import { Typography } from '../../ui/Typography';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const TimetableScreen = ({ profile, onUpdatePlan }) => {
    const [selectedDay, setSelectedDay] = useState(DAYS[0]);
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [currentSlot, setCurrentSlot] = useState(null);

    // Mock weekly structure: { Mon: { Breakfast: mealObj, ... }, ... }
    const [weeklyPlan, setWeeklyPlan] = useState({});

    const openPicker = (slot) => {
        setCurrentSlot(slot);
        setPickerVisible(true);
    };

    const selectMeal = (meal) => {
        const newWeeklyPlan = {
            ...weeklyPlan,
            [selectedDay]: {
                ...(weeklyPlan[selectedDay] || {}),
                [currentSlot.toLowerCase()]: meal
            }
        };
        setWeeklyPlan(newWeeklyPlan);
        setPickerVisible(false);

        // If the selected day is today, potentially update the daily plan
        const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
        if (selectedDay === today) {
            onUpdatePlan(newWeeklyPlan[selectedDay]);
        }
    };

    return (
        <View style={styles.container}>
            <Typography variant="xxl" style={styles.title}>Weekly Timetable</Typography>

            <View style={styles.daysRow}>
                {DAYS.map(day => (
                    <TouchableOpacity
                        key={day}
                        style={[styles.dayBtn, selectedDay === day && styles.dayBtnActive]}
                        onPress={() => setSelectedDay(day)}
                    >
                        <Typography color={selectedDay === day ? 'white' : THEME.colors.textMuted}>
                            {day}
                        </Typography>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
                {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map(slot => {
                    const meal = weeklyPlan[selectedDay]?.[slot.toLowerCase()];
                    return (
                        <View key={slot} style={styles.slotContainer}>
                            <Typography variant="sm" style={styles.slotLabel}>{slot}</Typography>
                            <TouchableOpacity
                                style={[styles.mealSlot, meal && styles.mealSlotActive]}
                                onPress={() => openPicker(slot)}
                            >
                                {meal ? (
                                    <View style={styles.selectedMealInfo}>
                                        <Image source={{ uri: meal.image }} style={styles.miniImage} />
                                        <View style={{ flex: 1, marginLeft: 12 }}>
                                            <Typography style={{ fontWeight: '700' }}>{meal.name}</Typography>
                                            <Typography variant="xs" color={THEME.colors.textMuted}>{meal.nutrition.calories} kcal</Typography>
                                        </View>
                                    </View>
                                ) : (
                                    <Typography color={THEME.colors.textMuted}>
                                        + Tap to select a meal
                                    </Typography>
                                )}
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>

            <Modal visible={isPickerVisible} animationType="slide" transparent={false}>
                <View style={[styles.modalContent, { paddingTop: 60 }]}>
                    <View style={styles.modalHeader}>
                        <Typography variant="xl" style={{ fontWeight: '800' }}>Select {currentSlot}</Typography>
                        <TouchableOpacity onPress={() => setPickerVisible(false)}>
                            <Typography color={THEME.colors.error} style={{ fontWeight: '600' }}>Cancel</Typography>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={MEAL_DATABASE.filter(m => currentSlot ? m.type === currentSlot.toLowerCase() : true)}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.pickerItem} onPress={() => selectMeal(item)}>
                                <Image source={{ uri: item.image }} style={styles.miniImage} />
                                <View style={{ marginLeft: 12 }}>
                                    <Typography style={{ fontWeight: '600' }}>{item.name}</Typography>
                                    <Typography variant="xs" color={THEME.colors.textMuted}>{item.origin || item.culture}</Typography>
                                </View>
                            </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: THEME.colors.primary,
        fontWeight: '800',
        marginBottom: THEME.spacing.lg,
    },
    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: THEME.spacing.xl,
    },
    dayBtn: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: THEME.radius.md,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: THEME.colors.border,
        minWidth: 45,
        alignItems: 'center',
    },
    dayBtnActive: {
        backgroundColor: THEME.colors.primary,
        borderColor: THEME.colors.primary,
    },
    content: {
        flex: 1,
    },
    slotContainer: {
        marginBottom: THEME.spacing.lg,
    },
    slotLabel: {
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
        color: THEME.colors.textMuted,
        fontWeight: '600',
    },
    mealSlot: {
        padding: THEME.spacing.lg,
        backgroundColor: 'white',
        borderRadius: THEME.radius.lg,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: THEME.colors.border,
        alignItems: 'center',
    },
    mealSlotActive: {
        borderStyle: 'solid',
        padding: THEME.spacing.md,
    },
    selectedMealInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    miniImage: {
        width: 45,
        height: 45,
        borderRadius: THEME.radius.sm,
    },
    modalContent: {
        flex: 1,
        backgroundColor: THEME.colors.background,
        padding: THEME.spacing.lg,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: THEME.spacing.xxl,
    },
    pickerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: THEME.spacing.md,
        backgroundColor: 'white',
        borderRadius: THEME.radius.lg,
        borderWidth: 1,
        borderColor: THEME.colors.border,
    }
});
