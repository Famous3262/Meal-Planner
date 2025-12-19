import { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Typography } from '../../components/ui/Typography';
import { useAuth } from '../../context/AuthContext';
import { THEME } from '../../utils/theme';

const LoginScreen = ({ onSignup, onBack }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await login(email, password);
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

            <View style={styles.content}>
                <Typography variant="xxxl" style={styles.title}>Welcome Back</Typography>
                <Typography color={THEME.colors.textMuted} style={styles.subtitle}>
                    Log in to continue your healthy journey.
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
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <Button
                        title="Login"
                        onPress={handleLogin}
                        loading={loading}
                        style={styles.submitBtn}
                    />

                    <View style={styles.footer}>
                        <Typography color={THEME.colors.textMuted}>
                            Don't have an account?
                        </Typography>
                        <TouchableOpacity onPress={onSignup}>
                            <Typography color={THEME.colors.primary} style={{ fontWeight: '700', marginLeft: 4 }}>
                                Sign Up
                            </Typography>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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

export default LoginScreen;
