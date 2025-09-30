"use client"
import { useRouter } from "next/navigation"

type Props = { isOpen: boolean; onClose: () => void; orderId?: string }

export default function SuccessModal({ isOpen, onClose, orderId }: Props) {
  const router = useRouter()
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold mb-2">Order Successfully Placed</h2>
        <p className="text-gray-600 mb-6">Thank you for choosing FDA</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              onClose()
              router.push("/")
            }}
            className="text-primary text-sm font-medium"
          >
            Continue shopping
          </button>
          {orderId && (
            <button
              onClick={() => {
                onClose()
                router.push(`/orders/${orderId}`) 
              }}
              className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600"
            >
              Check Order
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
