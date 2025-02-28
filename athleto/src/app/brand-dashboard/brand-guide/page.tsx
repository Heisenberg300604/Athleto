import Link from "next/link"
import BrandNavbar from "@/components/BrandNavbar"

export default function AthletoPage() {
  return (
    <div className="min-h-screen bg-background">
      <BrandNavbar />
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full py-16 px-4 md:px-8 lg:px-16 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Revolutionizing 
            <br />
            <span className="text-indigo-600">Sports Engagement</span>
          </h1>

          <p className="text-gray-700 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Our innovative platform connects athletes with brands, creating meaningful partnerships that empower sports
            professionals while delivering authentic marketing opportunities.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="w-full py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Vision</h2>
          <p className="text-gray-700 text-center text-lg leading-relaxed">
            At Athleto, we believe in the power of authentic connections between athletes and brands. Our platform is
            designed to revolutionize the sports industry by creating a transparent ecosystem where athletes of all
            levels can find opportunities that align with their values and career goals.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="w-full py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">The Problem We're Solving</h2>
          <p className="text-gray-700 text-center text-lg leading-relaxed">
            Traditional sponsorship models favor only the top 1% of athletes, leaving the vast majority without access
            to valuable partnerships. Meanwhile, brands struggle to connect with authentic ambassadors who truly
            represent their values and can engage with targeted audiences.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="w-full py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Solution</h2>
          <p className="text-gray-700 text-center text-lg leading-relaxed">
            Athleto's platform uses advanced matching algorithms to connect brands with the perfect athlete ambassadors
            based on demographics, performance metrics, social engagement, and brand affinity. We provide end-to-end
            management of partnerships, from discovery to execution and performance tracking.
          </p>
        </div>
      </section>

      {/* Detailed Presentation Section */}
      <section className="w-full py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Detailed Presentation</h2>
          <p className="text-gray-700 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed mb-12">
            Below you'll find our comprehensive presentation that outlines our business model, market analysis, and
            growth strategy. Feel free to navigate through the document to learn more about our vision for transforming
            the sports industry.
          </p>
        </div>
      </section>

      {/* Presentation Card Section */}
      <section className="w-full py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-3xl font-bold mb-6">Our Presentation</h3>
            <p className="text-gray-700 text-lg mb-8">
              We've prepared a comprehensive presentation that outlines our vision, business model, and growth strategy.
              Click the button below to view our interactive Canva presentation.
            </p>
            
         {/* Add the copy of canva ppt here  */}
            <Link
              href="https://www.canva.com/design/DAGgXiSFhaw/iv1BVdytfjLnUUp60T27XA/edit?utm_content=DAGgXiSFhaw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Visit Our Presentation
            </Link>
          </div>
        </div>
      </section>

    
    </main>
    </div>
  )
}

