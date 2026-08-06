import { Container } from "@/components/layouts/Container"

export default function FAQPage() {
  return (
    <div className="py-16">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-heading font-bold text-primary-900 mb-6">Frequently Asked Questions</h1>
        <div className="prose prose-lg text-gray-600">
          <h3>How long does shipping take?</h3>
          <p>Orders are typically processed within 24 hours and standard shipping takes 3-5 business days.</p>
          <h3>Do you offer international shipping?</h3>
          <p>Currently, we only ship domestically.</p>
        </div>
      </Container>
    </div>
  )
}
