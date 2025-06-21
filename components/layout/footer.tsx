import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

// Import the image utility
import { getImageUrl } from "@/lib/image-utils"

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              {/* Replace the logo image */}
              <Image
                src={getImageUrl("logo") || "/placeholder.svg"}
                alt="Veriseek Education Logo"
                width={180}
                height={72}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-300">
              Veriseek Education bridges the gap between traditional academic learning and real-world professional
              skills through innovative programs and competitions.
            </p>
            {/* Social links hidden as requested */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-secondary text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-secondary text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/sharkathon" className="text-gray-300 hover:text-secondary text-sm">
                  Sharkathon
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-secondary text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-secondary text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-gray-300 hover:text-secondary text-sm">
                  Rules & Regulations (Terms and Conditions)
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-gray-300 hover:text-secondary text-sm">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-secondary" />
                <span className="text-sm text-gray-300">
                  alt.f MPD Tower, 2nd Floor
                  <br />
                  Golf Course Road, Sector 43
                  <br />
                  Gurugram, Haryana 122002
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-secondary" />
                <Link href="tel:+919953371191" className="text-sm text-gray-300 hover:text-secondary">
                  +91 9953371191
                </Link>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-secondary" />
                <Link href="mailto:team@veriseekeducation.com" className="text-sm text-gray-300 hover:text-secondary">
                  team@veriseekeducation.com
                </Link>
              </li>
              <li className="flex items-center">
                <Image
                  src={"/instagram-logo.png"}
                  alt="Instagram"
                  width={18}
                  height={18}
                  className="mr-2"
                />
                <Link href="https://www.instagram.com/veriseek_edu?igsh=MXRnbGx6c2k1cjluaQ==" className="text-sm text-gray-300 hover:text-secondary">
                  Instagram- veriseek_edu
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Veriseek Education Work Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer