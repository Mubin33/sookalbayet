import { Container } from "@/components/layouts/Container"

export default function ContactPage() {
  return (
    <div className="py-16">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-heading font-bold text-primary-900 mb-6">Contact Us</h1>
        <div className="prose prose-lg text-gray-600">
          <p>Have a question or need help with an order? We're here for you.</p>
          <p>Email us at: support@sookalbayet.com<br/>Phone: +1 (555) 123-4567</p>
        </div>
      </Container>
    </div>
  )
}
