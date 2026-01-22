const axios = require('axios');
require('dotenv').config();

async function testEdamamAPI() {
  console.log('\n🧪 Testing Edamam API Connection...\n');
  
  const APP_ID = process.env.EDAMAM_APP_ID;
  const API_KEY = process.env.EDAMAM_API_KEY;
  
  console.log('Environment Check:');
  console.log('✓ App ID:', APP_ID ? 'SET' : '❌ NOT SET');
  console.log('✓ API Key:', API_KEY ? 'SET' : '❌ NOT SET');
  
  if (!APP_ID || !API_KEY) {
    console.log('\n❌ Missing API credentials! Please check your .env file.');
    process.exit(1);
  }

  try {
    console.log('\n🔗 Testing API endpoint...');
    console.log('URL: https://api.edamam.com/api/recipes/v2');
    
    // Try with app_key (common format)
    const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
      params: {
        type: 'public',
        q: 'chicken',
        app_id: APP_ID,
        app_key: API_KEY,
        from: 0,
        to: 5
      }
    });

    console.log('\n✅ API Connection Successful!');
    console.log(`Found ${response.data.hits?.length || 0} recipes`);
    
    if (response.data.hits && response.data.hits.length > 0) {
      console.log('\n📋 Sample Recipe:');
      const recipe = response.data.hits[0].recipe;
      console.log(`  Name: ${recipe.label}`);
      console.log(`  Calories: ${Math.round(recipe.calories)}`);
      console.log(`  Source: ${recipe.source}`);
    }
    
    process.exit(0);
  } catch (error) {
    console.log('\n❌ API Connection Failed!');
    console.log('Status:', error.response?.status);
    console.log('Message:', error.response?.statusText);
    console.log('Error:', error.message);
    
    if (error.response?.status === 401) {
      console.log('\n⚠️  Authentication failed! Check your API credentials.');
    } else if (error.response?.status === 404) {
      console.log('\n⚠️  Endpoint not found! API URL might be incorrect.');
    }
    
    process.exit(1);
  }
}

testEdamamAPI();
