import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Typography } from '../../components/ui/Typography';
import { useAuth } from '../../context/AuthContext';
import { THEME } from '../../utils/theme';

const SignupScreen = ({ onLogin, onBack }) => {
    const { signup } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        setLoading(true);
        try {
            await signup(email, password);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack}>
                    <Typography variant="lg">←</Typography>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Typography variant="xxxl" style={styles.title}>Create Account</Typography>
                <Typography color={THEME.colors.textMuted} style={styles.subtitle}>
                    Join GlowMeal and start your personalized nutrition plan.
                </Typography>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Typography variant="sm" style={styles.label}>Email Address</Typography>
                        <TextInput
                            style={styles.input}
                            placeholder="you@example.com"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Typography variant="sm" style={styles.label}>Password</Typography>
                        <TextInput
                            style={styles.input}
                            placeholder="Min 8 characters"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Typography variant="sm" style={styles.label}>Confirm Password</Typography>
                        <TextInput
                            style={styles.input}
                            placeholder="Repeat password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                        />
                    </View>

                    <Button
                        title="Sign Up"
                        onPress={handleSignup}
                        loading={loading}
                        style={styles.submitBtn}
                    />

                    <View style={styles.footer}>
                        <Typography color={THEME.colors.textMuted}>
                            Already have an account?
                        </Typography>
                        <TouchableOpacity onPress={onLogin}>
                            <Typography color={THEME.colors.primary} style={{ fontWeight: '700', marginLeft: 4 }}>
                                Log In
                            </Typography>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        padding: THEME.spacing.lg,
    },
    content: {
        padding: THEME.spacing.xl,
    },
    title: {
        fontWeight: '800',
    },
    subtitle: {
        marginTop: 4,
        marginBottom: THEME.spacing.xxl,
    },
    form: {
        marginTop: THEME.spacing.md,
    },
    inputGroup: {
        marginBottom: THEME.spacing.lg,
    },
    label: {
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        backgroundColor: THEME.colors.background,
        borderRadius: THEME.radius.md,
        padding: THEME.spacing.md,
        fontSize: THEME.typography.base,
    },
    submitBtn: {
        marginTop: THEME.spacing.xl,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: THEME.spacing.xl,
    }
});

export default SignupScreen;
