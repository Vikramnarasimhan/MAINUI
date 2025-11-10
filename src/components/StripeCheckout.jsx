import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import stripePromise from "../stripe/stripePromise";

// Improved CheckoutForm: styled and robust for users
function CheckoutForm({ clientSecret, userId, subscriptionTypes, expiryDays }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      alert("Please enter your card details.");
      setLoading(false);
      return;
    }
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });
    if (result.error) {
      alert(result.error.message);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        // Update subscription in backend
        try {
          const res = await fetch("https://662pt5sv12.execute-api.eu-central-1.amazonaws.com/dev/subscription-update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: userId,
              subscriptionTypes,
              expiryDays,
            }),
          });
          if (!res.ok) throw new Error("Subscription update failed on backend.");
          alert("Payment successful and subscription activated!");
          navigate("/");
        } catch (err) {
          alert("Payment succeeded but subscription activation failed: " + err.message);
        }
      }
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: 420,
      margin: "60px auto",
      padding: 32,
      background: "#fff",
      borderRadius: 14,
      boxShadow: "0 4px 32px rgba(50,50,93,0.12)",
      textAlign: "center"
    }}>
      <h2 style={{ marginBottom: 30, color: "#4b4b6b", letterSpacing: 1 }}>Enter Card Details</h2>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "18px",
                "::placeholder": { color: "#aab7c4" }
              },
              invalid: { color: "#fa755a", iconColor: "#fa755a" }
            },
            hidePostalCode: true
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: 28,
            width: "100%",
            padding: "14px 0",
            background: "#635bff",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 18,
            borderRadius: 8,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            letterSpacing: 1
          }}
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
}

export default function StripeCheckout() {
  // Get all required information from navigation state
  const location = useLocation();
  const clientSecret = location.state?.clientSecret;
  const userId = location.state?.id; // from SubscriptionForm
  const subscriptionTypes = location.state?.subscriptionTypes;
  const expiryDays = location.state?.expiryDays;

  if (!clientSecret || !userId || !subscriptionTypes || !expiryDays) {
    return <div style={{ color: "#c00", textAlign: "center", marginTop: 80 }}>Error: No payment information found.</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        clientSecret={clientSecret}
        userId={userId}
        subscriptionTypes={subscriptionTypes}
        expiryDays={expiryDays}
      />
    </Elements>
  );
}
