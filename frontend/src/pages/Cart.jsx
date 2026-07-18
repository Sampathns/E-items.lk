import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function Cart() {
  const navigate = useNavigate(); // ආපසු යාම සඳහා Router hook එක

  return (
    <div className="min-h-screen w-full bg-black text-slate-200 font-sans p-5">
      <div className="mx-auto max-w-2xl pt-10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")} // Home එකට navigate කිරීම
          className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Store
        </button>

        <h1 className="font-serif text-3xl font-bold text-white mb-8">Your Cart</h1>

        {/* Empty Cart View */}
        <div className="flex flex-col items-center justify-center border border-white/10 rounded-xl bg-[#0B0B0F] p-12 text-center">
          <ShoppingBag className="h-12 w-12 text-slate-600 mb-4" strokeWidth={1.5} />
          <h2 className="text-lg font-semibold text-white mb-1">Your cart is empty</h2>
          <p className="text-sm text-slate-400 max-w-sm mb-6">
            Looks like you haven't added any gadgets to your cart yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition"
            style={{ backgroundColor: "#F59E0B" }}
          >
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
}