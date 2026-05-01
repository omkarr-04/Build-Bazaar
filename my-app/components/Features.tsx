import './Features.css'

const features = [
  { icon: '🚚', title: 'Free Shipping', description: 'Free Shipping On All Order' },
  { icon: '💰', title: 'Safe Money', description: '30 Days Money Back' },
  { icon: '🔒', title: 'Secure Payment', description: 'All Payment Secure' },
  { icon: '🕒', title: 'Online Support 24/7', description: 'Technical Support 24/7' },
]

const Features = () => {
  return (
    <section className="features">
      <div className="container">
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

