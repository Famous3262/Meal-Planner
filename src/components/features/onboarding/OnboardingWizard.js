import { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../../utils/theme';
import { Button } from '../../ui/Button';
import { Typography } from '../../ui/Typography';

const STEPS = {
    BIO: 1,
    DIETARY: 2,
    HEALTH: 3,
    CULTURE: 4
};

const OnboardingWizard = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(STEPS.BIO);
    const [profile, setProfile] = useState({
        name: '',
        age: '',
        gender: 'female',
        height: '',
        weight: '',
        activityLevel: 'moderate',
        dietType: 'omnivore',
        allergies: [],
        conditions: [],
        goals: ['better-health'],
        culturalPreference: 'mixed'
    });

    const updateProfile = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const handleSubmit = () => {
        const finalProfile = {
            ...profile,
            id: Math.random().toString(36).substr(2, 9),
            measurements: {
                height: Number(profile.height),
                weight: Number(profile.weight)
            }
        };
        onComplete(finalProfile);
    };

    return (
        <View style={styles.container}>
            <View style={styles.progressBar}>
                <View
                    style={[
                        styles.progressFill,
                        { width: `${(currentStep / 4) * 100}%` }
                    ]}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {currentStep === STEPS.BIO && (
                    <View style={styles.step}>
                        <Typography variant="xxl" style={styles.title}>Let's get to know you</Typography>
                        <Typography variant="sm" color={THEME.colors.textMuted} style={styles.subtitle}>This helps us calculate your nutritional needs.</Typography>

                        <View style={styles.inputGroup}>
                            <Typography variant="sm" style={styles.label}>Name</Typography>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Ama"
                                value={profile.name}
                                onChangeText={(text) => updateProfile('name', text)}
                            />
                        </View>

                        <View style={styles.inputRow}>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Typography variant="sm" style={styles.label}>Age</Typography>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={profile.age}
                                    onChangeText={(text) => updateProfile('age', text)}
                                />
                            </View>
                            <View style={[styles.inputGroup, { flex: 2, marginLeft: THEME.spacing.md }]}>
                                <Typography variant="sm" style={styles.label}>Gender</Typography>
                                <View style={styles.toggleGroup}>
                                    {['female', 'male'].map(g => (
                                        <TouchableOpacity
                                            key={g}
                                            style={[styles.toggleBtn, profile.gender === g && styles.toggleBtnActive]}
                                            onPress={() => updateProfile('gender', g)}
                                        >
                                            <Typography color={profile.gender === g ? THEME.colors.primary : THEME.colors.textMuted}>{g}</Typography>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>

                        <View style={styles.inputRow}>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Typography variant="sm" style={styles.label}>Height (cm)</Typography>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={profile.height}
                                    onChangeText={(text) => updateProfile('height', text)}
                                />
                            </View>
                            <View style={[styles.inputGroup, { flex: 1, marginLeft: THEME.spacing.md }]}>
                                <Typography variant="sm" style={styles.label}>Weight (kg)</Typography>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    value={profile.weight}
                                    onChangeText={(text) => updateProfile('weight', text)}
                                />
                            </View>
                        </View>

                        <Button title="Continue" onPress={nextStep} style={styles.mainBtn} />
                    </View>
                )}

                {currentStep === STEPS.DIETARY && (
                    <View style={styles.step}>
                        <Typography variant="xxl" style={styles.title}>Dietary Preferences</Typography>
                        <Typography variant="sm" color={THEME.colors.textMuted} style={styles.subtitle}>Do you follow a specific diet?</Typography>

                        <View style={styles.cardGrid}>
                            {['omnivore', 'vegetarian', 'vegan', 'pescatarian'].map(type => (
                                <TouchableOpacity
                                    key={type}
                                    style={[styles.choiceCard, profile.dietType === type && styles.choiceCardSelected]}
                                    onPress={() => updateProfile('dietType', type)}
                                >
                                    <Typography
                                        color={profile.dietType === type ? THEME.colors.primary : THEME.colors.textMain}
                                        style={{ fontWeight: '600' }}
                                    >
                                        {type}
                                    </Typography>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Typography variant="sm" style={styles.label}>Allergies</Typography>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Nuts, Shellfish"
                            onChangeText={(text) => updateProfile('allergies', text.split(',').map(s => s.trim()))}
                        />

                        <View style={styles.btnRow}>
                            <Button title="Back" variant="secondary" onPress={prevStep} style={{ flex: 1 }} />
                            <Button title="Next" onPress={nextStep} style={{ flex: 2, marginLeft: THEME.spacing.md }} />
                        </View>
                    </View>
                )}

                {currentStep === STEPS.HEALTH && (
                    <View style={styles.step}>
                        <Typography variant="xxl" style={styles.title}>Health Goals</Typography>
                        <Typography variant="sm" color={THEME.colors.textMuted} style={styles.subtitle}>Select any relevant conditions:</Typography>

                        <View style={styles.tagCloud}>
                            {['Diabetes', 'Hypertension', 'Obesity', 'Anemia', 'PCOS'].map(c => {
                                const isActive = profile.conditions.includes(c);
                                return (
                                    <TouchableOpacity
                                        key={c}
                                        style={[styles.tag, isActive && styles.tagActive]}
                                        onPress={() => {
                                            const newConditions = isActive
                                                ? profile.conditions.filter(item => item !== c)
                                                : [...profile.conditions, c];
                                            updateProfile('conditions', newConditions);
                                        }}
                                    >
                                        <Typography color={isActive ? 'white' : THEME.colors.textMain}>{c}</Typography>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        <View style={styles.btnRow}>
                            <Button title="Back" variant="secondary" onPress={prevStep} style={{ flex: 1 }} />
                            <Button title="Next" onPress={nextStep} style={{ flex: 2, marginLeft: THEME.spacing.md }} />
                        </View>
                    </View>
                )}

                {currentStep === STEPS.CULTURE && (
                    <View style={styles.step}>
                        <Typography variant="xxl" style={styles.title}>Taste Profiles</Typography>
                        <Typography variant="sm" color={THEME.colors.textMuted} style={styles.subtitle}>Which flavors would you like to explore?</Typography>

                        <TouchableOpacity
                            style={[styles.cuisineCard, profile.culturalPreference === 'african' && styles.choiceCardSelected]}
                            onPress={() => updateProfile('culturalPreference', 'african')}
                        >
                            <Typography variant="lg">African Cuisine</Typography>
                            <Typography variant="sm" color={THEME.colors.textMuted}>Jollof, Egusi, Swallow & more</Typography>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.cuisineCard, profile.culturalPreference === 'international' && styles.choiceCardSelected, { marginTop: THEME.spacing.md }]}
                            onPress={() => updateProfile('culturalPreference', 'international')}
                        >
                            <Typography variant="lg">International</Typography>
                            <Typography variant="sm" color={THEME.colors.textMuted}>Mediterranean, Asian, Western</Typography>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.cuisineCard, profile.culturalPreference === 'mixed' && styles.choiceCardSelected, { marginTop: THEME.spacing.md }]}
                            onPress={() => updateProfile('culturalPreference', 'mixed')}
                        >
                            <Typography variant="lg">Mixed</Typography>
                            <Typography variant="sm" color={THEME.colors.textMuted}>A balanced global experience</Typography>
                        </TouchableOpacity>

                        <View style={[styles.btnRow, { marginTop: THEME.spacing.xl }]}>
                            <Button title="Back" variant="secondary" onPress={prevStep} style={{ flex: 1 }} />
                            <Button title="Finish" onPress={handleSubmit} style={{ flex: 2, marginLeft: THEME.spacing.md }} />
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background,
        paddingTop: THEME.spacing.xxl,
    },
    progressBar: {
        height: 6,
        backgroundColor: THEME.colors.border,
        marginHorizontal: THEME.spacing.lg,
        borderRadius: THEME.radius.full,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: THEME.colors.primary,
    },
    scrollContent: {
        padding: THEME.spacing.lg,
    },
    step: {
        flex: 1,
    },
    title: {
        color: THEME.colors.primary,
        marginBottom: THEME.spacing.xs,
    },
    subtitle: {
        marginBottom: THEME.spacing.xl,
    },
    label: {
        fontWeight: '600',
        marginBottom: THEME.spacing.sm,
    },
    inputGroup: {
        marginBottom: THEME.spacing.lg,
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: THEME.colors.border,
        borderRadius: THEME.radius.md,
        padding: THEME.spacing.md,
        fontSize: THEME.typography.base,
    },
    inputRow: {
        flexDirection: 'row',
    },
    toggleGroup: {
        flexDirection: 'row',
        backgroundColor: '#EEE',
        padding: 2,
        borderRadius: THEME.radius.md,
    },
    toggleBtn: {
        flex: 1,
        padding: THEME.spacing.sm,
        alignItems: 'center',
        borderRadius: THEME.radius.sm,
    },
    toggleBtnActive: {
        backgroundColor: 'white',
    },
    mainBtn: {
        marginTop: THEME.spacing.xl,
    },
    cardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: THEME.spacing.md,
        marginBottom: THEME.spacing.xl,
    },
    choiceCard: {
        width: '47%',
        padding: THEME.spacing.lg,
        backgroundColor: 'white',
        borderRadius: THEME.radius.lg,
        borderWidth: 2,
        borderColor: THEME.colors.border,
        alignItems: 'center',
    },
    choiceCardSelected: {
        borderColor: THEME.colors.primary,
        backgroundColor: '#ECFDF5',
    },
    btnRow: {
        flexDirection: 'row',
        marginTop: THEME.spacing.xl,
    },
    tagCloud: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: THEME.spacing.sm,
    },
    tag: {
        paddingVertical: THEME.spacing.sm,
        paddingHorizontal: THEME.spacing.md,
        borderRadius: THEME.radius.full,
        borderWidth: 1,
        borderColor: THEME.colors.border,
        backgroundColor: 'white',
    },
    tagActive: {
        backgroundColor: THEME.colors.primary,
        borderColor: THEME.colors.primary,
    },
    cuisineCard: {
        padding: THEME.spacing.lg,
        backgroundColor: 'white',
        borderRadius: THEME.radius.lg,
        borderWidth: 2,
        borderColor: THEME.colors.border,
    }
});

export default OnboardingWizard;
