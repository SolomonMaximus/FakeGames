import { describe, expect, it } from "vitest";
import {
  createFakeOrderNumber,
  validateCheckoutForm,
} from "../features/checkout/utils/checkoutUtils";

describe("validateCheckoutForm", () => {
  it("returns an error when full name is missing", () => {
    const result = validateCheckoutForm({
      fullName: "",
      email: "test@test.com",
      address: "Test street 1",
      paymentMethod: "fake-card",
    });

    expect(result).toBe("Full name is required");
  });

  it("returns an error when email is invalid", () => {
    const result = validateCheckoutForm({
      fullName: "Test User",
      email: "wrong-email",
      address: "Test street 1",
      paymentMethod: "fake-card",
    });

    expect(result).toBe("Valid email is required");
  });

  it("returns an error when address is missing", () => {
    const result = validateCheckoutForm({
      fullName: "Test User",
      email: "test@test.com",
      address: "",
      paymentMethod: "fake-card",
    });

    expect(result).toBe("Address is required");
  });

  it("returns null when checkout form is valid", () => {
    const result = validateCheckoutForm({
      fullName: "Test User",
      email: "test@test.com",
      address: "Test street 1",
      paymentMethod: "fake-card",
    });

    expect(result).toBe(null);
  });
});

describe("createFakeOrderNumber", () => {
  it("creates an order number starting with FG-", () => {
    const orderNumber = createFakeOrderNumber();

    expect(orderNumber.startsWith("FG-")).toBe(true);
  });
});
