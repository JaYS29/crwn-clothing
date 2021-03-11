import React from "react"
import StripeCheckout from "react-stripe-checkout"

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100
  const publishableKey = "pk_test_peMbwzMsHm9BlAoATyf4O7r000SZg4PuMD"

  const onToken = token => {
    console.log(token)
    alert("Payment succesful")
  }

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing"
      billingAddress
      shippingAddress
      image="https://media.istockphoto.com/vectors/crown-icon-vector-id931637708?k=6&m=931637708&s=612x612&w=0&h=e5u55o2ZYGiIBX3zl6bhSRFNmjC6FiBZQBUnFu2LhhE="
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton
