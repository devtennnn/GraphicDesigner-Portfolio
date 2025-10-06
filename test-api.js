// Test API endpoints
async function testAPI() {
  try {
    console.log('Testing API endpoints...\n');
    
    // Test services endpoint
    console.log('1. Testing GET /api/services');
    const servicesResponse = await fetch('http://localhost:5000/api/services');
    console.log('Status:', servicesResponse.status);
    const servicesData = await servicesResponse.json();
    console.log('Data:', Array.isArray(servicesData) ? `Array with ${servicesData.length} items` : servicesData);
    
    // Test portfolio endpoint
    console.log('\n2. Testing GET /api/portfolio');
    const portfolioResponse = await fetch('http://localhost:5000/api/portfolio');
    console.log('Status:', portfolioResponse.status);
    const portfolioData = await portfolioResponse.json();
    console.log('Data:', Array.isArray(portfolioData) ? `Array with ${portfolioData.length} items` : portfolioData);
    
    // Test social links endpoint
    console.log('\n3. Testing GET /api/social-links');
    const socialResponse = await fetch('http://localhost:5000/api/social-links');
    console.log('Status:', socialResponse.status);
    const socialData = await socialResponse.json();
    console.log('Data:', Array.isArray(socialData) ? `Array with ${socialData.length} items` : socialData);
    
    console.log('\n✅ API test completed');
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

testAPI();