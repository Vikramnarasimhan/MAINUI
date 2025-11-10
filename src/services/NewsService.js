import axios from 'axios';

const API_KEY = 'demo';
const BASE_URL = 'https://newsapi.org/v2';

// EXPANDED Sample news (30+ articles for multiple carousel pages)
const SAMPLE_NEWS = [
  // Technology News (0-9)
  {
    title: "Tech Giants Face AI Regulation Challenges",
    description: "Global leaders agree on new guidelines for responsible AI use in technology sector.",
    source: { name: "TECHCRUNCH" },
    author: "Tech Editor",
    publishedAt: new Date(Date.now() - 60 * 60000).toISOString(),
    url: "https://news.example.com/1",
    urlToImage: null,
  },
  {
    title: "India's Space Tech Startups Raise $500M",
    description: "Private space companies secure massive funding for satellite and launch services.",
    source: { name: "Economic Times" },
    author: "Startup Correspondent",
    publishedAt: new Date(Date.now() - 120 * 60000).toISOString(),
    url: "https://news.example.com/2",
    urlToImage: null,
  },
  {
    title: "5G Rollout Reaches 500 Cities",
    description: "Telecom operators expand next-gen network coverage across tier-2 and tier-3 cities.",
    source: { name: "Livemint" },
    author: "Telecom Desk",
    publishedAt: new Date(Date.now() - 180 * 60000).toISOString(),
    url: "https://news.example.com/3",
    urlToImage: null,
  },
  {
    title: "Cybersecurity Threats Rise 40%",
    description: "Experts warn of sophisticated attacks targeting financial institutions.",
    source: { name: "ZDNet" },
    author: "Security Analyst",
    publishedAt: new Date(Date.now() - 240 * 60000).toISOString(),
    url: "https://news.example.com/4",
    urlToImage: null,
  },
  {
    title: "Quantum Computing Breakthrough Announced",
    description: "Indian researchers achieve significant milestone in quantum error correction.",
    source: { name: "Science Daily" },
    author: "Science Reporter",
    publishedAt: new Date(Date.now() - 300 * 60000).toISOString(),
    url: "https://news.example.com/5",
    urlToImage: null,
  },
  {
    title: "Cloud Computing Market Grows 35%",
    description: "Enterprises accelerate digital transformation with cloud adoption.",
    source: { name: "Forbes" },
    author: "Tech Analyst",
    publishedAt: new Date(Date.now() - 360 * 60000).toISOString(),
    url: "https://news.example.com/6",
    urlToImage: null,
  },
  {
    title: "Electric Vehicles Sales Surge",
    description: "EV market share reaches 15% as consumers embrace clean energy.",
    source: { name: "Auto News" },
    author: "Auto Correspondent",
    publishedAt: new Date(Date.now() - 420 * 60000).toISOString(),
    url: "https://news.example.com/7",
    urlToImage: null,
  },
  {
    title: "Blockchain Technology in Healthcare",
    description: "Hospitals adopt blockchain for secure patient data management.",
    source: { name: "Health Tech" },
    author: "Health Reporter",
    publishedAt: new Date(Date.now() - 480 * 60000).toISOString(),
    url: "https://news.example.com/8",
    urlToImage: null,
  },
  {
    title: "Artificial Intelligence in Education",
    description: "AI-powered learning platforms transform classroom experiences.",
    source: { name: "EdTech Today" },
    author: "Education Desk",
    publishedAt: new Date(Date.now() - 540 * 60000).toISOString(),
    url: "https://news.example.com/9",
    urlToImage: null,
  },
  {
    title: "Robotics Revolution in Manufacturing",
    description: "Automation increases productivity by 50% in production facilities.",
    source: { name: "Manufacturing News" },
    author: "Industry Reporter",
    publishedAt: new Date(Date.now() - 600 * 60000).toISOString(),
    url: "https://news.example.com/10",
    urlToImage: null,
  },

  // Business & Economy (10-19)
  {
    title: "Stock Markets Hit All-Time High",
    description: "Sensex crosses 80,000 mark amid strong corporate earnings and FII inflows.",
    source: { name: "Bloomberg" },
    author: "Market Reporter",
    publishedAt: new Date(Date.now() - 660 * 60000).toISOString(),
    url: "https://news.example.com/11",
    urlToImage: null,
  },
  {
    title: "RBI Keeps Interest Rates Unchanged",
    description: "Central bank maintains status quo citing balanced inflation and growth outlook.",
    source: { name: "Moneycontrol" },
    author: "Banking Correspondent",
    publishedAt: new Date(Date.now() - 720 * 60000).toISOString(),
    url: "https://news.example.com/12",
    urlToImage: null,
  },
  {
    title: "Startup Funding Rebounds in Q4",
    description: "Venture capital investments surge 60% as market confidence returns.",
    source: { name: "YourStory" },
    author: "Startup Editor",
    publishedAt: new Date(Date.now() - 780 * 60000).toISOString(),
    url: "https://news.example.com/13",
    urlToImage: null,
  },
  {
    title: "Gold Prices Touch ₹65,000 Per 10g",
    description: "Precious metal hits record high on geopolitical tensions and safe-haven demand.",
    source: { name: "NDTV Profit" },
    author: "Commodities Desk",
    publishedAt: new Date(Date.now() - 840 * 60000).toISOString(),
    url: "https://news.example.com/14",
    urlToImage: null,
  },
  {
    title: "GST Collections Cross ₹2 Lakh Crore",
    description: "Record monthly collections signal economic recovery and improved compliance.",
    source: { name: "Business Standard" },
    author: "Tax Reporter",
    publishedAt: new Date(Date.now() - 900 * 60000).toISOString(),
    url: "https://news.example.com/15",
    urlToImage: null,
  },
  {
    title: "Real Estate Market Shows Recovery",
    description: "Property sales increase 25% as demand picks up in major cities.",
    source: { name: "Property Times" },
    author: "Real Estate Desk",
    publishedAt: new Date(Date.now() - 960 * 60000).toISOString(),
    url: "https://news.example.com/16",
    urlToImage: null,
  },
  {
    title: "Export Growth Exceeds Expectations",
    description: "Indian exports grow 15% driven by IT services and manufacturing.",
    source: { name: "Trade Journal" },
    author: "Trade Correspondent",
    publishedAt: new Date(Date.now() - 1020 * 60000).toISOString(),
    url: "https://news.example.com/17",
    urlToImage: null,
  },
  {
    title: "Banking Sector Reports Strong Profits",
    description: "Major banks announce record quarterly earnings on loan growth.",
    source: { name: "Financial Express" },
    author: "Banking Reporter",
    publishedAt: new Date(Date.now() - 1080 * 60000).toISOString(),
    url: "https://news.example.com/18",
    urlToImage: null,
  },
  {
    title: "Insurance Industry Sees Digital Shift",
    description: "Online insurance sales double as consumers embrace digital platforms.",
    source: { name: "Insurance Today" },
    author: "Insurance Desk",
    publishedAt: new Date(Date.now() - 1140 * 60000).toISOString(),
    url: "https://news.example.com/19",
    urlToImage: null,
  },
  {
    title: "Retail Sector Bounces Back",
    description: "Consumer spending increases 20% during festive season sales.",
    source: { name: "Retail News" },
    author: "Retail Correspondent",
    publishedAt: new Date(Date.now() - 1200 * 60000).toISOString(),
    url: "https://news.example.com/20",
    urlToImage: null,
  },

  // More Technology (20-29)
  {
    title: "Smartphones Get AI-Powered Cameras",
    description: "New flagship phones feature advanced computational photography.",
    source: { name: "GSM Arena" },
    author: "Mobile Reviewer",
    publishedAt: new Date(Date.now() - 1260 * 60000).toISOString(),
    url: "https://news.example.com/21",
    urlToImage: null,
  },
  {
    title: "Gaming Industry Worth $200 Billion",
    description: "Mobile gaming drives growth in entertainment sector.",
    source: { name: "Gaming News" },
    author: "Gaming Editor",
    publishedAt: new Date(Date.now() - 1320 * 60000).toISOString(),
    url: "https://news.example.com/22",
    urlToImage: null,
  },
  {
    title: "Social Media Usage Grows 30%",
    description: "Short-form video content drives engagement across platforms.",
    source: { name: "Social Today" },
    author: "Social Media Analyst",
    publishedAt: new Date(Date.now() - 1380 * 60000).toISOString(),
    url: "https://news.example.com/23",
    urlToImage: null,
  },
  {
    title: "Internet of Things Market Expands",
    description: "Smart home devices adoption accelerates in urban areas.",
    source: { name: "IoT Weekly" },
    author: "IoT Specialist",
    publishedAt: new Date(Date.now() - 1440 * 60000).toISOString(),
    url: "https://news.example.com/24",
    urlToImage: null,
  },
  {
    title: "Augmented Reality in Retail",
    description: "AR shopping experiences boost online sales conversions.",
    source: { name: "Retail Tech" },
    author: "Tech Reporter",
    publishedAt: new Date(Date.now() - 1500 * 60000).toISOString(),
    url: "https://news.example.com/25",
    urlToImage: null,
  },
  {
    title: "Voice Assistants Get Smarter",
    description: "AI improvements enable more natural conversations.",
    source: { name: "Voice Tech" },
    author: "AI Correspondent",
    publishedAt: new Date(Date.now() - 1560 * 60000).toISOString(),
    url: "https://news.example.com/26",
    urlToImage: null,
  },
  {
    title: "Wearable Technology Market Booms",
    description: "Fitness trackers and smartwatches see record sales.",
    source: { name: "Wearables News" },
    author: "Gadget Reviewer",
    publishedAt: new Date(Date.now() - 1620 * 60000).toISOString(),
    url: "https://news.example.com/27",
    urlToImage: null,
  },
  {
    title: "Data Privacy Regulations Tighten",
    description: "New laws give consumers more control over personal data.",
    source: { name: "Privacy News" },
    author: "Legal Correspondent",
    publishedAt: new Date(Date.now() - 1680 * 60000).toISOString(),
    url: "https://news.example.com/28",
    urlToImage: null,
  },
  {
    title: "Green Technology Investment Rises",
    description: "Clean tech startups attract billion-dollar funding rounds.",
    source: { name: "Green Tech" },
    author: "Environment Desk",
    publishedAt: new Date(Date.now() - 1740 * 60000).toISOString(),
    url: "https://news.example.com/29",
    urlToImage: null,
  },
  {
    title: "Digital Payment Adoption Grows",
    description: "UPI transactions cross 10 billion monthly mark.",
    source: { name: "Fintech Times" },
    author: "Fintech Reporter",
    publishedAt: new Date(Date.now() - 1800 * 60000).toISOString(),
    url: "https://news.example.com/30",
    urlToImage: null,
  },
];

class NewsService {
  async getAllNews() {
    try {
      if (API_KEY === 'YOUR_API_KEY_HERE') {
        console.log('Using expanded sample news data');
        return [...SAMPLE_NEWS];
      }

      const response = await axios.get(`${BASE_URL}/top-headlines`, {
        params: {
          country: 'in',
          apiKey: API_KEY,
          pageSize: 100,
        }
      });

      return response.data.articles;
    } catch (error) {
      console.error('NewsService error:', error);
      return [...SAMPLE_NEWS];
    }
  }

  async getNewsByCategory(category) {
    try {
      if (API_KEY === 'YOUR_API_KEY_HERE') {
        // Return all news (filtering by category can be done in component)
        return [...SAMPLE_NEWS];
      }

      const response = await axios.get(`${BASE_URL}/top-headlines`, {
        params: {
          country: 'in',
          category: category,
          apiKey: API_KEY,
          pageSize: 100,
        }
      });

      return response.data.articles;
    } catch (error) {
      console.error('NewsService error:', error);
      return [...SAMPLE_NEWS];
    }
  }
}

export async function apiCall(payload) {
  const AUTH_API_URL = "https://5847w2s6ag.execute-api.eu-central-1.amazonaws.com/dev/"; // Replace with your auth backend URL
  
  try {
    const response = await fetch(AUTH_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Call Error:", error);
    throw error;
  }
}

export default new NewsService();
