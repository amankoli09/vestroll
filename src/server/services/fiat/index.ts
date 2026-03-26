export type {
  PaymentProvider,
  DisburseRequest,
  DisburseResult,
  VirtualAccountRequest,
  VirtualAccountResult,
} from "./payment-provider.interface";

export { MonnifyProvider } from "./monnify.provider";
export type { MonnifyConfig } from "./monnify.provider";

import { MonnifyProvider } from "./monnify.provider";

/**
 * Create a MonnifyProvider from environment variables.
 * Throws if any required env var is missing.
 */
export function createMonnifyProvider(): MonnifyProvider {
  const apiKey = process.env.MONNIFY_API_KEY;
  const secretKey = process.env.MONNIFY_SECRET_KEY;
  const baseUrl = process.env.MONNIFY_BASE_URL;
  const contractCode = process.env.MONNIFY_CONTRACT_CODE;

  if (!apiKey || !secretKey || !baseUrl || !contractCode) {
    throw new Error(
      "Missing required Monnify environment variables: MONNIFY_API_KEY, MONNIFY_SECRET_KEY, MONNIFY_BASE_URL, MONNIFY_CONTRACT_CODE"
    );
  }

  return new MonnifyProvider({ apiKey, secretKey, baseUrl, contractCode });
}
