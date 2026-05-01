'use client'

import './RecentNews.css'
import Image from 'next/image'
import GPU from './images/product/GPU.jpg'
import chatgpt from './images/product/GPU1.jpg'
import SSD from './images/product/SSD.jpeg'

const news = [
  {
    title: 'Cloud Gaming Set to Arrive in India as Nvidia Unveils GeForce Now Servers',
    description: 'The highly anticipated debut of Nvidia cloud gaming service in India comes amid a deepening global shortage of memory chips caused by the AI boom.',
    image: GPU,
    link: 'https://indianexpress.com/article/technology/gaming/nvidia-cloud-gaming-service-geforce-now-india-launch-10523722/'
  },
  {
    title: 'OpenAI to test ads in ChatGPT in bid to boost revenue',
    description: 'The money-losing startup plans to spend more than $1 trillion on artificial intelligence infrastructure by 2030, but has not given details on how it plans to fund it.',
    image: chatgpt,
    link: 'https://indianexpress.com/article/technology/openai-to-test-ads-in-chatgpt-in-bid-to-boost-revenue-10478807/'
  },
  {
    title: 'RAM and SSDs are getting expensive again, and AI may be the culprit',
    description: 'As AI demand grows, memory manufacturers are prioritizing the production of high-margin HBM chips over traditional DDR RAM.',
    image: SSD,
    link: 'https://indianexpress.com/article/technology/tech-news-technology/global-ram-ssd-price-hike-50-per-cent-ai-investment-10336255/'
  },
]

const RecentNews = () => {
  return (
    <section className="recent-news">
      <div className="container">
        <h2 className="section-title">Recent News</h2>
        <div className="news-grid">
          {news.map((item, index) => (
            <div key={index} className="news-item">
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={250}
                className="news-image"
                priority
              />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentNews
