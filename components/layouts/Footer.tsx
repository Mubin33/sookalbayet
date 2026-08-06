import Link from "next/link"
import { Container } from "./Container"
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { Logo } from "../ui/Logo"

export function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-100 print:hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Logo iconSize={20} />
            </Link>
            <p className="text-sm text-gray-500 mb-6">
              Your premium destination for quality products and excellent customer service.
            </p>
            <div className="flex items-center space-x-4 text-gray-400">
              <Link href="#" className="hover:text-primary-600 transition-colors"><Mail size={20} /></Link>
              <Link href="#" className="hover:text-primary-600 transition-colors"><Phone size={20} /></Link>
              <Link href="#" className="hover:text-primary-600 transition-colors"><MapPin size={20} /></Link>
              <Link href="#" className="hover:text-primary-600 transition-colors"><MessageCircle size={20} /></Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/products" className="hover:text-primary-600 transition-colors">All Products</Link></li>
              <li><Link href="/products?featured=true" className="hover:text-primary-600 transition-colors">Featured</Link></li>
              <li><Link href="/products?new=true" className="hover:text-primary-600 transition-colors">New Arrivals</Link></li>
              <li><Link href="/products" className="hover:text-primary-600 transition-colors">Discounts</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-primary-600 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary-600 transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-primary-600 transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-primary-600 transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/faq" className="hover:text-primary-600 transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-primary-600 transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/privacy" className="hover:text-primary-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sookalbayet. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
