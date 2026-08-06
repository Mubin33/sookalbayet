import { Container } from "@/components/layouts/Container"

export default function PrivacyPage() {
  return (
    <div className="py-16">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-heading font-bold text-primary-900 mb-6">Privacy Policy</h1>
        <div className="prose prose-lg text-gray-600">
          <p>Your privacy is important to us. It is Sookalbayet's policy to respect your privacy regarding any information we may collect from you across our website.</p>
        </div>
      </Container>
    </div>
  )
}
