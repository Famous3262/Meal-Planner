export const MEAL_DATABASE = [
    {
        id: 'af-1',
        name: 'Jollof Rice with Grilled Chicken',
        description: 'A West African classic. Spiced rice cooked in a rich tomato stew.',
        image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&q=80',
        type: 'lunch',
        culture: 'african',
        origin: 'Nigeria',
        nutrition: { calories: 650, protein: 35, carbs: 80, fats: 15, fiber: 4, sugar: 6 },
        ingredients: [
            { name: 'Rice', amount: '1', unit: 'cup' },
            { name: 'Tomatoes', amount: '3', unit: 'pcs' },
            { name: 'Chicken Breast', amount: '150', unit: 'g' }
        ],
        instructions: ['Blend tomatoes and peppers.', 'Cook rice in the stew.', 'Grill chicken.'],
        tags: ['spicy', 'high-carb'],
        healthFlags: [],
        preparationTime: 60
    },
    {
        id: 'af-2',
        name: 'Egusi Soup with Pounded Yam',
        description: 'Melon seed soup cooked with spinach and assorted meats.',
        image: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?auto=format&fit=crop&q=80',
        type: 'dinner',
        culture: 'african',
        origin: 'Nigeria',
        nutrition: { calories: 700, protein: 40, carbs: 90, fats: 30, fiber: 8, sugar: 3 },
        ingredients: [],
        instructions: [],
        tags: ['high-protein'],
        healthFlags: ['high-calorie'],
        preparationTime: 50
    },
    {
        id: 'med-1',
        name: 'Greek Salad with Salmon',
        description: 'Fresh vegetables with feta cheese and grilled salmon.',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80',
        type: 'lunch',
        culture: 'mediterranean',
        nutrition: { calories: 450, protein: 35, carbs: 12, fats: 30, fiber: 6, sugar: 4 },
        ingredients: [],
        instructions: [],
        tags: ['low-carb', 'heart-healthy'],
        healthFlags: [],
        preparationTime: 20
    },
    {
        id: 'wes-1',
        name: 'Oatmeal with Blueberries',
        description: 'Warm oatmeal topped with fresh antioxidant-rich berries.',
        image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&q=80',
        type: 'breakfast',
        culture: 'western',
        nutrition: { calories: 320, protein: 10, carbs: 55, fats: 8, fiber: 9, sugar: 2 },
        ingredients: [],
        instructions: [],
        tags: ['heart-healthy'],
        healthFlags: [],
        preparationTime: 10
    }
];
