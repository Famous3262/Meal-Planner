import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../../utils/theme';
import { Typography } from '../../ui/Typography';

export const MealDetail = ({ visible, meal, profile, onClose }) => {
    if (!meal) return null;

    const healthWarnings = meal.healthFlags.filter(flag => {
        if (profile.conditions.includes('Diabetes') && flag.toLowerCase().includes('sugar')) return true;
        if (profile.conditions.includes('Hypertension') && flag.toLowerCase().includes('sodium')) return true;
        return false;
    });

    return (
        <Modal visible={visible} animationType="slide" transparent={false}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <Typography variant="lg">✕</Typography>
                    </TouchableOpacity>
                    <Typography variant="xl" style={{ flex: 1, textAlign: 'center' }}>Meal Details</Typography>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image source={{ uri: meal.image }} style={styles.image} />

                    <View style={styles.body}>
                        <Typography variant="xxl">{meal.name}</Typography>
                        <Typography color={THEME.colors.textMuted} style={styles.desc}>{meal.description}</Typography>

                        {healthWarnings.length > 0 && (
                            <View style={styles.alert}>
                                <Typography color={THEME.colors.error} style={{ fontWeight: '700' }}>⚠️ Health Alert</Typography>
                                <Typography variant="sm" color={THEME.colors.error}>
                                    Contains {healthWarnings.join(', ')} which may conflict with your status.
                                </Typography>
                            </View>
                        )}

                        <View style={styles.section}>
                            <Typography variant="lg" style={styles.sectionTitle}>Nutrition</Typography>
                            <View style={styles.nutriGrid}>
                                {Object.entries(meal.nutrition).map(([key, val]) => (
                                    <View key={key} style={styles.nutriItem}>
                                        <Typography variant="xs" color={THEME.colors.textMuted} style={{ textTransform: 'uppercase' }}>{key}</Typography>
                                        <Typography variant="sm" style={{ fontWeight: '700' }}>{val}{key === 'calories' ? '' : 'g'}</Typography>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Typography variant="lg" style={styles.sectionTitle}>Ingredients</Typography>
                            {meal.ingredients.map((ing, i) => (
                                <View key={i} style={styles.listItem}>
                                    <Typography variant="base">• {ing.amount} {ing.unit} {ing.name}</Typography>
                                </View>
                            ))}
                        </View>

                        <View style={styles.section}>
                            <Typography variant="lg" style={styles.sectionTitle}>Instructions</Typography>
                            {meal.instructions.map((step, i) => (
                                <View key={i} style={[styles.listItem, { marginBottom: 12 }]}>
                                    <Typography variant="base">
                                        <Typography style={{ fontWeight: '700' }}>{i + 1}. </Typography>
                                        {step}
                                    </Typography>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: THEME.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.border,
    },
    closeBtn: {
        padding: THEME.spacing.sm,
        width: 40,
    },
    image: {
        width: '100%',
        height: 250,
    },
    body: {
        padding: THEME.spacing.lg,
    },
    desc: {
        marginTop: THEME.spacing.sm,
        marginBottom: THEME.spacing.xl,
    },
    alert: {
        backgroundColor: '#FEF2F2',
        borderLeftWidth: 4,
        borderLeftColor: THEME.colors.error,
        padding: THEME.spacing.md,
        borderRadius: THEME.radius.md,
        marginBottom: THEME.spacing.xl,
    },
    section: {
        marginBottom: THEME.spacing.xl,
    },
    sectionTitle: {
        marginBottom: THEME.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.background,
        paddingBottom: 4,
    },
    nutriGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: THEME.spacing.sm,
    },
    nutriItem: {
        flex: 1,
        minWidth: '22%',
        backgroundColor: THEME.colors.background,
        padding: THEME.spacing.sm,
        borderRadius: THEME.radius.md,
        alignItems: 'center',
    },
    listItem: {
        marginBottom: 4,
    }
});
