import { useState } from 'react';
import { FlatList, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { MEAL_DATABASE } from '../../../data/meals';
import { THEME } from '../../../utils/theme';
import { Typography } from '../../ui/Typography';
import { MealDetail } from './MealDetail';

export const RecipesList = ({ profile }) => {
    const [search, setSearch] = useState('');
    const [selectedMeal, setSelectedMeal] = useState(null);

    const filtered = MEAL_DATABASE.filter(meal =>
        meal.name.toLowerCase().includes(search.toLowerCase()) ||
        meal.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Typography variant="xxl" style={styles.title}>Explore Recipes</Typography>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search Jollof, Protein, Vegan..."
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <FlatList
                data={filtered}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.mealItem}
                        onPress={() => setSelectedMeal(item)}
                    >
                        <Image source={{ uri: item.image }} style={styles.mealImage} />
                        <View style={styles.mealInfo}>
                            <Typography variant="base" style={{ fontWeight: '700' }}>{item.name}</Typography>
                            <Typography variant="xs" color={THEME.colors.textMuted}>{item.culture.toUpperCase()} • {item.preparationTime} MIN</Typography>
                        </View>
                    </TouchableOpacity>
                )}
            />

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
    header: {
        marginBottom: THEME.spacing.lg,
    },
    title: {
        color: THEME.colors.primary,
        marginBottom: THEME.spacing.md,
    },
    searchBar: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: THEME.colors.border,
        borderRadius: THEME.radius.md,
        padding: THEME.spacing.md,
        fontSize: THEME.typography.base,
    },
    mealItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: THEME.radius.md,
        marginBottom: THEME.spacing.sm,
        padding: THEME.spacing.sm,
        borderWidth: 1,
        borderColor: THEME.colors.border,
    },
    mealImage: {
        width: 60,
        height: 60,
        borderRadius: THEME.radius.sm,
    },
    mealInfo: {
        marginLeft: THEME.spacing.md,
        flex: 1,
    }
});
