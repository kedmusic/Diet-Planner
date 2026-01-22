// Mock Vegetarian Food Data for testing

const vegetarianRecipes = {
  breakfast: [
    {
      label: 'Vegetable Upma',
      image: 'https://via.placeholder.com/300x200?text=Veg+Upma',
      calories: 320,
      source: 'Mock Data - Vegetarian',
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
      source: 'Mock Data - Vegetarian',
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
      source: 'Mock Data - Vegetarian',
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
      source: 'Mock Data - Vegetarian',
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
      source: 'Mock Data - Vegetarian',
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
      source: 'Mock Data - Vegetarian',
      url: 'https://example.com/smoothie',
      yield: 1,
      dietLabels: ['Vegetarian', 'Vegan'],
      healthLabels: ['Low-Calorie'],
      ingredients: [{ food: 'Mixed Fruits', weight: 200 }]
    },
    {
      label: 'Aloo Paratha',
      image: 'https://via.placeholder.com/300x200?text=Aloo+Paratha',
      calories: 400,
      source: 'Mock Data - Vegetarian',
      url: 'https://example.com/aloo-paratha',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['High-Carb'],
      ingredients: [{ food: 'Potato', weight: 100 }, { food: 'Wheat Flour', weight: 70 }]
    },
    {
      label: 'Dosa with Sambar',
      image: 'https://via.placeholder.com/300x200?text=Dosa',
      calories: 350,
      source: 'Mock Data - Vegetarian',
      url: 'https://example.com/dosa',
      yield: 2,
      dietLabels: ['Vegetarian'],
      healthLabels: ['Gluten-Free'],
      ingredients: [{ food: 'Rice Batter', weight: 100 }]
    }
  ],

  lunch: [
    {
      label: 'Rajma Chawal',
      image: 'https://via.placeholder.com/300x200?text=Rajma+Chawal',
      calories: 520,
      source: 'Mock Data - Vegetarian',
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
      source: 'Mock Data - Vegetarian',
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
      source: 'Mock Data - Vegetarian',
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
      source: 'Mock Data - Vegetarian',
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
      source: 'Mock Data - Vegetarian',
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
      source: 'Mock Data - Vegetarian',
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
      source: 'Mock Data - Vegetarian',
      url: 'https://example.com/paneer-bowl',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Paneer', weight: 120 }]
    },
    {
      label: 'Broccoli Stir Fry Rice',
      image: 'https://via.placeholder.com/300x200?text=Broccoli+Rice',
      calories: 450,
      source: 'Mock Data - Vegetarian',
      url: 'https://example.com/broccoli-rice',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['Low-Calorie'],
      ingredients: [{ food: 'Broccoli', weight: 150 }, { food: 'Rice', weight: 120 }]
    }
  ],

  dinner: [
    {
      label: 'Aloo Gobi Sabzi',
      image: 'https://via.placeholder.com/300x200?text=Aloo+Gobi',
      calories: 380,
      source: 'Mock Data - Vegetarian',
      url: 'https://example.com/aloo-gobi',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['Low-Calorie'],
      ingredients: [{ food: 'Potato', weight: 150 }, { food: 'Cauliflower', weight: 120 }]
    },
    {
      label: 'Chana Masala',
      image: 'https://via.placeholder.com/300x200?text=Chana+Masala',
      calories: 420,
      source: 'Mock Data - Vegetarian',
      url: 'https://example.com/chana-masala',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Chickpeas', weight: 150 }]
    },
    {
      label: 'Paneer Tikka Masala',
      image: 'https://via.placeholder.com/300x200?text=Paneer+Tikka',
      calories: 480,
      source: 'Mock Data - Vegetarian',
      url: 'https://example.com/paneer-tikka',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Paneer', weight: 150 }]
    },
    {
      label: 'Baingan Bharta',
      image: 'https://via.placeholder.com/300x200?text=Baingan+Bharta',
      calories: 340,
      source: 'Mock Data - Vegetarian',
      url: 'https://example.com/baingan-bharta',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['Low-Calorie'],
      ingredients: [{ food: 'Eggplant', weight: 200 }]
    },
    {
      label: 'Spinach Dal',
      image: 'https://via.placeholder.com/300x200?text=Spinach+Dal',
      calories: 390,
      source: 'Mock Data - Vegetarian',
      url: 'https://example.com/spinach-dal',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Spinach', weight: 150 }, { food: 'Lentils', weight: 100 }]
    },
    {
      label: 'Veg Curry Rice',
      image: 'https://via.placeholder.com/300x200?text=Veg+Curry',
      calories: 450,
      source: 'Mock Data - Vegetarian',
      url: 'https://example.com/veg-curry',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['Low-Fat'],
      ingredients: [{ food: 'Mixed Vegetables', weight: 200 }]
    },
    {
      label: 'Mushroom Rice',
      image: 'https://via.placeholder.com/300x200?text=Mushroom+Rice',
      calories: 410,
      source: 'Mock Data - Vegetarian',
      url: 'https://example.com/mushroom-rice',
      yield: 1,
      dietLabels: ['Vegetarian'],
      healthLabels: ['Low-Calorie'],
      ingredients: [{ food: 'Mushroom', weight: 180 }, { food: 'Rice', weight: 120 }]
    }
  ],

  snack: [
    {
      label: 'Vegetable Samosa',
      image: 'https://via.placeholder.com/300x200?text=Samosa',
      calories: 180,
      source: 'Mock Data - Vegetarian',
      url: 'https://example.com/samosa',
      yield: 2,
      dietLabels: ['Vegetarian'],
      healthLabels: [],
      ingredients: [{ food: 'Potato', weight: 80 }, { food: 'Wheat Flour', weight: 50 }]
    },
    {
      label: 'Roasted Chickpeas',
      image: 'https://via.placeholder.com/300x200?text=Roasted+Chickpeas',
      calories: 150,
      source: 'Mock Data - Vegetarian',
      url: 'https://example.com/chickpeas',
      yield: 1,
      dietLabels: ['Vegetarian', 'Vegan'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Chickpeas', weight: 100 }]
    },
    {
      label: 'Vegetable Pakora',
      image: 'https://via.placeholder.com/300x200?text=Pakora',
      calories: 160,
      source: 'Mock Data - Vegetarian',
      url: 'https://example.com/pakora',
      yield: 4,
      dietLabels: ['Vegetarian'],
      healthLabels: [],
      ingredients: [{ food: 'Vegetables', weight: 150 }]
    },
    {
      label: 'Fruit Chat',
      image: 'https://via.placeholder.com/300x200?text=Fruit+Chat',
      calories: 120,
      source: 'Mock Data - Vegetarian',
      url: 'https://example.com/fruit-chat',
      yield: 1,
      dietLabels: ['Vegetarian', 'Vegan'],
      healthLabels: ['Low-Calorie'],
      ingredients: [{ food: 'Mixed Fruits', weight: 200 }]
    }
  ]
};

module.exports = vegetarianRecipes;
