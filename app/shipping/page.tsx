import { Container } from "@/components/layouts/Container"

export default function ShippingPage() {
  return (
    <div className="py-16">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-heading font-bold text-primary-900 mb-6">Shipping & Returns</h1>
        <div className="prose prose-lg text-gray-600">
          <h3>Shipping Policy</h3>
          <p>Enjoy free shipping on all orders over ৳5000. For orders under ৳5000, a flat rate of ৳100 applies.</p>
          <h3>Returns</h3>
          <p>You have 30 days to return an item from the date you received it.</p>
        </div>
      </Container>
    </div>
  )
}
