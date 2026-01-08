import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-blue-600 text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          {/* LEFT COLUMN */}
          <div className="space-y-10">
            <p className="text-sm">© 2025 Your Brand. All rights reserved.</p>

            <div className="space-y-2">
              <p className="text-sm font-medium">
                Sign Up For The Latest Work.
              </p>
              <p className="text-sm font-medium">New & Insights</p>
            </div>

            <ul className="space-y-1 text-sm">
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>LinkedIn</li>
            </ul>
          </div>

          {/* CENTER COLUMN */}
          <div className="flex flex-col justify-end text-sm">
            <p>© 2025 Your Brand. All</p>
            <p>rights reserved.</p>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-10">
            {/* EMAIL INPUT */}
            <div className="flex items-center justify-between border-b border-white/40 pb-2">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent text-sm placeholder-white/70 outline-none"
              />
              <span className="ml-4 text-lg">→</span>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex gap-6 text-xl">
              <Link
                href="#"
                aria-label="Instagram"
                className="transition-opacity hover:opacity-80"
              >
                <FaInstagram />
              </Link>

              <Link
                href="#"
                aria-label="Facebook"
                className="transition-opacity hover:opacity-80"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="transition-opacity hover:opacity-80"
              >
                <FaLinkedinIn />
              </Link>

              <Link
                href="#"
                aria-label="Twitter"
                className="transition-opacity hover:opacity-80"
              >
                <FaTwitter />
              </Link>
            </div>

            {/* LEGAL LINKS */}
            <div className="space-y-1 text-sm">
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
              <p>Cookies Policy</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
    