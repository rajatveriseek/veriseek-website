import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rules & Regulations | Veriseek Education",
  description:
    "Official rules and regulations for Veriseek Education's inter-school competitions.",
};

export default function RulesPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-primary mb-8">
        Rules & Regulations (Terms and Conditions)
      </h1>
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold mb-6">
          Part A - General Terms and Conditions
        </h2>

        <h3 className="text-xl font-semibold mt-8 mb-4">
          1. Acceptance of Terms
        </h3>
        <p className="mb-4">
          By accessing and using this website (the "Site"), you agree to be
          bound by these Terms and Conditions ("Terms") and our Privacy Policy.
          If you do not agree with any part of the Terms, you must not use the
          Site.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">2. Use of the Site</h3>
        <p className="mb-4">
          You agree to use the Site only for lawful purposes and in a way that
          does not infringe the rights of others, or restrict or inhibit anyone
          else's use of the Site.
        </p>
        <p className="mb-4">You must not:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>
            Use the Site in any way that causes, or may cause, damage to the
            Site or impairment of its availability.
          </li>
          <li>
            Copy, duplicate, or reuse any content without express written
            permission.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">
          3. Intellectual Property
        </h3>
        <p className="mb-4">
          All content, trademarks, logos, and data on this Site are the
          intellectual property of the website owner or licensed to the owner,
          and are protected by copyright and trademark laws. You may not
          reproduce or redistribute any material without written consent.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">
          4. Third-Party Links
        </h3>
        <p className="mb-4">
          The Site may contain links to third-party websites. We are not
          responsible for the content or privacy practices of such websites.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">
          5. Disclaimer of Warranties
        </h3>
        <p className="mb-4">
          This Site is provided "as is." We make no warranties, expressed or
          implied, and hereby disclaim all warranties including, without
          limitation, implied warranties of merchantability and fitness for a
          particular purpose.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">
          6. Limitation of Liability
        </h3>
        <p className="mb-4">
          In no event shall the Site or its owners be liable for any indirect,
          special, incidental, or consequential damages arising out of the use
          or inability to use the Site or the content on it.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">7. Changes to Terms</h3>
        <p className="mb-4">
          We reserve the right to modify these Terms at any time. Changes will
          be effective immediately upon posting on the Site. Your continued use
          of the Site signifies your acceptance of any updated Terms.
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">8. Governing Law</h3>
        <p className="mb-4">
          These Terms shall be governed by and construed in accordance with the
          laws of India.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-6">
          Part B - Inter-School Competition Rules & Regulations
        </h2>
        <p className="mb-4 text-gray-600">
          Format: Hybrid (Online & Offline)
          <br />
          Participants: Students representing registered schools
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4">1. Eligibility</h3>
        <ul className="list-disc pl-6 mb-6">
          <li>Open to students across India and overseas</li>
          <li>Class categories must be adhered to (Class 9 to Class 12)</li>
          <li>There could be multiple participants per school</li>
          <li>
            Participants must have consent from their guardians and school
            authorities
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">2. Registration</h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            Registration can be done online on the website, or through the
            school
          </li>
          <li>
            Every participant shall have to present a school ID card or a letter
            from the school at the time of the competition as proof of identity
          </li>
          <li>
            The Registration fee must be paid on the website or through the
            school in the designated manner at the time of registration
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">
          3. Competition Format
        </h3>
        <p className="mb-4">The event will be conducted in two phases:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Online: Conducted via various online test taking platforms</li>
          <li>
            Offline Finals: Held in NCR / Gurugram, though online participations
            are also allowed
          </li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Online Phase</h4>
        <ul className="list-disc pl-6 mb-6">
          <li>
            All participants must have a stable internet connection, a working
            webcam, and microphone.
          </li>
          <li>
            Identity verification will be done before the competition starts.
          </li>
          <li>
            Any technical issues on the participant's side are their own
            responsibility.
          </li>
        </ul>

        <h4 className="text-lg font-semibold mt-6 mb-3">Offline Phase</h4>
        <ul className="list-disc pl-6 mb-6">
          <li>
            Only shortlisted finalists from the online phase will be invited.
          </li>
          <li>
            Travel and accommodation arrangements are the responsibility of the
            school or parents.
          </li>
          <li>
            ID proof and school verification letter are mandatory for onsite
            entry.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">4. Code of Conduct</h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            Any form of malpractice or dishonesty will result in
            disqualification.
          </li>
          <li>
            Participants must behave respectfully with judges, organizers, and
            other contestants.
          </li>
          <li>
            Offensive language, gestures, or disruptive behaviour will not be
            tolerated.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">
          5. Judging & Scoring
        </h3>
        <ul className="list-disc pl-6 mb-6">
          <li>Judging criteria will be communicated before each event.</li>
          <li>The decision of the judges is final and binding.</li>
          <li>
            Scores will not be disclosed beyond winners, unless otherwise
            stated.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">6. Awards & Prizes</h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            While prizes will be awarded in each category, Special recognitions
            may be awarded for creativity, sportsmanship, or innovation.
          </li>
          <li>
            Certificates of Participation will be given to all verified
            participants.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">7. Media & Consent</h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            The event will be recorded for promotional and archival purposes.
          </li>
          <li>
            By participating, students and schools agree to allow the use of
            their names, photos, and videos for marketing and reporting.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">
          8. Health & Safety (For Offline Events)
        </h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            All participants must adhere to health and safety guidelines issued
            by local authorities.
          </li>
          <li>
            In case of an emergency, parents or guardians will be contacted
            immediately.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">
          9. Changes & Cancellations
        </h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            The organizers reserve the right to modify the event structure or
            cancel specific categories based on registration numbers or
            unforeseen circumstances.
          </li>
          <li>
            In case of event cancellation, a partial or full refund may be
            issued as per the refund policy.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4">
          10. No Legal Liability
        </h3>
        <ul className="list-disc pl-6 mb-6">
          <li>
            The organizers, sponsors, partners, and associated personnel shall
            not be held legally responsible for any loss, injury, damage, or
            mishap (including but not limited to physical, technical, or
            emotional issues) arising during or as a result of participation in
            the competition.
          </li>
          <li>
            Participants and their guardians acknowledge and accept that
            participation is voluntary and at their own risk.
          </li>
        </ul>
      </div>
    </div>
  );
}
