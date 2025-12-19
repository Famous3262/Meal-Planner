import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Typography } from '../../components/ui/Typography';
import { THEME } from '../../utils/theme';

const { width, height } = Dimensions.get('window');

const LandingScreen = ({ onGetStarted, onLogin }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../assets/inclusive_meal_landing_1766165455103.png')}
                style={styles.heroImage}
                overlayColor="rgba(0,0,0,0.4)"
            >
                <View style={styles.overlay}>
                    <View style={styles.topSection}>
                        <Typography variant="xxxl" color="white" style={styles.logo}>
                            GlowMeal
                        </Typography>
                        <Typography variant="lg" color="white" style={styles.tagline}>
                            Nourish your body, honor your culture.
                        </Typography>
                    </View>

                    <View style={styles.bottomSection}>
                        <Typography variant="base" color="white" style={styles.description}>
                            Personalized meal plans that respect your health goals and cultural favorites. Join thousands eating better today.
                        </Typography>

                        <Button
                            title="Get Started Free"
                            onPress={onGetStarted}
                            style={styles.mainBtn}
                        />

                        <TouchableOpacity onPress={onLogin} style={styles.loginLink}>
                            <Typography color="white" style={{ fontWeight: '600' }}>
                                Already have an account? <Typography color={THEME.colors.primaryLight}>Log In</Typography>
                            </Typography>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heroImage: {
        width: width,
        height: height,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        padding: THEME.spacing.xl,
        justifyContent: 'space-between',
    },
    topSection: {
        marginTop: height * 0.1,
    },
    logo: {
        fontWeight: '900',
        letterSpacing: -1,
    },
    tagline: {
        marginTop: THEME.spacing.sm,
        opacity: 0.9,
    },
    bottomSection: {
        marginBottom: THEME.spacing.xxl,
    },
    description: {
        marginBottom: THEME.spacing.xxl,
        lineHeight: 24,
        opacity: 0.8,
    },
    mainBtn: {
        backgroundColor: THEME.colors.primary,
        paddingVertical: 18,
    },
    loginLink: {
        marginTop: THEME.spacing.lg,
        alignItems: 'center',
    }
});

export default LandingScreen;
