"use client";

import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Build Bazaar
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in building the perfect custom PC. We combine
            expertise, quality components, and exceptional service to bring your
            dream build to life.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-4">
                At Build Bazaar, we're passionate about helping everyone access
                high-quality, custom-built PCs. Our mission is to simplify the
                PC building process while ensuring premium quality and
                performance.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Expert Component Selection
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Quality Assurance
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Lifetime Support
                </li>
              </ul>
            </div>
            <div className="relative h-64 md:h-full">
              <Image
                src="/images/about-mission.png"
                alt="Custom PC Building"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Team
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              {
                name: "Omkar Sonawane",
                role: "Developer",
                // bio: "1+ years of experience in web development",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center w-full max-w-sm"
              >
                <Image
                  src="/images/omkar.png"
                  alt={member.name}
                  width={96}
                  height={96}
                  className="rounded-full mx-auto mb-4 object-cover"
                />

                <h3 className="text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-blue-600 mb-2">{member.role}</p>
                {/* <p className="text-gray-600">{member.bio}</p> */}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600">buildbazaar@gmail.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+123456789</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-gray-600">Mumbai, Maharashtra</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
