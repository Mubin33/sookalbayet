import { Container } from "@/components/layouts/Container"

export default function BlogPage() {
  return (
    <div className="py-16">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-heading font-bold text-primary-900 mb-6">Blog</h1>
        <div className="prose prose-lg text-gray-600">
          <p>Read the latest news, product updates, and articles from our team.</p>
          <p>Coming soon...</p>
        </div>
      </Container>
    </div>
  )
}
