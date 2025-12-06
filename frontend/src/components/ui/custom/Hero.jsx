import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <div className="max-w-4xl mx-auto mt-20 px-6 text-center">

      {/* Heading */}
      <h1 className="font-extrabold text-[40px] leading-tight mb-6">
        <span className="text-[#f56551]">Discover Your Next Adventure with AI:</span>
        <br />
        Personalized Itineraries at Your Fingertips
      </h1>

      {/* Paragraph */}
      <p className="text-lg text-gray-500 mb-6">
        Your personal trip planner and travel curator, creating custom itineraries
        tailored to your interests and budget.
      </p>

      {/* Button */}
      <Link to={'/create-trip'}>
      <Button>Get Started, It's Free</Button>
    </Link>
    </div>
  )
}

export default Hero
