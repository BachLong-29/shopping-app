"use client";

import { ShoppingCart } from "lucide-react";
import { useCartContext } from "../context/CartContext";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import CheckoutForm from "./CheckoutForm";
import PaymentSuccess from "./PaymentSuccess";

/* Step indicator */
const steps = [
  { key: "cart", label: "Giỏ hàng" },
  { key: "checkout", label: "Thanh toán" },
  { key: "success", label: "Hoàn tất" },
] as const;

const StepBar = ({ current }: { current: string }) => {
  const currentIdx = steps.findIndex((s) => s.key === current);
  return (
    <div className="flex items-center gap-0 mb-8 max-w-sm mx-auto">
      {steps.map((step, idx) => (
        <div key={step.key} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                idx < currentIdx
                  ? "bg-halo-emerald text-white"
                  : idx === currentIdx
                  ? "bg-halo-violet text-white shadow-[0_0_0_4px_rgba(124,58,237,0.2)]"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {idx < currentIdx ? "✓" : idx + 1}
            </div>
            <span
              className={`text-[10px] font-medium ${
                idx === currentIdx
                  ? "text-halo-violet"
                  : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div
              className={`h-[2px] flex-1 -mt-5 transition-all duration-500 ${
                idx < currentIdx ? "bg-halo-emerald" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const CartView = () => {
  const { checkoutStep } = useCartContext();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Page header */}
      {checkoutStep !== "success" && (
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-[12px] bg-aurora flex items-center justify-center">
              <ShoppingCart size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold">
              {checkoutStep === "cart" ? "Giỏ hàng của bạn" : "Xác nhận đơn hàng"}
            </h1>
          </div>
          <StepBar current={checkoutStep} />
        </div>
      )}

      {checkoutStep === "cart" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CartList />
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      )}

      {checkoutStep === "checkout" && <CheckoutForm />}

      {checkoutStep === "success" && <PaymentSuccess />}
    </div>
  );
};

export default CartView;
