const mongoose = require('mongoose');
const Product = require('./models/Product');
const Blog = require('./models/Blog');
require('dotenv').config();

const sampleProducts = [
  {
    name: "Organic Fresh Strawberries",
    description: "Sweet, juicy organic strawberries perfect for desserts, smoothies, or snacking. Grown without pesticides.",
    price: 4.99,
    category: "fruits",
    imageGallery: [
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
    ],
    nutritionFacts: {
      calories: 32,
      protein: 0.7,
      carbohydrates: 7.7,
      fat: 0.3,
      fiber: 2.0,
      sugar: 4.9,
      sodium: 1,
      servingSize: "1 cup (152g)"
    },
    stockQuantity: 50
  },
  {
    name: "Fresh Organic Spinach",
    description: "Tender, fresh organic spinach leaves perfect for salads, smoothies, and cooking. Rich in iron and vitamins.",
    price: 3.49,
    category: "vegetables",
    imageGallery: [
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400"
    ],
    nutritionFacts: {
      calories: 23,
      protein: 2.9,
      carbohydrates: 3.6,
      fat: 0.4,
      fiber: 2.2,
      sugar: 0.4,
      sodium: 79,
      servingSize: "1 cup (30g)"
    },
    stockQuantity: 30
  },
  {
    name: "Free-Range Chicken Breast",
    description: "Premium free-range chicken breast, hormone-free and antibiotic-free. Perfect for healthy meals.",
    price: 12.99,
    category: "meat",
    imageGallery: [
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=400"
    ],
    nutritionFacts: {
      calories: 165,
      protein: 31,
      carbohydrates: 0,
      fat: 3.6,
      fiber: 0,
      sugar: 0,
      sodium: 74,
      servingSize: "100g"
    },
    stockQuantity: 25
  },
  {
    name: "Organic Greek Yogurt",
    description: "Creamy, thick organic Greek yogurt made from grass-fed milk. High in protein and probiotics.",
    price: 6.99,
    category: "dairy",
    imageGallery: [
      "https://images.unsplash.com/photo-1571212058492-3771d6f27dcc?w=400",
      "https://images.unsplash.com/photo-1551024731-0c0b0b0b0b0b?w=400"
    ],
    nutritionFacts: {
      calories: 100,
      protein: 17,
      carbohydrates: 6,
      fat: 0,
      fiber: 0,
      sugar: 4,
      sodium: 50,
      servingSize: "1 cup (170g)"
    },
    stockQuantity: 40
  },
  {
    name: "Quinoa Grain Mix",
    description: "Premium organic quinoa mixed with ancient grains. Perfect base for salads, bowls, and side dishes.",
    price: 8.99,
    category: "grains",
    imageGallery: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=400"
    ],
    nutritionFacts: {
      calories: 222,
      protein: 8,
      carbohydrates: 39,
      fat: 4,
      fiber: 5,
      sugar: 0,
      sodium: 7,
      servingSize: "1 cup cooked (185g)"
    },
    stockQuantity: 35
  },
  {
    name: "Cold-Pressed Green Juice",
    description: "Fresh cold-pressed green juice with kale, spinach, apple, and lemon. No added sugars or preservatives.",
    price: 7.99,
    category: "beverages",
    imageGallery: [
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"
    ],
    nutritionFacts: {
      calories: 45,
      protein: 2,
      carbohydrates: 10,
      fat: 0,
      fiber: 2,
      sugar: 8,
      sodium: 15,
      servingSize: "1 bottle (16oz)"
    },
    stockQuantity: 20
  }
];

const sampleBlogs = [
  {
    title: "The Benefits of Organic Food",
    content: "Organic food has become increasingly popular in recent years, and for good reason. Studies have shown that organic foods contain higher levels of certain nutrients, including antioxidants, vitamins, and minerals. They are also free from synthetic pesticides, herbicides, and genetically modified organisms (GMOs).\n\nChoosing organic food not only benefits your health but also supports sustainable farming practices that protect the environment. Organic farming methods help preserve soil quality, reduce water pollution, and promote biodiversity.\n\nWhen shopping for organic products, look for the USDA Organic seal to ensure you're getting certified organic food. While organic food may cost more, the health and environmental benefits make it a worthwhile investment for many families.",
    author: "Dr. Sarah Johnson",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
    excerpt: "Discover the health and environmental benefits of choosing organic food for your family.",
    tags: ["organic", "health", "nutrition", "sustainable farming"],
    published: true
  },
  {
    title: "5 Easy Healthy Breakfast Ideas",
    content: "Starting your day with a nutritious breakfast sets the tone for healthy eating throughout the day. Here are five simple and delicious breakfast ideas that are both healthy and quick to prepare:\n\n1. **Overnight Oats**: Mix rolled oats with Greek yogurt, chia seeds, and your favorite fruits. Let it sit overnight for a ready-to-eat breakfast.\n\n2. **Avocado Toast**: Top whole-grain bread with mashed avocado, a sprinkle of salt, and optional toppings like tomatoes or eggs.\n\n3. **Smoothie Bowl**: Blend frozen fruits with Greek yogurt and top with granola, nuts, and fresh berries.\n\n4. **Egg Scramble**: Scramble eggs with vegetables like spinach, tomatoes, and bell peppers for a protein-rich start.\n\n5. **Greek Yogurt Parfait**: Layer Greek yogurt with fresh berries and a drizzle of honey for a sweet and satisfying breakfast.\n\nThese breakfast options provide a good balance of protein, fiber, and healthy fats to keep you energized throughout the morning.",
    author: "Chef Michael Chen",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800",
    excerpt: "Start your day right with these five nutritious and delicious breakfast ideas that are easy to prepare.",
    tags: ["breakfast", "healthy eating", "recipes", "nutrition"],
    published: true
  },
  {
    title: "Understanding Food Labels: A Complete Guide",
    content: "Reading food labels can be confusing, but understanding them is crucial for making informed dietary choices. Here's a comprehensive guide to help you decode food labels:\n\n**Serving Size**: This tells you the amount of food the nutrition information is based on. All other values on the label are per serving.\n\n**Calories**: Shows the energy content per serving. For weight management, pay attention to calories per serving.\n\n**Macronutrients**:\n- **Total Fat**: Includes saturated and trans fats. Limit saturated fats and avoid trans fats.\n- **Cholesterol**: Should be limited to less than 300mg per day.\n- **Sodium**: Aim for less than 2,300mg per day.\n- **Total Carbohydrates**: Includes sugars, fiber, and other carbs.\n- **Protein**: Essential for muscle building and repair.\n\n**Ingredients List**: Ingredients are listed in descending order by weight. Avoid products with long ingredient lists or ingredients you can't pronounce.\n\n**Health Claims**: Be cautious of marketing terms like 'natural,' 'organic,' or 'healthy' as they may not always mean what you think.\n\nBy understanding these label components, you can make better choices for your health and dietary goals.",
    author: "Nutritionist Lisa Rodriguez",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    excerpt: "Learn how to read and understand food labels to make informed dietary choices for your health.",
    tags: ["food labels", "nutrition", "healthy eating", "diet"],
    published: true
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    await Blog.deleteMany({});
    console.log('🗑️ Cleared existing blogs');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('🍎 Sample products inserted successfully');

    // Insert sample blogs
    await Blog.insertMany(sampleBlogs);
    console.log('📝 Sample blogs inserted successfully');

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
