import { Container } from "@/components/layouts/Container"

export default function TermsPage() {
  return (
    <div className="py-16">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-heading font-bold text-primary-900 mb-6">Terms of Service</h1>
        <div className="prose prose-lg text-gray-600">
          <p>By accessing the website at Sookalbayet, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
        </div>
      </Container>
    </div>
  )
}
