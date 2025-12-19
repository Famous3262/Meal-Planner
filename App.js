import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import OnboardingWizard from './src/components/features/onboarding/OnboardingWizard';
import { DailyView } from './src/components/features/planner/DailyView';
import { ShoppingList } from './src/components/features/planner/ShoppingList';
import { Typography } from './src/components/ui/Typography';
import { recommendMealsForDay } from './src/utils/recommendationEngine';
import { THEME } from './src/utils/theme';

export default function App() {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [dailyPlan, setDailyPlan] = useState(null);
    const [activeTab, setActiveTab] = useState('planner');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const savedProfile = await AsyncStorage.getItem('user_profile');
            if (savedProfile) {
                const parsed = JSON.parse(savedProfile);
                setProfile(parsed);
                const plan = recommendMealsForDay(parsed);
                setDailyPlan(plan);
            }
        } catch (e) {
            console.error('Failed to load profile', e);
        } finally {
            // Small timeout to ensure smoother transition from splash
            setTimeout(() => setLoading(false), 500);
        }
    };

    const handleOnboardingComplete = async (newProfile) => {
        setLoading(true);
        try {
            await AsyncStorage.setItem('user_profile', JSON.stringify(newProfile));
            const plan = recommendMealsForDay(newProfile);
            setProfile(newProfile);
            setDailyPlan(plan);
        } catch (e) {
            console.error('Failed to save profile', e);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async () => {
        setLoading(true);
        await AsyncStorage.removeItem('user_profile');
        setProfile(null);
        setDailyPlan(null);
        setLoading(false);
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={THEME.colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            {!profile ? (
                <OnboardingWizard onComplete={handleOnboardingComplete} />
            ) : (
                <View style={styles.dashboard}>
                    <View style={styles.header}>
                        <View style={styles.headerTop}>
                            <Typography variant="xl" style={{ color: THEME.colors.primary, fontWeight: '800' }}>
                                Meal Planner
                            </Typography>
                            <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
                                <Typography variant="xs" color={THEME.colors.textMuted}>Reset</Typography>
                            </TouchableOpacity>
                        </View>
                        <Typography color={THEME.colors.textMuted}>
                            Hi {profile.name || 'friend'}, eat healthy!
                        </Typography>
                    </View>

                    <View style={styles.content}>
                        {activeTab === 'planner' ? (
                            <DailyView
                                profile={profile}
                                plan={dailyPlan}
                                onPlanUpdate={setDailyPlan}
                            />
                        ) : (
                            <ShoppingList plan={dailyPlan} />
                        )}
                    </View>

                    <View style={styles.bottomNav}>
                        <TouchableOpacity
                            style={styles.navItem}
                            onPress={() => setActiveTab('planner')}
                        >
                            <Typography
                                color={activeTab === 'planner' ? THEME.colors.primary : THEME.colors.textMuted}
                                style={{ fontWeight: activeTab === 'planner' ? '700' : '400' }}
                            >
                                Planner
                            </Typography>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.navItem}
                            onPress={() => setActiveTab('grocery')}
                        >
                            <Typography
                                color={activeTab === 'grocery' ? THEME.colors.primary : THEME.colors.textMuted}
                                style={{ fontWeight: activeTab === 'grocery' ? '700' : '400' }}
                            >
                                Grocery
                            </Typography>
                        </TouchableOpacity>
                        <View style={styles.navItem}>
                            <Typography color={THEME.colors.textMuted}>Recipes</Typography>
                        </View>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: THEME.colors.background,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    dashboard: {
        flex: 1,
    },
    header: {
        padding: THEME.spacing.lg,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.border,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    resetBtn: {
        padding: 6,
        borderRadius: THEME.radius.sm,
        borderWidth: 1,
        borderColor: THEME.colors.border,
    },
    content: {
        flex: 1,
        padding: THEME.spacing.lg,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: THEME.spacing.lg,
        paddingTop: THEME.spacing.md,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: THEME.colors.border,
    },
    navItem: {
        alignItems: 'center',
    }
});
