
import { Card, CardContent } from '@/components/ui/card';

const TermsPage = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Please read these terms and conditions carefully before using our services.
        </p>
      </div>

      <Card className="mb-12">
        <CardContent className="p-8">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to GroceryStore. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our website or use our services.
              </p>
              <p className="text-gray-700">
                GroceryStore is an online platform that allows users to browse, order, and purchase groceries for delivery. By placing an order through our platform, you enter into a contract for the purchase of the products you have selected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                When you create an account with us, you must provide accurate, complete, and up-to-date information. You are responsible for safeguarding the password that you use to access our service and for any activities or actions under your password.
              </p>
              <p className="text-gray-700 mb-4">
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
              <p className="text-gray-700">
                We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Orders and Payments</h2>
              <p className="text-gray-700 mb-4">
                When placing an order, you agree to provide complete and accurate information. All prices are displayed in USD and are inclusive of applicable taxes unless otherwise stated.
              </p>
              <p className="text-gray-700 mb-4">
                We accept various payment methods as indicated on our website. Payment must be received in full before your order is processed. We reserve the right to refuse or cancel your order if fraud or an unauthorized transaction is suspected.
              </p>
              <p className="text-gray-700">
                The availability of products is subject to change without notice. We reserve the right to limit the quantities of products purchased and to discontinue products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Delivery</h2>
              <p className="text-gray-700 mb-4">
                We offer delivery services within specified areas. Delivery times are estimates and not guaranteed. We are not responsible for delays in delivery due to unforeseen circumstances.
              </p>
              <p className="text-gray-700 mb-4">
                You agree to provide accurate delivery information and ensure that someone is available to receive the delivery at the scheduled time. If no one is available to receive the delivery, we may leave the order at the delivery address at our discretion, or return it to our facility.
              </p>
              <p className="text-gray-700">
                Additional delivery fees may apply based on your location and the size of your order.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Returns and Refunds</h2>
              <p className="text-gray-700 mb-4">
                We strive to provide high-quality products. If you are not satisfied with a product, you may return it within 3 days of delivery for a full refund or replacement. Certain items, such as perishable goods, may not be eligible for return.
              </p>
              <p className="text-gray-700 mb-4">
                To initiate a return, please contact our customer service team. Returned items must be in their original condition and packaging. Refunds will be processed using the original payment method.
              </p>
              <p className="text-gray-700">
                We reserve the right to refuse returns if the products have been opened, used, or damaged by the customer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our services, you agree to the collection and use of information in accordance with our Privacy Policy.
              </p>
              <p className="text-gray-700">
                We use cookies to improve your browsing experience. By continuing to use our website, you consent to our use of cookies in accordance with our Cookie Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content, trademarks, logos, and intellectual property displayed on our website are owned by or licensed to GroceryStore and protected by copyright and intellectual property laws.
              </p>
              <p className="text-gray-700">
                You may not use, reproduce, distribute, or create derivative works from our content without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                GroceryStore and its affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-8 mb-4 text-gray-700">
                <li className="mb-2">Your use or inability to use our services</li>
                <li className="mb-2">Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                <li className="mb-2">Any interruption or cessation of transmission to or from our services</li>
                <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our services by any third party</li>
              </ul>
              <p className="text-gray-700">
                In no event shall our total liability to you for all claims exceed the amount you paid for products purchased through our services during the past six months.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law principles.
              </p>
              <p className="text-gray-700">
                Any disputes arising under or in connection with these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts located within the State of New York.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services following the posting of revised Terms and Conditions constitutes your acceptance of the changes.
              </p>
              <p className="text-gray-700">
                It is your responsibility to review these Terms and Conditions periodically to stay informed of updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="mt-4">
                <p className="text-gray-700">Email: legal@grocery.com</p>
                <p className="text-gray-700">Phone: +1 (123) 456-7890</p>
                <p className="text-gray-700">Address: 123 Grocery St., New York, NY 10001</p>
              </div>
            </section>

            <div className="text-gray-700 mt-8 pt-8 border-t">
              <p>Last updated: May 3, 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsPage;
