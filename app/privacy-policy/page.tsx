import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const lastUpdated = "24 March 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500">
      <Navbar />

      <section className="pt-32 pb-14 bg-slate-900">
        <div className="container mx-auto px-6">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-6">
            Privacy Notice
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/75 max-w-3xl">
            This notice explains how Netra-Anveshan AI Research Institute collects, uses, stores, and protects personal information when you use this website.
          </p>
          <p className="text-white/60 mt-3 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-10 text-gray-700 dark:text-gray-300">
            <div className="card-premium p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Summary of Key Points</h2>
              <ul className="space-y-2 list-disc pl-6">
                <li>We collect information you provide directly (for example, contact form details and portal login email).</li>
                <li>We also collect limited technical information automatically (for example, IP address, browser type, and page usage logs).</li>
                <li>We use data to operate, secure, and improve the website, and to respond to inquiries.</li>
                <li>We do not sell personal information.</li>
                <li>We do not provide social login and we do not process payment card information on this website.</li>
                <li>You can request access, correction, or deletion of your personal information by contacting us.</li>
              </ul>
            </div>

            <div className="card-premium p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. What Information We Collect</h2>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Information you provide</h3>
              <ul className="space-y-2 list-disc pl-6 mb-4">
                <li>Contact form fields: name, email, organization, subject, and message.</li>
                <li>Portal authentication data: email address and password used for staff sign-in.</li>
                <li>Any information you choose to send us by email or through other direct communications.</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Information collected automatically</h3>
              <ul className="space-y-2 list-disc pl-6">
                <li>Log data such as IP address, request timestamps, browser/device type, and pages visited.</li>
                <li>Basic usage and diagnostic data used for security monitoring and performance troubleshooting.</li>
              </ul>
            </div>

            <div className="card-premium p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Information</h2>
              <ul className="space-y-2 list-disc pl-6">
                <li>To provide and maintain website features.</li>
                <li>To authenticate staff users for portal access.</li>
                <li>To respond to inquiries, collaborations, and support requests.</li>
                <li>To improve website reliability, security, and user experience.</li>
                <li>To comply with legal obligations and protect our rights.</li>
              </ul>
            </div>

            <div className="card-premium p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Legal Bases (where applicable)</h2>
              <p>
                Depending on your location, we process personal information under one or more legal bases: consent, legitimate interests (such as security and service improvement), contractual necessity (for portal access), and legal compliance.
              </p>
            </div>

            <div className="card-premium p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Sharing of Information</h2>
              <p className="mb-3">We may share data only when needed with trusted service providers that help us operate this website, such as:</p>
              <ul className="space-y-2 list-disc pl-6">
                <li>Authentication/database infrastructure providers (for example, Supabase).</li>
                <li>Hosting and infrastructure providers.</li>
                <li>Security, logging, and maintenance tools.</li>
              </ul>
              <p className="mt-3">We require such providers to process information only for authorized purposes and with appropriate safeguards.</p>
            </div>

            <div className="card-premium p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Cookies and Tracking</h2>
              <p>
                This website may use essential cookies or similar technologies required for core functionality and session management. We do not use this website for targeted advertising-based profiling.
              </p>
            </div>

            <div className="card-premium p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Data Retention</h2>
              <p>
                We keep personal information only for as long as needed for the purposes listed in this notice, including security, legal, and operational requirements. Data is deleted or anonymized when no longer required.
              </p>
            </div>

            <div className="card-premium p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Security</h2>
              <p>
                We use reasonable technical and organizational controls to protect personal information. However, no internet transmission or storage method is fully secure.
              </p>
            </div>

            <div className="card-premium p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Children’s Privacy</h2>
              <p>
                This website is not intended for children under 18, and we do not knowingly collect personal information from minors.
              </p>
            </div>

            <div className="card-premium p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Your Privacy Rights</h2>
              <p className="mb-3">
                Subject to applicable law, you may have rights to access, correct, delete, or restrict processing of your personal information, and to object to certain processing.
              </p>
              <p>
                To exercise rights, submit a request through our contact page at <a className="text-amber-700 dark:text-amber-400 underline" href="/contact">/contact</a> or email <a className="text-amber-700 dark:text-amber-400 underline" href="mailto:info@netra-anveshan.org.in">info@netra-anveshan.org.in</a>.
              </p>
            </div>

            <div className="card-premium p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Third-Party Links</h2>
              <p>
                Our pages may contain links to third-party sites. We are not responsible for their privacy practices. Please review their policies before sharing personal information.
              </p>
            </div>

            <div className="card-premium p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. International Transfers</h2>
              <p>
                Depending on infrastructure locations, your information may be processed in countries outside your own. Where required, we apply appropriate safeguards for cross-border processing.
              </p>
            </div>

            <div className="card-premium p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any updates will be posted on this page with a revised date.
              </p>
            </div>

            <div className="card-premium p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">13. Contact Us</h2>
              <div className="space-y-1">
                <p><span className="font-semibold text-gray-900 dark:text-white">Organization:</span> Netra-Anveshan AI Research Institute</p>
                <p><span className="font-semibold text-gray-900 dark:text-white">Website:</span> https://netra-anveshan.org.in</p>
                <p><span className="font-semibold text-gray-900 dark:text-white">Email:</span> info@netra-anveshan.org.in</p>
                <p><span className="font-semibold text-gray-900 dark:text-white">Address:</span> 1200 Vigyan Marg, Technik Nagar, India 110001</p>
                <p><span className="font-semibold text-gray-900 dark:text-white">Phone:</span> (555) 123-4000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
