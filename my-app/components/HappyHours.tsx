'use client'

import './HappyHours.css'
import Link from 'next/link'

const HappyHours = () => {
  return (
    <section className="happy-hours">
      <div className="container">
        <div className="happy-content">
          <h2>Happy Hours</h2>
          <div className="discount">Up to 40% OFF</div>
          <Link href="/shop" className="btn">Shop Now</Link>
        </div>
      </div>
    </section>
  )
}

export default HappyHours

