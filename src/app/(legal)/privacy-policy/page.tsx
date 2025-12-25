"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-slate-100">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
          Privacy Policy
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
            1. Introduction
          </h2>
          <p>
            AcadXP ("we", "us", "our", or "Company") operates the AcadXP website
            and mobile application. This page informs you of our policies
            regarding the collection, use, and disclosure of personal data when
            you use our Service and the choices you have associated with that
            data.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            2. Information We Collect
          </h2>
          <p className="mb-3">
            We collect several different types of information for various
            purposes to provide and improve our Service:
          </p>

          <div className="ml-4 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-violet-300 mb-2">
                Personal Data:
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number (optional)</li>
                <li>Academic institution and program</li>
                <li>Profile information and preferences</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-violet-300 mb-2">
                Learning Analytics:
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Courses and challenges completed</li>
                <li>Challenge solutions and submissions</li>
                <li>Time spent on learning activities</li>
                <li>Scores, badges, and achievement data</li>
                <li>Progress and performance metrics</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-violet-300 mb-2">
                Usage Data:
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Pages visited and features used</li>
                <li>Date and time of activities</li>
                <li>Device information (OS, browser type)</li>
                <li>IP address and general location</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-violet-300 mb-2">
                Authentication Data (via better-auth):
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Secure authentication tokens and session data</li>
                <li>OAuth provider identifiers (if using social login)</li>
                <li>Password hashes (never plain text)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            3. Use of Data
          </h2>
          <p className="mb-3">
            AcadXP uses the collected data for various purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>
              To allow you to participate in interactive features of our Service
            </li>
            <li>To provide customer support and respond to your inquiries</li>
            <li>
              To gather analysis or valuable information so that we can improve
              our Service
            </li>
            <li>To monitor the usage of our Service and track performance</li>
            <li>To detect, prevent, and address fraud and security issues</li>
            <li>To provide personalized learning recommendations</li>
            <li>To generate anonymized educational research and insights</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            4. Security of Data
          </h2>
          <p className="mb-3">
            The security of your data is important to us but remember that no
            method of transmission over the Internet or method of electronic
            storage is 100% secure. While we strive to use commercially
            acceptable means to protect your personal data, we cannot guarantee
            its absolute security.
          </p>
          <p className="mb-3">We implement the following security measures:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>HTTPS encryption for data in transit</li>
            <li>Secure password hashing with industry-standard algorithms</li>
            <li>Regular security audits and penetration testing</li>
            <li>Secure session management via better-auth</li>
            <li>
              Limited access to personal data by authorized personnel only
            </li>
            <li>Secure database storage with encryption at rest</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            5. Data Retention
          </h2>
          <p>
            AcadXP will retain your personal data for as long as necessary to
            provide our Services and fulfill the purposes outlined in this
            Privacy Policy. For learning analytics data, we retain it for the
            duration of your educational program plus 12 months for
            record-keeping purposes. You may request deletion of your account
            and associated data at any time by contacting us.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            6. Your Privacy Rights
          </h2>
          <p className="mb-3">
            Depending on your location, you may have the following rights:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Right to Access:</strong> You can request a copy of the
              personal data we hold about you
            </li>
            <li>
              <strong>Right to Rectification:</strong> You can request
              correction of inaccurate data
            </li>
            <li>
              <strong>Right to Erasure:</strong> You can request deletion of
              your data (subject to legal requirements)
            </li>
            <li>
              <strong>Right to Restrict Processing:</strong> You can request
              that we limit how we use your data
            </li>
            <li>
              <strong>Right to Portability:</strong> You can request your data
              in a portable format
            </li>
            <li>
              <strong>Right to Object:</strong> You can object to certain uses
              of your data
            </li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, please contact us at{" "}
            <a
              href="mailto:acadxp86@gmail.com"
              className="text-violet-400 hover:text-violet-300 underline"
            >
              acadxp86@gmail.com
            </a>
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            7. GDPR Compliance
          </h2>
          <p className="mb-3">
            For users in the European Union, we comply with the General Data
            Protection Regulation (GDPR):
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              We process data based on your explicit consent or legitimate
              interests
            </li>
            <li>We have a Data Processing Agreement in place if required</li>
            <li>We report data breaches within 72 hours as required by law</li>
            <li>We ensure data protection by design and default</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            8. Third-Party Services
          </h2>
          <p className="mb-3">
            Our Service may contain links to third-party websites and services
            that are not operated by AcadXP. This Privacy Policy does not apply
            to third-party services, and we are not responsible for their
            privacy practices. We encourage you to review the privacy policies
            of any third-party service before providing your information.
          </p>
          <p className="mb-3">
            <strong>Authentication Provider (better-auth):</strong> We use
            better-auth for secure authentication. Your authentication data is
            processed according to better-auth's privacy practices. For details,
            see{" "}
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

        {/* Section 9 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            9. Children's Privacy
          </h2>
          <p>
            Our Service is not intended for children under the age of 13. We do
            not knowingly collect personal information from children under 13.
            If we discover that we have collected personal information from a
            child under 13, we will delete such information immediately. If you
            are the parent or guardian of a child whose information we have
            collected, please contact us immediately.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            10. Changes to This Privacy Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date at the top of this page.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            11. Contact Us
          </h2>
          <p className="mb-3">
            If you have any questions about this Privacy Policy or our privacy
            practices, please contact us at:
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
      </div>
    </div>
  );
}
