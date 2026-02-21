// app/refund-policy/page.tsx
import React from "react";

const RefundPolicyPage = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold mb-6 text-blue-700">The Deal Room Refund Policy</h1>
      <p className="mb-6 text-gray-700">
        This Refund Policy applies to registrations for the programme organised by Veriseek Education and its partners. By registering and making payment, you agree to the terms below.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">1. Scope</h2>
        <p className="text-gray-700">
          This policy applies to all participants who register and pay the programme fee for the VC Fellowship programme.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">2. Refund Eligibility</h2>
        <p className="text-gray-700 mb-4">
          A participant is eligible for a full refund only if the cancellation request is received at least 7 calendar days before the programme start date.
        </p>
        <p className="text-gray-700 mb-4">
          No refunds will be issued if the cancellation request is received within seven calendar days of the programme start date, including non-attendance.
        </p>
        <p className="text-gray-700">
          For clarity, if the programme starts on 15 March 2026, the last date to request a full refund is 8 March 2026.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">3. How to Request a Refund</h2>
        <p className="text-gray-700 mb-4">
          To request a cancellation and refund, the participant must submit a written request by email from the registered email address used for registration. The request must include:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
          <li>Participant full name</li>
          <li>Registered mobile number</li>
          <li>Payment reference or transaction identifier</li>
          <li>Programme name and dates</li>
        </ul>
        <p className="text-gray-700">
          The request will be treated as received only when acknowledged by the programme team in writing.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">4. Refund Processing</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Approved refunds will be processed to the original payment method.</li>
          <li>Processing timelines depend on the payment gateway and banks.</li>
          <li>Any payment gateway or transaction charges, if applicable, will be deducted from the refund amount.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">5. Transfers and Substitutions</h2>
        <p className="text-gray-700 mb-4">If a participant cannot attend after the refund window:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>A one-time transfer to another student may be permitted, subject to seat availability and verification.</li>
          <li>Transfer requests must be submitted before the programme start date.</li>
          <li>Transfers are not permitted once the programme has started.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">6. Programme Cancellation or Rescheduling by the Organiser</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>If the organiser cancels the programme, participants will receive a full refund.</li>
          <li>If the programme is rescheduled, participants may either attend on the revised dates or request a refund. Refund requests must be submitted within seven calendar days of the reschedule announcement.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">7. Travel and Personal Expenses</h2>
        <p className="text-gray-700">
          Refunds do not cover travel, accommodation, or any personal expenses incurred by participants.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">8. Policy Updates</h2>
        <p className="text-gray-700">
          The organiser may update this policy for operational or legal reasons. The version applicable to a participant is the one available on the website at the time of registration.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">9. Contact</h2>
        <p className="text-gray-700">
          For cancellation and refund requests, please contact the programme team using the email address provided on the registration page and in the confirmation email.
        </p>
      </section>
    </main>
  );
};

export default RefundPolicyPage;