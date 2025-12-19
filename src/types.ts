
export interface Nutrition {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber?: number;
    sugar?: number;
}

export interface Ingredient {
    name: string;
    amount: string;
    unit: string;
}

export interface Meal {
    id: string;
    name: string;
    description: string;
    image: string;
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    culture: 'african' | 'mediterranean' | 'asian' | 'western' | 'other';
    origin?: string;
    nutrition: Nutrition;
    ingredients: Ingredient[];
    instructions: string[];
    tags: string[];
    healthFlags: string[];
    preparationTime: number;
}

export interface UserProfile {
    id: string;
    name?: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    height: number;
    weight: number;
    activityLevel: 'sedentary' | 'moderate' | 'active';
    dietType: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian';
    allergies: string[];
    conditions: string[];
    goals: string[];
    culturalPreference: 'african' | 'international' | 'mixed';
}
