const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// PC Builder - suggest components for a build
const buildPC = async (budget) => {
  try {
    const buildedgePercentages = {
      cpu: 0.25,      // 25% of budget
      gpu: 0.35,      // 35% of budget
      ram: 0.15,      // 15% of budget
      ssd: 0.15,      // 15% of budget
      other: 0.10     // 10% for PSU, cooler, etc
    };

    const cpuBudget = budget * buildedgePercentages.cpu;
    const gpuBudget = budget * buildedgePercentages.gpu;
    const ramBudget = budget * buildedgePercentages.ram;
    const ssdBudget = budget * buildedgePercentages.ssd;

    const [cpu, gpu, ram, ssd] = await Promise.all([
      Product.findOne({ 
        category: { $in: ['CPU', 'Processor'] },
        price: { $lte: cpuBudget }
      }).sort({ price: -1 }),
      Product.findOne({
        category: { $in: ['GPU', 'Graphics Card'] },
        price: { $lte: gpuBudget }
      }).sort({ price: -1 }),
      Product.findOne({
        category: { $in: ['RAM', 'Memory'] },
        price: { $lte: ramBudget }
      }).sort({ price: -1 }),
      Product.findOne({
        category: { $in: ['SSD', 'Storage'] },
        price: { $lte: ssdBudget }
      }).sort({ price: -1 })
    ]);

    const build = [];
    let totalPrice = 0;

    if (cpu) {
      build.push(`🔧 CPU: ${cpu.name} - $${cpu.price}`);
      totalPrice += cpu.price;
    }
    if (gpu) {
      build.push(`🎨 GPU: ${gpu.name} - $${gpu.price}`);
      totalPrice += gpu.price;
    }
    if (ram) {
      build.push(`💾 RAM: ${ram.name} - $${ram.price}`);
      totalPrice += ram.price;
    }
    if (ssd) {
      build.push(`💿 SSD: ${ssd.name} - $${ssd.price}`);
      totalPrice += ssd.price;
    }

    return {
      build,
      totalPrice,
      remaining: Math.max(0, budget - totalPrice)
    };
  } catch (error) {
    console.error('Error building PC:', error);
    return null;
  }
};

// Simulated AI response for PC building guidance
const generateAIResponse = async (userMessage, conversationHistory = []) => {
  const messageLower = userMessage.toLowerCase();

  // Budget extraction regex
  const budgetMatch = userMessage.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/);
  const budget = budgetMatch ? parseFloat(budgetMatch[1].replace(/,/g, '')) : null;

  // PC Builder logic
  if ((messageLower.includes('build') || messageLower.includes('pc') || messageLower.includes('budget')) && budget) {
    const buildResult = await buildPC(budget);
    if (buildResult && buildResult.build.length > 0) {
      let response = `💻 **PC Build Suggestion (Budget: $${budget})**\n\n`;
      response += buildResult.build.join('\n');
      response += `\n\n**Total: $${buildResult.totalPrice.toFixed(2)}**`;
      if (buildResult.remaining > 0) {
        response += `\nRemaining Budget: $${buildResult.remaining.toFixed(2)}`;
      }
      return response;
    }
  }

  // Component suggestions based on budget
  let suggestions = [];
  if (budget) {
    try {
      const products = await Product.find({ price: { $lte: budget } })
        .limit(5)
        .sort({ price: -1 });
      suggestions = products.map(p => ({ name: p.name, price: p.price, category: p.category }));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  // Compatibility check logic
  const compatibilityResponses = {
    compatibility: 'To check compatibility, please tell me:\n• CPU (e.g., Intel i9, AMD Ryzen 9)\n• Motherboard model\n• RAM amount and type\n• GPU model\n• Power supply wattage\n\nI\'ll verify if all components work together!',
    budget: 'Great! Let\'s build within your budget. Common configurations:\n\n💰 Budget Gaming ($800-1200): RTX 4060, i5-13400\n💰 Mid-Range ($1200-2000): RTX 4070, i7-13700\n💰 High-End ($2000+): RTX 4090, i9-13900K\n\nWhich tier interests you?',
    upgrade: 'To recommend upgrades, tell me:\n• Current components\n• Performance issues (FPS drops, heating, etc.)\n• Your budget for upgrades\n• Intended use (gaming, rendering, etc.)',
    help: 'I\'m your PC Build Assistant! I can help with:\n\n✅ Suggest components based on budget\n✅ Check component compatibility\n✅ Recommend upgrades\n✅ Explain GPU/CPU comparisons\n✅ Help with performance optimization\n\nWhat would you like help with?',
  };

  // Determine response type
  let response = '';

  if (messageLower.includes('help') || messageLower.includes('what can')) {
    response = compatibilityResponses.help;
  } else if (messageLower.includes('compatible') || messageLower.includes('compatibility')) {
    response = compatibilityResponses.compatibility;
  } else if (messageLower.includes('budget') || budget) {
    response = compatibilityResponses.budget;
    if (suggestions.length > 0) {
      response += '\n\n📦 Available Products:\n';
      suggestions.forEach((s, i) => {
        response += `${i + 1}. ${s.name} ($${s.price}) - ${s.category}\n`;
      });
    }
  } else if (messageLower.includes('upgrade')) {
    response = compatibilityResponses.upgrade;
  } else if (messageLower.includes('gaming') || messageLower.includes('game')) {
    response = '🎮 Gaming PC Recommendation:\n\n• Entry Level ($800): GTX 1660, i5-12400\n• 1080p High (1200): RTX 3060 Ti, i7-12700\n• 1440p Ultra ($1800): RTX 4070, i7-13700K\n• 4K Gaming ($3000+): RTX 4090, i9-13900K\n\nWhat resolution/FPS target do you want?';
  } else if (messageLower.includes('cpu') || messageLower.includes('processor')) {
    response = '🔧 CPU Selection Guide:\n\n• Gaming: AMD Ryzen 5 or Intel i5/i7\n• Content Creation: AMD Ryzen 7/9 or Intel i7/i9\n• Budget Build: AMD Ryzen 5 5600X\n• High-End: AMD Ryzen 9 7950X3D or Intel i9-13900K\n\nWhat\'s your use case and budget?';
  } else if (messageLower.includes('gpu') || messageLower.includes('graphics')) {
    response = '🎨 GPU Selection Guide:\n\n• Budget Gaming: RTX 4060 or RTX 3060\n• 1080p Gaming: RTX 4070\n• 1440p Gaming: RTX 4070 Super\n• 4K Gaming: RTX 4090\n\nWhat resolution are you targeting?';
  } else if (messageLower.includes('ram') || messageLower.includes('memory')) {
    response = '💾 RAM Recommendations:\n\n• Gaming: 16GB DDR5 (essential)\n• Content Creation: 32GB DDR5\n• Professional: 64GB+ DDR5\n• Gaming (Budget): 16GB DDR4\n\nWhat\'s your primary use?';
  } else if (messageLower.includes('power supply') || messageLower.includes('psu')) {
    response = '⚡ PSU Wattage Guide:\n\n• Budget Gaming: 550-650W 80+ Bronze\n• Mid-Range: 750W 80+ Gold\n• High-End Gaming: 850W 80+ Gold\n• Extreme (RTX 4090): 1200W 80+ Platinum\n\nTell me your components for exact calculation!';
  } else {
    response = 'I can help you build the perfect PC! You can ask me about:\n\n• Component recommendations\n• Compatibility checks\n• Budget builds\n• Performance comparisons\n\nWhat would you like to know?';
  }

  return response;
};

// Chat endpoint
router.post('/', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message' });
    }

    const response = await generateAIResponse(message, conversationHistory || []);

    res.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process chat message',
      response: 'Sorry, I encountered an error. Please try again.',
    });
  }
});

module.exports = router;
