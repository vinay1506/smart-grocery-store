
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutPage = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About GroceryStore</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We're on a mission to make grocery shopping easier, more convenient, and more affordable for everyone.
        </p>
      </div>

      {/* Hero Image */}
      <div className="relative rounded-lg overflow-hidden h-80 mb-12">
        <img
          src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=400&q=80"
          alt="Our Store"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white">Your one-stop shop for quality groceries</h2>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Our Story</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-4">
              GroceryStore was founded in 2021 with a simple idea: make fresh, quality groceries available to everyone, anytime, anywhere.
            </p>
            <p className="text-gray-700 mb-4">
              What started as a small operation has grown into a trusted online grocery store serving thousands of customers. Our team is passionate about sourcing the best products and delivering them with exceptional service.
            </p>
            <p className="text-gray-700">
              We work directly with local farmers and suppliers to ensure the freshest products reach your doorstep. By cutting out the middlemen, we're able to offer better prices while supporting local businesses.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden h-64">
            <img
              src="https://images.unsplash.com/photo-1595228702422-5a1b2f0e2511?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400&q=80"
              alt="Farm Fresh"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We're committed to providing only the highest quality products. Every item is carefully selected and quality-checked before dispatch.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Convenience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our user-friendly platform and fast delivery service are designed to make your grocery shopping experience as convenient as possible.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sustainability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We're dedicated to reducing our environmental impact through eco-friendly packaging, supporting sustainable farming practices, and minimizing food waste.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80"
                alt="Team Member"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold">Sarah Johnson</h3>
            <p className="text-sm text-gray-600">CEO & Founder</p>
          </div>

          {/* Team Member 2 */}
          <div className="text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80"
                alt="Team Member"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold">Michael Brown</h3>
            <p className="text-sm text-gray-600">Operations Manager</p>
          </div>

          {/* Team Member 3 */}
          <div className="text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80"
                alt="Team Member"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold">David Wilson</h3>
            <p className="text-sm text-gray-600">Lead Developer</p>
          </div>

          {/* Team Member 4 */}
          <div className="text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80"
                alt="Team Member"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold">Emily Lee</h3>
            <p className="text-sm text-gray-600">Customer Experience</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-grocery-primary/10 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Experience the Difference?</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust GroceryStore for their daily grocery needs.
        </p>
        <a
          href="/products"
          className="inline-block px-6 py-3 bg-grocery-primary text-white font-medium rounded-lg hover:bg-grocery-primary/90"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
