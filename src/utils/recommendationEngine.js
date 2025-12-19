import { MEAL_DATABASE } from '../data/meals';

export const recommendMealsForDay = (profile) => {
    if (!profile) return null;

    let eligibleMeals = MEAL_DATABASE.filter(meal => {
        const hasAllergen = profile.allergies?.some(allergen =>
            meal.healthFlags.some(flag => flag.toLowerCase().includes(allergen.toLowerCase())) ||
            meal.ingredients.some(ing => ing.name.toLowerCase().includes(allergen.toLowerCase()))
        );
        return !hasAllergen;
    });

    if (profile.dietType === 'vegan') {
        eligibleMeals = eligibleMeals.filter(m => m.tags.includes('vegan'));
    } else if (profile.dietType === 'vegetarian') {
        eligibleMeals = eligibleMeals.filter(m => m.tags.includes('vegetarian') || m.tags.includes('vegan'));
    }

    const scoreMeal = (meal) => {
        let score = 0;
        if (profile.culturalPreference === 'african' && meal.culture === 'african') score += 10;
        if (profile.culturalPreference === 'international' && meal.culture !== 'african') score += 10;
        if (profile.culturalPreference === 'mixed') score += 5;

        if (profile.conditions?.includes('Diabetes')) {
            if (meal.healthFlags.includes('high-sugar')) score -= 20;
        }
        return score;
    };

    const getMealByType = (type) => {
        const typeMeals = eligibleMeals.filter(m => m.type === type);
        if (typeMeals.length === 0) return null;
        const ranked = typeMeals.sort((a, b) => scoreMeal(b) - scoreMeal(a));
        return ranked[0] || null;
    };

    return {
        breakfast: getMealByType('breakfast'),
        lunch: getMealByType('lunch'),
        dinner: getMealByType('dinner'),
        snack: getMealByType('snack')
    };
};
