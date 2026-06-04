export type CheckoutForm = {
  fullName: string;
  email: string;
  address: string;
  paymentMethod: string;
};

export function validateCheckoutForm(form: CheckoutForm) {
  if (!form.fullName.trim()) {
    return "Full name is required";
  }

  if (!form.email.includes("@")) {
    return "Valid email is required";
  }

  if (!form.address.trim()) {
    return "Address is required";
  }

  if (!form.paymentMethod) {
    return "Payment method is required";
  }

  return null;
}

export function createFakeOrderNumber() {
  return `${Math.floor(100000 + Math.random() * 900000)}`;
}
