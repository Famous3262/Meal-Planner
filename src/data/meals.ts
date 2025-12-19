export const MEAL_DATABASE = [
    {
        id: 'af-1',
        name: 'Jollof Rice with Grilled Chicken',
        description: 'A West African classic. Spiced rice cooked in a rich tomato stew.',
        image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80',
        type: 'lunch',
        culture: 'african',
        origin: 'Nigeria',
        nutrition: { calories: 650, protein: 35, carbs: 80, fats: 15, fiber: 4, sugar: 6 },
        ingredients: [
            { name: 'Rice', amount: '2', unit: 'cups' },
            { name: 'Tomatoes', amount: '4', unit: 'pcs' },
            { name: 'Chicken Breast', amount: '200', unit: 'g' },
            { name: 'Onion', amount: '1', unit: 'pc' }
        ],
        instructions: ['Blend tomatoes and peppers.', 'Sauté onions and add tomato paste.', 'Cook rice in the stew until soft.', 'Serve with grilled chicken.'],
        tags: ['spicy', 'high-carb', 'high-protein'],
        healthFlags: [],
        preparationTime: 60
    },
    {
        id: 'af-2',
        name: 'Egusi Soup with Pounded Yam',
        description: 'Melon seed soup cooked with spinach and assorted meats.',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c170db76?auto=format&fit=crop&q=80',
        type: 'dinner',
        culture: 'african',
        origin: 'Nigeria',
        nutrition: { calories: 700, protein: 40, carbs: 90, fats: 30, fiber: 8, sugar: 3 },
        ingredients: [
            { name: 'Egusi seeds', amount: '1', unit: 'cup' },
            { name: 'Spinach', amount: '200', unit: 'g' },
            { name: 'Assorted Meats', amount: '300', unit: 'g' },
            { name: 'Palm Oil', amount: '0.5', unit: 'cup' }
        ],
        instructions: ['Boil meats until tender.', 'Add egusi and palm oil.', 'Add spinach at the end.', 'Serve with pounded yam.'],
        tags: ['high-protein', 'traditional'],
        healthFlags: ['high-calorie'],
        preparationTime: 50
    },
    {
        id: 'af-3',
        name: 'Banku with Grilled Tilapia',
        description: 'Fermented corn and cassava dough served with spicy grilled fish.',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80',
        type: 'lunch',
        culture: 'african',
        origin: 'Ghana',
        nutrition: { calories: 580, protein: 42, carbs: 65, fats: 18, fiber: 5, sugar: 2 },
        ingredients: [
            { name: 'Tilapia', amount: '1', unit: 'whole' },
            { name: 'Cassava dough', amount: '1', unit: 'cup' },
            { name: 'Corn dough', amount: '2', unit: 'cups' }
        ],
        instructions: ['Prepare banku dough.', 'Grill tilapia with pepper sauce.'],
        tags: ['high-protein', 'seafood'],
        healthFlags: [],
        preparationTime: 45
    },
    {
        id: 'med-1',
        name: 'Greek Salad with Grilled Salmon',
        description: 'Fresh vegetables with feta cheese and premium grilled salmon.',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80',
        type: 'lunch',
        culture: 'mediterranean',
        nutrition: { calories: 450, protein: 35, carbs: 12, fats: 30, fiber: 6, sugar: 4 },
        ingredients: [
            { name: 'Salmon', amount: '150', unit: 'g' },
            { name: 'Cucumber', amount: '1', unit: 'pc' },
            { name: 'Feta Cheese', amount: '50', unit: 'g' }
        ],
        instructions: ['Grill salmon.', 'Chop veggies and toss with olive oil.'],
        tags: ['low-carb', 'heart-healthy', 'omega-3'],
        healthFlags: [],
        preparationTime: 20
    },
    {
        id: 'wes-1',
        name: 'Quinoa Power Bowl',
        description: 'Tricolor quinoa with roasted chickpeas, avocado, and tahini.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80',
        type: 'lunch',
        culture: 'western',
        nutrition: { calories: 480, protein: 18, carbs: 62, fats: 22, fiber: 14, sugar: 5 },
        ingredients: [
            { name: 'Quinoa', amount: '0.5', unit: 'cup' },
            { name: 'Chickpeas', amount: '100', unit: 'g' },
            { name: 'Avocado', amount: '0.5', unit: 'pc' }
        ],
        instructions: ['Cook quinoa.', 'Roast chickpeas.', 'Assemble bowl.'],
        tags: ['vegan', 'high-fiber', 'gluten-free'],
        healthFlags: [],
        preparationTime: 25
    },
    {
        id: 'wes-2',
        name: 'Berry Protein Oatmeal',
        description: 'Steel-cut oats with whey protein and mixed forest berries.',
        image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&q=80',
        type: 'breakfast',
        culture: 'western',
        nutrition: { calories: 350, protein: 25, carbs: 45, fats: 8, fiber: 10, sugar: 4 },
        ingredients: [
            { name: 'Oats', amount: '0.5', unit: 'cup' },
            { name: 'Blueberries', amount: '50', unit: 'g' },
            { name: 'Protein Powder', amount: '1', unit: 'scoop' }
        ],
        instructions: ['Cook oats.', 'Stir in protein.', 'Top with berries.'],
        tags: ['high-protein', 'breakfast'],
        healthFlags: [],
        preparationTime: 10
    },
    {
        id: 'af-4',
        name: 'Waakye with Egg and Wele',
        description: 'Rice and beans cooked with sorghum leaves for a unique color and flavor.',
        image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&q=80',
        type: 'breakfast',
        culture: 'african',
        origin: 'Ghana',
        nutrition: { calories: 550, protein: 22, carbs: 85, fats: 12, fiber: 15, sugar: 2 },
        ingredients: [
            { name: 'Rice', amount: '1', unit: 'cup' },
            { name: 'Black-eyed beans', amount: '1', unit: 'cup' },
            { name: 'Egg', amount: '1', unit: 'pc' }
        ],
        instructions: ['Cook rice and beans together.', 'Serve with shito and egg.'],
        tags: ['high-fiber', 'vegetarian-option'],
        healthFlags: [],
        preparationTime: 90
    }
];
