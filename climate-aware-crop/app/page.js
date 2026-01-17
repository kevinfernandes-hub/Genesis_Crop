'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* STICKY NAVIGATION - CONTAINER FIX: Full-width header with centered content */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Branding */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">Climate-Aware Crop Stress</p>
                <p className="text-xs text-gray-600">Monitoring System</p>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION - CONTAINER FIX: Full-width section with centered content */}
      <section className="w-full bg-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Detect Crop Stress Early.{' '}
              <span className="text-blue-600">Act Before Damage.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Climate-aware monitoring system utilizing satellite imagery and real-time weather data 
              to help farmers identify crop stress at early stages when intervention is most effective.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                View Dashboard
              </Link>
              <Link
                href="#system-overview"
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM OVERVIEW - CONTAINER FIX: Full-width section with centered max-w-7xl content */}
      <section id="system-overview" className="w-full bg-gray-50 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">System Overview</h2>
            <p className="text-lg text-gray-600">Three critical steps in climate-aware crop stress detection</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - Data Collection */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-4 flex-shrink-0">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Collection</h3>
              <p className="text-gray-600 leading-relaxed">
                Farmers input crop type, sowing date, and field location. System collects real-time 
                weather, soil moisture, and satellite imagery data.
              </p>
            </div>

            {/* Card 2 - AI Analysis */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:border-green-300 transition-colors">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mb-4 flex-shrink-0">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Machine learning models analyze weather patterns, soil conditions, and crop growth stage 
                to predict stress before visible damage occurs.
              </p>
            </div>

            {/* Card 3 - Actionable Insights */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:border-amber-300 transition-colors">
              <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold mb-4 flex-shrink-0">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Actionable Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Farmers receive timely alerts and recommendations via dashboard, SMS, voice, or WhatsApp 
                to take preventive action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL STACK - CONTAINER FIX: Full-width section with centered max-w-7xl content */}
      <section className="w-full bg-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Stack</h2>
            <p className="text-lg text-gray-600">Built on Google Cloud and open-source technologies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Google Cloud */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold">G</span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Google Cloud</h3>
              <p className="text-sm text-gray-600">Scalable infrastructure for real-time weather APIs and stress prediction.</p>
            </div>

            {/* Firebase */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center mb-4">
                <span className="text-orange-600 font-bold">F</span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Firebase</h3>
              <p className="text-sm text-gray-600">Authentication, Firestore database, offline sync, and real-time notifications.</p>
            </div>

            {/* Google Text-to-Speech */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center mb-4">
                <span className="text-green-600 font-bold">T</span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Google Text-to-Speech</h3>
              <p className="text-sm text-gray-600">Multi-language voice advisories for low-literacy farmers.</p>
            </div>

            {/* Google Maps API */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center mb-4">
                <span className="text-red-600 font-bold">M</span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Google Maps API</h3>
              <p className="text-sm text-gray-600">Location-specific weather patterns and regional climate intelligence.</p>
            </div>

            {/* Vertex AI & Google Colab */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center mb-4">
                <span className="text-purple-600 font-bold">V</span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Vertex AI & Colab</h3>
              <p className="text-sm text-gray-600">ML model training and stress pattern prediction algorithms.</p>
            </div>

            {/* Google Earth Engine */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold">E</span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Google Earth Engine</h3>
              <p className="text-sm text-gray-600">Satellite imagery analysis for vegetation and soil moisture monitoring.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANCED MONITORING - CONTAINER FIX: Full-width section with centered max-w-7xl content */}
      <section className="w-full bg-gray-50 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Features */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-10">Advanced Monitoring</h2>

              {/* Weather Tracking */}
              <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    W
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Weather Deviation Tracking</h3>
                    <p className="text-sm text-gray-600">Real-time temperature, humidity, and rainfall analysis against crop requirements.</p>
                  </div>
                </div>
              </div>

              {/* Soil Monitoring */}
              <div className="mb-8 p-6 bg-green-50 rounded-lg border border-green-100">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    S
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Soil Moisture Trends</h3>
                    <p className="text-sm text-gray-600">Satellite and forecast data to predict irrigation needs and water stress.</p>
                  </div>
                </div>
              </div>

              {/* Growth Stage Tracking */}
              <div className="p-6 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-amber-600 text-white rounded flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    G
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Crop Growth Stage Sensitivity</h3>
                    <p className="text-sm text-gray-600">Dynamic thresholds that adjust based on current growth phase and vulnerability.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Dashboard Skeleton */}
            <div>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Browser Frame */}
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>

                {/* Dashboard Content Skeleton */}
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-6 pb-4 border-b border-gray-200">
                    <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-64"></div>
                  </div>

                  {/* Status Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="h-3 bg-gray-300 rounded w-12 mb-2"></div>
                      <div className="h-6 bg-blue-100 rounded"></div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="h-3 bg-gray-300 rounded w-12 mb-2"></div>
                      <div className="h-6 bg-green-100 rounded"></div>
                    </div>
                  </div>

                  {/* Heatmap Placeholder */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 min-h-40 flex flex-col gap-2 justify-center">
                    <div className="h-4 bg-gradient-to-r from-blue-200 to-blue-100 rounded w-full"></div>
                    <div className="h-4 bg-gradient-to-r from-green-200 to-green-100 rounded w-full"></div>
                    <div className="h-4 bg-gradient-to-r from-amber-200 to-amber-100 rounded w-full"></div>
                    <p className="text-center text-xs text-gray-500 mt-4">Heatmap Visualization Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA - CONTAINER FIX: Full-width section with centered max-w-7xl content */}
      <section className="w-full bg-blue-600 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Support Farmers with Climate-Aware Decisions
            </h2>
            <p className="text-lg text-blue-100 mb-10 leading-relaxed">
              Join our mission to build resilient agriculture through data-driven monitoring. 
              Help farmers make informed decisions during critical crop growth periods.
            </p>
            <div className="flex justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - CONTAINER FIX: Full-width footer with centered max-w-7xl content */}
      <footer className="w-full bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-gray-800">
            {/* Left - Project Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs">CS</span>
                </div>
                <span className="text-white font-semibold">Climate-Aware Crop Stress</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                GDG Hackathon project focused on climate-resilient agriculture and farmer-friendly technology solutions.
              </p>
            </div>

            {/* Center - Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#system-overview" className="text-gray-400 hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Technologies</Link></li>
                <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>

            {/* Right - Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>GDG Hackathon 2026</li>
                <li>Climate & Agriculture Track</li>
                <li><a href="mailto:project@gdg.dev" className="hover:text-white transition-colors">project@gdg.dev</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-gray-500">
            <p>© 2026 Climate-Aware Crop Stress Monitoring System. Built for GDG Hackathon.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
