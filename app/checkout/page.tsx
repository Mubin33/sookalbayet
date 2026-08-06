"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { CheckCircle2, ChevronRight, Truck, CreditCard, ShoppingBag, ArrowRight } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { Container } from "@/components/layouts/Container"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import toast from "react-hot-toast"

type CheckoutFormData = {
  shippingAddress: {
    line1: string
    city: string
    state: string
    pincode: string
    country: string
  }
  shippingMethod: "STANDARD" | "EXPRESS"
  paymentMethod: "COD"
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const [mounted, setMounted] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState(1)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const { control, handleSubmit, formState: { errors }, watch } = useForm<CheckoutFormData>({
    defaultValues: {
      shippingAddress: {
        line1: "",
        city: "",
        state: "",
        pincode: "",
        country: "USA",
      },
      shippingMethod: "STANDARD",
      paymentMethod: "COD",
    }
  })

  const formValues = watch()

  React.useEffect(() => {
    setMounted(true)
    if (items.length === 0 && mounted) {
      router.replace("/cart")
    }
  }, [items.length, mounted, router])

  if (!mounted || items.length === 0) {
    return <div className="min-h-screen bg-gray-50" />
  }

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const shippingCost = formValues.shippingMethod === "EXPRESS" ? 250 : (subtotal > 5000 ? 0 : 100)
  const total = subtotal + shippingCost

  const onSubmit = async (data: CheckoutFormData) => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      return
    }

    // Final Step - Place Order
    setIsSubmitting(true)
    try {
      const orderPayload = {
        userId: "guest",
        items: items.map(i => ({
          productId: i.product.id,
          quantity: i.quantity,
          price: i.product.price,
        })),
        shippingAddress: data.shippingAddress,
        shippingMethod: data.shippingMethod,
        paymentMethod: data.paymentMethod,
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      })

      if (!res.ok) throw new Error("Failed to place order")

      const newOrder = await res.json()
      
      clearCart()
      toast.success("Order placed successfully!", { icon: "🎉" })
      router.push(`/order/${newOrder.id}`)
      
    } catch (error) {
      toast.error("Failed to place order. Please try again.")
      setIsSubmitting(false)
    }
  }

  const steps = [
    { id: 1, title: "Address" },
    { id: 2, title: "Shipping" },
    { id: 3, title: "Payment" },
    { id: 4, title: "Review" },
  ]

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <Container>
        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 z-0 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-600 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>
            
            {steps.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-gray-50 px-2">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                    currentStep >= step.id 
                      ? "bg-primary-600 text-white" 
                      : "bg-white border-2 border-gray-300 text-gray-400"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle2 size={16} /> : step.id}
                </div>
                <span className={`text-xs font-medium ${currentStep >= step.id ? "text-primary-900" : "text-gray-400"}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Main Form Area */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
              
              {/* Step 1: Address */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <h2 className="text-2xl font-heading font-bold text-gray-900">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Street Address</label>
                      <Controller
                        name="shippingAddress.line1"
                        control={control}
                        rules={{ required: "Street address is required" }}
                        render={({ field }) => (
                          <Input {...field} placeholder="123 Main St" />
                        )}
                      />
                      {errors.shippingAddress?.line1 && (
                        <p className="text-destructive text-xs mt-1">{errors.shippingAddress.line1.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">City</label>
                      <Controller
                        name="shippingAddress.city"
                        control={control}
                        rules={{ required: "City is required" }}
                        render={({ field }) => (
                          <Input {...field} placeholder="New York" />
                        )}
                      />
                      {errors.shippingAddress?.city && (
                        <p className="text-destructive text-xs mt-1">{errors.shippingAddress.city.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">State / Province</label>
                      <Controller
                        name="shippingAddress.state"
                        control={control}
                        rules={{ required: "State is required" }}
                        render={({ field }) => (
                          <Input {...field} placeholder="NY" />
                        )}
                      />
                      {errors.shippingAddress?.state && (
                        <p className="text-destructive text-xs mt-1">{errors.shippingAddress.state.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">ZIP / Postal Code</label>
                      <Controller
                        name="shippingAddress.pincode"
                        control={control}
                        rules={{ required: "ZIP is required" }}
                        render={({ field }) => (
                          <Input {...field} placeholder="10001" />
                        )}
                      />
                      {errors.shippingAddress?.pincode && (
                        <p className="text-destructive text-xs mt-1">{errors.shippingAddress.pincode.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Country</label>
                      <Controller
                        name="shippingAddress.country"
                        control={control}
                        rules={{ required: "Country is required" }}
                        render={({ field }) => (
                          <Input {...field} placeholder="United States" />
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <h2 className="text-2xl font-heading font-bold text-gray-900">Shipping Method</h2>
                  <div className="space-y-4">
                    <Controller
                      name="shippingMethod"
                      control={control}
                      render={({ field }) => (
                        <>
                          <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${field.value === "STANDARD" ? "border-primary-600 bg-primary-50" : "border-gray-100 hover:border-gray-200"}`}>
                            <div className="flex items-center gap-4">
                              <input type="radio" {...field} value="STANDARD" checked={field.value === "STANDARD"} className="w-5 h-5 text-primary-600" />
                              <div>
                                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                  <Truck size={18} className="text-gray-500" /> Standard Shipping
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">3-5 business days</p>
                              </div>
                            </div>
                            <span className="font-medium">{subtotal > 5000 ? "Free" : "৳100"}</span>
                          </label>

                          <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${field.value === "EXPRESS" ? "border-primary-600 bg-primary-50" : "border-gray-100 hover:border-gray-200"}`}>
                            <div className="flex items-center gap-4">
                              <input type="radio" {...field} value="EXPRESS" checked={field.value === "EXPRESS"} className="w-5 h-5 text-primary-600" />
                              <div>
                                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                  <Truck size={18} className="text-primary-500" /> Express Shipping
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">1-2 business days</p>
                              </div>
                            </div>
                            <span className="font-medium">৳250</span>
                          </label>
                        </>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <h2 className="text-2xl font-heading font-bold text-gray-900">Payment Method</h2>
                  <div className="space-y-4">
                    <Controller
                      name="paymentMethod"
                      control={control}
                      render={({ field }) => (
                        <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-colors border-primary-600 bg-primary-50`}>
                          <div className="flex items-center gap-4">
                            <input type="radio" {...field} value="COD" checked={true} className="w-5 h-5 text-primary-600" />
                            <div>
                              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                <ShoppingBag size={18} className="text-primary-500" /> Cash on Delivery (COD)
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">Pay with cash when your order arrives.</p>
                            </div>
                          </div>
                        </label>
                      )}
                    />
                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 text-sm text-gray-500 flex items-start gap-3">
                      <CreditCard className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <p>Credit Card and Online Payment options are currently disabled in your region. Only Cash on Delivery is available at this time.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <h2 className="text-2xl font-heading font-bold text-gray-900">Review Your Order</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                      <h4 className="font-semibold text-gray-900 mb-2">Shipping Address</h4>
                      <p className="text-sm text-gray-600">
                        {formValues.shippingAddress.line1}<br />
                        {formValues.shippingAddress.city}, {formValues.shippingAddress.state} {formValues.shippingAddress.pincode}<br />
                        {formValues.shippingAddress.country}
                      </p>
                      <button type="button" onClick={() => setCurrentStep(1)} className="text-sm text-primary-600 hover:underline mt-2">Edit</button>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Shipping Method</h4>
                        <p className="text-sm text-gray-600">{formValues.shippingMethod === "STANDARD" ? "Standard (3-5 days)" : "Express (1-2 days)"}</p>
                        <button type="button" onClick={() => setCurrentStep(2)} className="text-sm text-primary-600 hover:underline mt-2">Edit</button>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Payment Method</h4>
                        <p className="text-sm text-gray-600">Cash on Delivery</p>
                        <button type="button" onClick={() => setCurrentStep(3)} className="text-sm text-primary-600 hover:underline mt-2">Edit</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>

            {/* Navigation Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
              {currentStep > 1 ? (
                <Button type="button" variant="ghost" onClick={() => setCurrentStep(currentStep - 1)}>
                  Back
                </Button>
              ) : (
                <div /> // Spacer
              )}
              
              <Button type="submit" form="checkout-form" size="lg" disabled={isSubmitting}>
                {currentStep === 4 ? (
                  isSubmitting ? "Processing..." : "Place Order"
                ) : (
                  <>Continue <ChevronRight className="ml-2 w-4 h-4" /></>
                )}
              </Button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-md bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                      <img src={item.product.images[0]} alt={item.product.name} className="object-cover w-full h-full" />
                      <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-medium">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.product.name}</p>
                      <p className="text-sm text-gray-500 mt-1">৳{(item.product.price * item.quantity).toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm text-gray-600 py-4 border-y border-gray-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">৳{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">
                    {shippingCost === 0 ? <span className="text-success">Free</span> : `৳${shippingCost.toLocaleString("en-IN")}`}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-primary-600">৳{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
