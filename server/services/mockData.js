// Mock Edamam API data for testing (42 dishes: 21 Veg + 21 Non-Veg)

const mockRecipes = {
  breakfast: [
    // ===== VEG (6) =====
    {
      label: 'Vegetable Upma',
      image: 'https://via.placeholder.com/300x200?text=Veg+Upma',
      calories: 320,
      source: 'Mock Data',
      url: 'https://example.com/upma',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['High-Fiber'],
      ingredients: [{ food: 'Semolina', weight: 80 }, { food: 'Vegetables', weight: 100 }]
    },
    {
      label: 'Poha with Peanuts',
      image: 'https://via.placeholder.com/300x200?text=Poha',
      calories: 300,
      source: 'Mock Data',
      url: 'https://example.com/poha',
      yield: 1,
      dietLabels: ['Vegetarian', 'Vegan'],
      healthLabels: ['Gluten-Free'],
      ingredients: [{ food: 'Flattened Rice', weight: 70 }, { food: 'Peanuts', weight: 30 }]
    },
    {
      label: 'Idli with Chutney',
      image: 'https://via.placeholder.com/300x200?text=Idli',
      calories: 280,
      source: 'Mock Data',
      url: 'https://example.com/idli',
      yield: 2,
      dietLabels: ['Vegetarian'],
      healthLabels: ['Low-Fat'],
      ingredients: [{ food: 'Rice Batter', weight: 120 }]
    },
    {
      label: 'Paneer Paratha',
      image: 'https://via.placeholder.com/300x200?text=Paneer+Paratha',
      calories: 420,
      source: 'Mock Data',
      url: 'https://example.com/paneer-paratha',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Paneer', weight: 80 }, { food: 'Wheat Flour', weight: 70 }]
    },
    {
      label: 'Oats Porridge',
      image: 'https://via.placeholder.com/300x200?text=Oats',
      calories: 250,
      source: 'Mock Data',
      url: 'https://example.com/oats',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['Heart-Healthy'],
      ingredients: [{ food: 'Oats', weight: 60 }]
    },
    {
      label: 'Fruit Smoothie',
      image: 'https://via.placeholder.com/300x200?text=Smoothie',
      calories: 220,
      source: 'Mock Data',
      url: 'https://example.com/smoothie',
      yield: 1,
      dietLabels: ['Vegetarian', 'Vegan'],
      healthLabels: ['Low-Calorie'],
      ingredients: [{ food: 'Mixed Fruits', weight: 200 }]
    },

    // ===== NON-VEG (6) =====
    {
      label: 'Boiled Eggs with Toast',
      image: 'https://via.placeholder.com/300x200?text=Eggs+Toast',
      calories: 350,
      source: 'Mock Data',
      url: 'https://example.com/eggs-toast',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Eggs', weight: 100 }, { food: 'Bread', weight: 50 }]
    },
    {
      label: 'Chicken Omelette',
      image: 'https://via.placeholder.com/300x200?text=Chicken+Omelette',
      calories: 400,
      source: 'Mock Data',
      url: 'https://example.com/chicken-omelette',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Eggs', weight: 120 }, { food: 'Chicken', weight: 60 }]
    },
    {
      label: 'Egg Bhurji',
      image: 'https://via.placeholder.com/300x200?text=Egg+Bhurji',
      calories: 370,
      source: 'Mock Data',
      url: 'https://example.com/egg-bhurji',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Eggs', weight: 120 }]
    },
    {
      label: 'Chicken Sausage Sandwich',
      image: 'https://via.placeholder.com/300x200?text=Sausage+Sandwich',
      calories: 420,
      source: 'Mock Data',
      url: 'https://example.com/sausage',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Chicken Sausage', weight: 100 }]
    },
    {
      label: 'Fish Omelette',
      image: 'https://via.placeholder.com/300x200?text=Fish+Omelette',
      calories: 390,
      source: 'Mock Data',
      url: 'https://example.com/fish-omelette',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['Omega-3'],
      ingredients: [{ food: 'Fish', weight: 80 }, { food: 'Eggs', weight: 80 }]
    },
    {
      label: 'Chicken Toast',
      image: 'https://via.placeholder.com/300x200?text=Chicken+Toast',
      calories: 360,
      source: 'Mock Data',
      url: 'https://example.com/chicken-toast',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Chicken', weight: 90 }]
    }
  ],

  lunch: [
    // ===== VEG (7) =====
    {
      label: 'Rajma Chawal',
      image: 'https://via.placeholder.com/300x200?text=Rajma+Chawal',
      calories: 520,
      source: 'Mock Data',
      url: 'https://example.com/rajma',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['High-Fiber'],
      ingredients: [{ food: 'Kidney Beans', weight: 120 }, { food: 'Rice', weight: 150 }]
    },
    {
      label: 'Vegetable Biryani',
      image: 'https://via.placeholder.com/300x200?text=Veg+Biryani',
      calories: 550,
      source: 'Mock Data',
      url: 'https://example.com/veg-biryani',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['High-Fiber'],
      ingredients: [{ food: 'Rice', weight: 160 }]
    },
    {
      label: 'Dal Tadka',
      image: 'https://via.placeholder.com/300x200?text=Dal',
      calories: 430,
      source: 'Mock Data',
      url: 'https://example.com/dal',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Lentils', weight: 120 }]
    },
    {
      label: 'Veg Pulao',
      image: 'https://via.placeholder.com/300x200?text=Veg+Pulao',
      calories: 480,
      source: 'Mock Data',
      url: 'https://example.com/pulao',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['Low-Fat'],
      ingredients: [{ food: 'Rice', weight: 150 }]
    },
    {
      label: 'Chole Bhature',
      image: 'https://via.placeholder.com/300x200?text=Chole',
      calories: 600,
      source: 'Mock Data',
      url: 'https://example.com/chole',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['High-Fiber'],
      ingredients: [{ food: 'Chickpeas', weight: 140 }]
    },
    {
      label: 'Vegetable Khichdi',
      image: 'https://via.placeholder.com/300x200?text=Khichdi',
      calories: 420,
      source: 'Mock Data',
      url: 'https://example.com/khichdi',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['Easy-Digest'],
      ingredients: [{ food: 'Rice', weight: 100 }]
    },
    {
      label: 'Paneer Rice Bowl',
      image: 'https://via.placeholder.com/300x200?text=Paneer+Bowl',
      calories: 500,
      source: 'Mock Data',
      url: 'https://example.com/paneer-bowl',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Paneer', weight: 120 }]
    },

    // ===== NON-VEG (7) =====
    {
      label: 'Chicken Biryani',
      image: 'https://via.placeholder.com/300x200?text=Chicken+Biryani',
      calories: 650,
      source: 'Mock Data',
      url: 'https://example.com/chicken-biryani',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Chicken', weight: 180 }]
    },
    {
      label: 'Fish Curry with Rice',
      image: 'https://via.placeholder.com/300x200?text=Fish+Curry',
      calories: 580,
      source: 'Mock Data',
      url: 'https://example.com/fish-curry',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['Omega-3'],
      ingredients: [{ food: 'Fish', weight: 150 }]
    },
    {
      label: 'Chicken Curry',
      image: 'https://via.placeholder.com/300x200?text=Chicken+Curry',
      calories: 560,
      source: 'Mock Data',
      url: 'https://example.com/chicken-curry',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Chicken', weight: 170 }]
    },
    {
      label: 'Egg Curry',
      image: 'https://via.placeholder.com/300x200?text=Egg+Curry',
      calories: 480,
      source: 'Mock Data',
      url: 'https://example.com/egg-curry',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Eggs', weight: 140 }]
    },
    {
      label: 'Mutton Rice',
      image: 'https://via.placeholder.com/300x200?text=Mutton+Rice',
      calories: 680,
      source: 'Mock Data',
      url: 'https://example.com/mutton-rice',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Mutton', weight: 180 }]
    },
    {
      label: 'Chicken Fried Rice',
      image: 'https://via.placeholder.com/300x200?text=Chicken+Fried+Rice',
      calories: 620,
      source: 'Mock Data',
      url: 'https://example.com/fried-rice',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Chicken', weight: 120 }]
    },
    {
      label: 'Fish Fry Plate',
      image: 'https://via.placeholder.com/300x200?text=Fish+Fry',
      calories: 500,
      source: 'Mock Data',
      url: 'https://example.com/fish-fry',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['Omega-3'],
      ingredients: [{ food: 'Fish', weight: 160 }]
    }
  ]
};

module.exports = mockRecipes;
