"use client";

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-slate-100">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
          Cookie Policy
        </h1>
        <p className="text-slate-400">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-slate-300 leading-relaxed">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            1. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files that are placed on your device when you
            visit a website. They contain a unique identifier that allows a
            website to remember information about you during your browsing
            session or across multiple visits. Cookies are widely used to make
            websites work more effectively and to provide analytics and user
            experience enhancements.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            2. How We Use Cookies
          </h2>
          <p className="mb-3">
            AcadXP uses cookies for the following purposes:
          </p>

          <div className="ml-4 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-violet-300 mb-2">
                Essential Cookies (Required):
              </h3>
              <p>
                These cookies are necessary for the proper functioning of our
                Service and are always enabled:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>
                  <strong>Authentication Cookies:</strong> Enable secure login
                  and session management via better-auth
                </li>
                <li>
                  <strong>Security Cookies:</strong> Prevent fraud and protect
                  against unauthorized access
                </li>
                <li>
                  <strong>Session Cookies:</strong> Maintain your logged-in
                  state as you navigate the platform
                </li>
                <li>
                  <strong>CSRF Protection:</strong> Prevent cross-site request
                  forgery attacks
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-violet-300 mb-2">
                Functional Cookies (Optional):
              </h3>
              <p>
                These cookies enhance your experience by remembering your
                preferences and choices:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Language and locale preferences</li>
                <li>Theme selection (dark mode, light mode)</li>
                <li>User interface preferences and layout choices</li>
                <li>Accessibility settings</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-violet-300 mb-2">
                Analytical Cookies (Optional):
              </h3>
              <p>
                These cookies help us understand how users interact with our
                platform to improve our Service:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Page visit counts and navigation patterns</li>
                <li>Feature usage statistics</li>
                <li>Performance metrics and load times</li>
                <li>User interaction patterns (anonymized)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            3. Types of Cookies We Use
          </h2>
          <p className="mb-3">
            We use both session cookies and persistent cookies:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Session Cookies:</strong> Temporary cookies that expire
              when you close your browser. These are used for authentication and
              security during your active session.
            </li>
            <li>
              <strong>Persistent Cookies:</strong> Cookies that remain on your
              device for a specified period (typically 1 month to 1 year). These
              are used to remember your preferences and improve your experience
              on future visits.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            4. First-Party vs Third-Party Cookies
          </h2>
          <p className="mb-3">
            <strong>First-Party Cookies:</strong> We set these cookies directly
            on our domain (acadxp.com). Most of our cookies are first-party and
            are necessary for service delivery.
          </p>
          <p>
            <strong>Third-Party Cookies:</strong> Some analytics and
            functionality services may set third-party cookies. We use
            industry-standard providers like Google Analytics for anonymous
            usage statistics. These services are subject to their own privacy
            policies.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            5. better-auth Authentication Cookies
          </h2>
          <p className="mb-3">
            AcadXP uses better-auth for secure authentication. better-auth uses
            the following cookie types:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Session Token:</strong> Encrypted authentication token
              that proves your identity
            </li>
            <li>
              <strong>Refresh Token:</strong> Used securely on the server to
              maintain your session
            </li>
            <li>
              <strong>CSRF Token:</strong> Protects against cross-site request
              forgery attacks
            </li>
            <li>
              <strong>Expires:</strong> Session cookies expire after 7 days of
              inactivity by default
            </li>
          </ul>
          <p className="mt-3">
            For more information about better-auth's security practices, visit{" "}
            <a
              href="https://better-auth.com"
              className="text-violet-400 hover:text-violet-300 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              better-auth.com
            </a>
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            6. Cookie Duration
          </h2>
          <p className="mb-3">
            Here's a summary of how long different cookies persist:
          </p>
          <div className="ml-4 space-y-2">
            <p>
              <strong>Authentication Cookies:</strong> 7 days (session-based)
            </p>
            <p>
              <strong>Preference Cookies:</strong> 1 year
            </p>
            <p>
              <strong>Analytics Cookies:</strong> 2 years
            </p>
            <p>
              <strong>Security/CSRF Cookies:</strong> Until browser close
              (session)
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            7. Managing and Disabling Cookies
          </h2>
          <p className="mb-3">
            You have the right to accept or decline cookies (except essential
            cookies which cannot be disabled):
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Browser Settings:</strong> Most browsers allow you to
              control cookies through their settings. You can set your browser
              to refuse cookies or alert you when cookies are being sent.
            </li>
            <li>
              <strong>Platform Preferences:</strong> Within AcadXP, you can
              manage your cookie preferences in your account settings under
              Privacy & Data.
            </li>
            <li>
              <strong>Cookie Consent Manager:</strong> Upon your first visit,
              you'll see a cookie consent banner allowing you to accept or
              decline non-essential cookies.
            </li>
          </ul>
          <p className="mt-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
            <strong>Note:</strong> Disabling cookies may affect your ability to
            use certain features of AcadXP. Essential authentication cookies
            cannot be disabled as they are required for the Service to function.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            8. Data Protection
          </h2>
          <p className="mb-3">We protect the data stored in cookies through:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>HTTPS encryption for all data transmission</li>
            <li>
              Secure HttpOnly flag for sensitive cookies (prevents JavaScript
              access)
            </li>
            <li>SameSite attribute to prevent cross-site attacks</li>
            <li>
              Secure flag to ensure cookies are only transmitted over HTTPS
            </li>
            <li>Regular security audits and penetration testing</li>
          </ul>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            9. Do Not Track
          </h2>
          <p>
            We honor the "Do Not Track" signal in your browser. If you have
            enabled this setting, we will not use analytical cookies. However,
            essential authentication cookies will still be used as they are
            required for the Service to function.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            10. Privacy Policy and GDPR
          </h2>
          <p>
            Our use of cookies is governed by our Privacy Policy. For European
            Union residents, our cookie practices comply with GDPR regulations.
            We obtain your explicit consent for non-essential cookies before
            they are stored on your device.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            11. Third-Party Links
          </h2>
          <p>
            AcadXP is not responsible for cookies set by third-party websites
            that you may visit via links on our platform. We encourage you to
            review the privacy and cookie policies of those websites.
          </p>
        </section>

        {/* Section 12 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            12. Updates to This Policy
          </h2>
          <p>
            We may update this Cookie Policy from time to time to reflect
            changes in our practices or applicable laws. We will notify you of
            significant changes by updating the "Last updated" date at the top
            of this page.
          </p>
        </section>

        {/* Section 13 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            13. Questions and Contact
          </h2>
          <p className="mb-3">
            If you have questions about our use of cookies or this Cookie
            Policy, please contact us:
          </p>
          <div className="ml-4 space-y-1">
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:acadxp86@gmail.com"
                className="text-violet-400 hover:text-violet-300 underline"
              >
                acadxp86@gmail.com
              </a>
            </p>
          </div>
        </section>

        {/* Cookie List */}
        <section className="mt-12 pt-8 border-t border-slate-700">
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            Appendix: Cookie Reference Table
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3 text-violet-300">
                    Cookie Name
                  </th>
                  <th className="text-left py-2 px-3 text-violet-300">Type</th>
                  <th className="text-left py-2 px-3 text-violet-300">
                    Duration
                  </th>
                  <th className="text-left py-2 px-3 text-violet-300">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">sessionToken</td>
                  <td className="py-2 px-3">Essential</td>
                  <td className="py-2 px-3">7 days</td>
                  <td className="py-2 px-3">Authentication (better-auth)</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">csrf</td>
                  <td className="py-2 px-3">Essential</td>
                  <td className="py-2 px-3">Session</td>
                  <td className="py-2 px-3">CSRF protection</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">theme</td>
                  <td className="py-2 px-3">Functional</td>
                  <td className="py-2 px-3">1 year</td>
                  <td className="py-2 px-3">User theme preference</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-2 px-3">language</td>
                  <td className="py-2 px-3">Functional</td>
                  <td className="py-2 px-3">1 year</td>
                  <td className="py-2 px-3">User language preference</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">_ga</td>
                  <td className="py-2 px-3">Analytical</td>
                  <td className="py-2 px-3">2 years</td>
                  <td className="py-2 px-3">Google Analytics tracking</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
