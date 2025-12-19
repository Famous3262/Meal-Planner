import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import OnboardingWizard from './src/components/features/onboarding/OnboardingWizard';
import { DailyView } from './src/components/features/planner/DailyView';
import { RecipesList } from './src/components/features/planner/RecipesList';
import { ShoppingList } from './src/components/features/planner/ShoppingList';
import { TimetableScreen } from './src/components/features/planner/TimetableScreen';
import { Typography } from './src/components/ui/Typography';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import LandingScreen from './src/screens/auth/LandingScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignupScreen from './src/screens/auth/SignupScreen';
import { recommendMealsForDay } from './src/utils/recommendationEngine';
import { THEME } from './src/utils/theme';

function MainApp() {
    const { user, loading: authLoading, logout } = useAuth();
    const [onboardingLoading, setOnboardingLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [dailyPlan, setDailyPlan] = useState(null);
    const [activeTab, setActiveTab] = useState('planner'); // 'planner', 'grocery', 'recipes', 'timetable'
    const [authMode, setAuthMode] = useState('landing');

    useEffect(() => {
        if (user) {
            loadProfile();
        } else {
            setOnboardingLoading(false);
        }
    }, [user]);

    const loadProfile = async () => {
        try {
            const savedProfile = await AsyncStorage.getItem(`profile_${user.id}`);
            if (savedProfile) {
                const parsed = JSON.parse(savedProfile);
                setProfile(parsed);
                const plan = recommendMealsForDay(parsed);
                setDailyPlan(plan);
            }
        } catch (e) {
            console.error('Failed to load profile', e);
        } finally {
            setOnboardingLoading(false);
        }
    };

    const handleOnboardingComplete = async (newProfile) => {
        setOnboardingLoading(true);
        try {
            await AsyncStorage.setItem(`profile_${user.id}`, JSON.stringify(newProfile));
            const plan = recommendMealsForDay(newProfile);
            setProfile(newProfile);
            setDailyPlan(plan);
        } catch (e) {
            console.error('Failed to save profile', e);
        } finally {
            setOnboardingLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        setProfile(null);
        setDailyPlan(null);
        setAuthMode('landing');
    };

    if (authLoading || onboardingLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={THEME.colors.primary} />
            </View>
        );
    }

    // Auth Flow
    if (!user) {
        if (authMode === 'login') {
            return <LoginScreen onSignup={() => setAuthMode('signup')} onBack={() => setAuthMode('landing')} />;
        }
        if (authMode === 'signup') {
            return <SignupScreen onLogin={() => setAuthMode('login')} onBack={() => setAuthMode('landing')} />;
        }
        return <LandingScreen onGetStarted={() => setAuthMode('signup')} onLogin={() => setAuthMode('login')} />;
    }

    // Onboarding Flow
    if (!profile) {
        return <OnboardingWizard onComplete={handleOnboardingComplete} />;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'planner': return <DailyView profile={profile} plan={dailyPlan} onPlanUpdate={setDailyPlan} />;
            case 'grocery': return <ShoppingList plan={dailyPlan} />;
            case 'recipes': return <RecipesList profile={profile} />;
            case 'timetable': return <TimetableScreen profile={profile} onUpdatePlan={(p) => setDailyPlan(p)} />;
            default: return <DailyView profile={profile} plan={dailyPlan} onPlanUpdate={setDailyPlan} />;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.dashboard}>
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <Typography variant="xl" style={{ color: THEME.colors.primary, fontWeight: '800' }}>
                            GlowMeal
                        </Typography>
                        <TouchableOpacity onPress={handleLogout} style={styles.resetBtn}>
                            <Typography variant="xs" color={THEME.colors.textMuted}>Logout</Typography>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.content}>
                    {renderContent()}
                </View>

                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('planner')}>
                        <Typography
                            variant="xs"
                            color={activeTab === 'planner' ? THEME.colors.primary : THEME.colors.textMuted}
                            style={{ fontWeight: activeTab === 'planner' ? '700' : '400' }}
                        >
                            Planner
                        </Typography>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('timetable')}>
                        <Typography
                            variant="xs"
                            color={activeTab === 'timetable' ? THEME.colors.primary : THEME.colors.textMuted}
                            style={{ fontWeight: activeTab === 'timetable' ? '700' : '400' }}
                        >
                            Weeks
                        </Typography>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('recipes')}>
                        <Typography
                            variant="xs"
                            color={activeTab === 'recipes' ? THEME.colors.primary : THEME.colors.textMuted}
                            style={{ fontWeight: activeTab === 'recipes' ? '700' : '400' }}
                        >
                            Recipes
                        </Typography>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('grocery')}>
                        <Typography
                            variant="xs"
                            color={activeTab === 'grocery' ? THEME.colors.primary : THEME.colors.textMuted}
                            style={{ fontWeight: activeTab === 'grocery' ? '700' : '400' }}
                        >
                            Grocery
                        </Typography>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <MainApp />
        </AuthProvider>
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
