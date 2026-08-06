import { Container } from "@/components/layouts/Container"

export default function CareersPage() {
  return (
    <div className="py-16">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-heading font-bold text-primary-900 mb-6">Careers</h1>
        <div className="prose prose-lg text-gray-600">
          <p>Join our team at Sookalbayet and help us build the future of e-commerce.</p>
          <p>We are currently looking for passionate engineers, designers, and marketers. Send your resume to careers@sookalbayet.com.</p>
        </div>
      </Container>
    </div>
  )
}
