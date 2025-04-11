
import React from "react"

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-primary mb-8">Privacy Policy</h1>
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mt-6 mb-4">Information Collection and Use</h2>
        <p className="mb-4">
          We collect information to provide better services to our users. The types of information we collect include:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Information you provide to us when registering for our programs</li>
          <li>Information about how you use our services</li>
          <li>Device information and log data</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Provide and maintain our services</li>
          <li>Notify you about changes to our services</li>
          <li>Provide customer support</li>
          <li>Monitor the usage of our services</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Data Security</h2>
        <p className="mb-4">
          We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at team@veriseekeducation.com
        </p>
      </div>
    </div>
  )
}
