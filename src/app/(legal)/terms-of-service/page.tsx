"use client";

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-slate-100">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
          Terms of Service
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
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using AcadXP ("Service"), you accept and agree to
            be bound by the terms and provision of this agreement. If you do not
            agree to abide by the above, please do not use this service. AcadXP
            reserves the right to make changes to these Terms of Service at any
            time and without notice.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            2. Use License
          </h2>
          <p className="mb-3">
            Permission is granted to temporarily download one copy of the
            materials (information or software) on AcadXP for personal,
            non-commercial transitory viewing only. This is the grant of a
            license, not a transfer of title, and under this license you may
            not:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Modify or copy the materials</li>
            <li>
              Use the materials for any commercial purpose or for any public
              display
            </li>
            <li>
              Attempt to decompile or reverse engineer any software contained on
              the Service
            </li>
            <li>
              Remove any copyright or other proprietary notations from the
              materials
            </li>
            <li>
              Transferring the materials to another person or "mirror" the
              materials on any other server
            </li>
            <li>
              Use automated tools to access or download content from AcadXP
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            3. User Accounts and Responsibilities
          </h2>
          <p className="mb-3">
            To access certain features of AcadXP, you may be required to create
            an account. You are responsible for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              Providing accurate, current, and complete information during
              registration
            </li>
            <li>
              Maintaining the confidentiality of your password and account
              information
            </li>
            <li>
              Accepting responsibility for all activities that occur under your
              account
            </li>
            <li>
              Notifying us immediately of any unauthorized use of your account
            </li>
            <li>
              Complying with all applicable laws and regulations while using the
              Service
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            4. Academic Integrity
          </h2>
          <p className="mb-3">
            AcadXP is designed to support academic learning and skill
            development. You agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              Use the platform in accordance with your institution's academic
              integrity policies
            </li>
            <li>Not plagiarize, cheat, or misrepresent work as your own</li>
            <li>Not assist others in violating academic integrity standards</li>
            <li>
              Respect the intellectual property of course materials and
              challenges
            </li>
            <li>
              Report any suspected academic misconduct to your institution
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            5. Intellectual Property Rights
          </h2>
          <p className="mb-3">
            <strong>Service Content:</strong> All course materials, challenges,
            badges, and other content provided on AcadXP are owned or licensed
            by AcadXP. You may view and use these materials solely for
            educational purposes on AcadXP.
          </p>
          <p>
            <strong>User Content:</strong> You retain ownership of any content
            you submit to AcadXP (such as solutions, comments, or forum posts).
            By submitting content, you grant AcadXP a non-exclusive,
            royalty-free license to use, display, and distribute your content
            for educational and service improvement purposes.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            6. Content Restrictions
          </h2>
          <p className="mb-3">
            You may not upload, post, or transmit content that:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Is illegal, threatening, abusive, or obscene</li>
            <li>Infringes on intellectual property or privacy rights</li>
            <li>Constitutes unsolicited promotional material or spam</li>
            <li>Contains malware, viruses, or harmful code</li>
            <li>Impersonates another person or entity</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            7. Disclaimer of Warranties
          </h2>
          <p>
            The materials on AcadXP are provided on an 'as is' basis. AcadXP
            makes no warranties, expressed or implied, and hereby disclaims and
            negates all other warranties including, without limitation, implied
            warranties or conditions of merchantability, fitness for a
            particular purpose, or non-infringement of intellectual property or
            other violation of rights.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            8. Limitations of Liability
          </h2>
          <p>
            In no event shall AcadXP or its suppliers be liable for any damages
            (including, without limitation, damages for loss of data or profit,
            or due to business interruption) arising out of the use or inability
            to use the materials on AcadXP, even if AcadXP or an authorized
            representative has been notified orally or in writing of the
            possibility of such damage.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            9. Accuracy of Materials
          </h2>
          <p>
            The materials appearing on AcadXP could include technical,
            typographical, or photographic errors. AcadXP does not warrant that
            any of the materials on the Service are accurate, complete, or
            current. AcadXP may make changes to the materials contained on the
            Service at any time without notice.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">10. Links</h2>
          <p>
            AcadXP has not reviewed all of the sites linked to its website and
            is not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by AcadXP of the
            site. Use of any such linked website is at the user's own risk.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            11. Modifications
          </h2>
          <p>
            AcadXP may revise these terms of service for the website at any time
            without notice. By using this website, you are agreeing to be bound
            by the then current version of these terms of service.
          </p>
        </section>

        {/* Section 12 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            12. Termination of Use
          </h2>
          <p className="mb-3">
            AcadXP may terminate or suspend your account and access to the
            Service at any time, for any reason, including if:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>You violate these Terms of Service</li>
            <li>You violate applicable laws or regulations</li>
            <li>You engage in harassment, fraud, or other harmful behavior</li>
            <li>
              AcadXP determines at its sole discretion that you pose a risk to
              the Service or other users
            </li>
          </ul>
        </section>

        {/* Section 13 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            13. Governing Law
          </h2>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws of the jurisdiction in which AcadXP
            operates, and you irrevocably submit to the exclusive jurisdiction
            of the courts in that location.
          </p>
        </section>

        {/* Section 14 */}
        <section>
          <h2 className="text-2xl font-bold text-violet-400 mb-4">
            14. Contact Information
          </h2>
          <p>
            If you have any questions about these Terms of Service, please
            contact us at{" "}
            <a
              href="mailto:acadxp86@gmail.com"
              className="text-violet-400 hover:text-violet-300 underline"
            >
              acadxp86@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
