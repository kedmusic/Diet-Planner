// Mock Non-Vegetarian Food Data for testing

const nonVegetarianRecipes = {
  breakfast: [
    {
      label: 'Boiled Eggs with Toast',
      image: 'https://via.placeholder.com/300x200?text=Eggs+Toast',
      calories: 350,
      source: 'Mock Data - Non-Vegetarian',
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
      source: 'Mock Data - Non-Vegetarian',
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
      source: 'Mock Data - Non-Vegetarian',
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
      source: 'Mock Data - Non-Vegetarian',
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
      source: 'Mock Data - Non-Vegetarian',
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
      source: 'Mock Data - Non-Vegetarian',
      url: 'https://example.com/chicken-toast',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Chicken', weight: 90 }]
    },
    {
      label: 'Bacon and Egg Breakfast',
      image: 'https://via.placeholder.com/300x200?text=Bacon+Eggs',
      calories: 410,
      source: 'Mock Data - Non-Vegetarian',
      url: 'https://example.com/bacon-eggs',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Bacon', weight: 60 }, { food: 'Eggs', weight: 100 }]
    },
    {
      label: 'Smoked Salmon Toast',
      image: 'https://via.placeholder.com/300x200?text=Salmon+Toast',
      calories: 380,
      source: 'Mock Data - Non-Vegetarian',
      url: 'https://example.com/salmon-toast',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['Omega-3'],
      ingredients: [{ food: 'Salmon', weight: 80 }, { food: 'Bread', weight: 50 }]
    }
  ],

  lunch: [
    {
      label: 'Chicken Biryani',
      image: 'https://via.placeholder.com/300x200?text=Chicken+Biryani',
      calories: 650,
      source: 'Mock Data - Non-Vegetarian',
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
      source: 'Mock Data - Non-Vegetarian',
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
      source: 'Mock Data - Non-Vegetarian',
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
      source: 'Mock Data - Non-Vegetarian',
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
      source: 'Mock Data - Non-Vegetarian',
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
      source: 'Mock Data - Non-Vegetarian',
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
      source: 'Mock Data - Non-Vegetarian',
      url: 'https://example.com/fish-fry',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['Omega-3'],
      ingredients: [{ food: 'Fish', weight: 160 }]
    },
    {
      label: 'Prawn Pulao',
      image: 'https://via.placeholder.com/300x200?text=Prawn+Pulao',
      calories: 590,
      source: 'Mock Data - Non-Vegetarian',
      url: 'https://example.com/prawn-pulao',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['Omega-3'],
      ingredients: [{ food: 'Prawn', weight: 150 }, { food: 'Rice', weight: 120 }]
    }
  ],

  dinner: [
    {
      label: 'Grilled Chicken Breast',
      image: 'https://via.placeholder.com/300x200?text=Grilled+Chicken',
      calories: 450,
      source: 'Mock Data - Non-Vegetarian',
      url: 'https://example.com/grilled-chicken',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein', 'Low-Fat'],
      ingredients: [{ food: 'Chicken Breast', weight: 200 }]
    },
    {
      label: 'Fish Tandoori',
      image: 'https://via.placeholder.com/300x200?text=Fish+Tandoori',
      calories: 420,
      source: 'Mock Data - Non-Vegetarian',
      url: 'https://example.com/fish-tandoori',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['Omega-3', 'High-Protein'],
      ingredients: [{ food: 'Fish', weight: 180 }]
    },
    {
      label: 'Shrimp Stir Fry Rice',
      image: 'https://via.placeholder.com/300x200?text=Shrimp+Stir+Fry',
      calories: 480,
      source: 'Mock Data - Non-Vegetarian',
      url: 'https://example.com/shrimp-stir-fry',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['Omega-3'],
      ingredients: [{ food: 'Shrimp', weight: 150 }, { food: 'Rice', weight: 100 }]
    },
    {
      label: 'Chicken Tikka Masala',
      image: 'https://via.placeholder.com/300x200?text=Chicken+Tikka',
      calories: 520,
      source: 'Mock Data - Non-Vegetarian',
      url: 'https://example.com/chicken-tikka',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Chicken', weight: 180 }]
    },
    {
      label: 'Lamb Biryani',
      image: 'https://via.placeholder.com/300x200?text=Lamb+Biryani',
      calories: 680,
      source: 'Mock Data - Non-Vegetarian',
      url: 'https://example.com/lamb-biryani',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Lamb', weight: 180 }, { food: 'Rice', weight: 150 }]
    },
    {
      label: 'Turkey Meatballs',
      image: 'https://via.placeholder.com/300x200?text=Turkey+Meatballs',
      calories: 410,
      source: 'Mock Data - Non-Vegetarian',
      url: 'https://example.com/turkey-meatballs',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Turkey', weight: 170 }]
    },
    {
      label: 'Duck Curry',
      image: 'https://via.placeholder.com/300x200?text=Duck+Curry',
      calories: 550,
      source: 'Mock Data - Non-Vegetarian',
      url: 'https://example.com/duck-curry',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Duck', weight: 170 }]
    }
  ],

  snack: [
    {
      label: 'Chicken Samosa',
      image: 'https://via.placeholder.com/300x200?text=Chicken+Samosa',
      calories: 200,
      source: 'Mock Data - Non-Vegetarian',
      url: 'https://example.com/chicken-samosa',
      yield: 2,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: [],
      ingredients: [{ food: 'Chicken', weight: 100 }]
    },
    {
      label: 'Fish Pakora',
      image: 'https://via.placeholder.com/300x200?text=Fish+Pakora',
      calories: 180,
      source: 'Mock Data - Non-Vegetarian',
      url: 'https://example.com/fish-pakora',
      yield: 3,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['Omega-3'],
      ingredients: [{ food: 'Fish', weight: 120 }]
    },
    {
      label: 'Chicken Wings',
      image: 'https://via.placeholder.com/300x200?text=Chicken+Wings',
      calories: 210,
      source: 'Mock Data - Non-Vegetarian',
      url: 'https://example.com/chicken-wings',
      yield: 4,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Chicken Wings', weight: 150 }]
    },
    {
      label: 'Egg Salad',
      image: 'https://via.placeholder.com/300x200?text=Egg+Salad',
      calories: 160,
      source: 'Mock Data - Non-Vegetarian',
      url: 'https://example.com/egg-salad',
      yield: 1,
      dietLabels: ['Non-Vegetarian'],
      healthLabels: ['High-Protein'],
      ingredients: [{ food: 'Eggs', weight: 120 }]
    }
  ]
};

module.exports = nonVegetarianRecipes;
