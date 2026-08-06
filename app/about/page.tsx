import { Container } from "@/components/layouts/Container"

export default function AboutPage() {
  return (
    <div className="py-16">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-heading font-bold text-primary-900 mb-6">About Us</h1>
        <div className="prose prose-lg text-gray-600">
          <p>Welcome to Sookalbayet, your premium destination for quality products.</p>
          <p>We believe in providing the best customer service and high-quality items at affordable prices. Our mission is to make shopping easy, fast, and secure.</p>
        </div>
      </Container>
    </div>
  )
}
