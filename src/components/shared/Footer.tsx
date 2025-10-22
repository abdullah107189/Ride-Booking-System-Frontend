// components/Footer.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CreditCard,
  Shield,
  HeadphonesIcon,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                <HeadphonesIcon className="size-5" />
              </div>
              <span className="text-xl font-bold text-foreground">
                RideShare
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for safe, reliable, and affordable
              transportation. Connecting riders with verified drivers across the
              country.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-border hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-border hover:bg-primary hover:text-primary-foreground"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-border hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-border hover:bg-primary hover:text-primary-foreground"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-border hover:bg-primary hover:text-primary-foreground"
              >
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/drivers"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Become a Driver
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/help"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/safety"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Safety Center
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/community"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="/partners"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates and offers.
            </p>

            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background border-border"
                />
                <Button size="icon" className="bg-primary hover:bg-primary/90">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our Privacy Policy
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+880 1XXX-XXXXXX</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@rideshare.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-accent" />
                <span>100% Safe & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-accent" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <HeadphonesIcon className="h-4 w-4 text-accent" />
                <span>24/7 Support</span>
              </div>
            </div>

            {/* App Download Links */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-border hover:bg-primary hover:text-primary-foreground"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
                    fill="currentColor"
                  />
                </svg>
                App Store
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-border hover:bg-primary hover:text-primary-foreground"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"
                    fill="currentColor"
                  />
                </svg>
                Google Play
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-background/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="text-muted-foreground">
              © {new Date().getFullYear()} RideShare. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
              <a
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="hover:text-primary transition-colors"
              >
                Cookie Policy
              </a>
              <a
                href="/sitemap"
                className="hover:text-primary transition-colors"
              >
                Sitemap
              </a>
            </div>

            <div className="text-muted-foreground">
              Made with ❤️ in Bangladesh
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
