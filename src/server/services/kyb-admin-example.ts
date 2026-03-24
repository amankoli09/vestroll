/**
 * Example: Admin KYB Review Service
 * 
 * This file demonstrates how to use KYB rejection codes when reviewing
 * and rejecting KYB submissions. This is NOT production code, but a reference
 * for implementing admin review functionality.
 */

import { db, kybVerifications } from "../db";
import { eq } from "drizzle-orm";
import { KYB_REJECTION_CODES, type KybRejectionCode } from "./kyb.service";

export class KybAdminService {
  /**
   * Example: Reject a KYB verification with a specific code
   */
  static async rejectVerification(
    verificationId: string,
    rejectionCode: KybRejectionCode,
    rejectionReason: string,
    reviewedBy: string
  ) {
    await db
      .update(kybVerifications)
      .set({
        status: "rejected",
        rejectionCode,
        rejectionReason,
        reviewedAt: new Date(),
      })
      .where(eq(kybVerifications.id, verificationId));

    return {
      success: true,
      message: "KYB verification rejected",
    };
  }

  /**
   * Example: Approve a KYB verification
   */
  static async approveVerification(
    verificationId: string,
    reviewedBy: string
  ) {
    await db
      .update(kybVerifications)
      .set({
        status: "verified",
        rejectionCode: null,
        rejectionReason: null,
        reviewedAt: new Date(),
      })
      .where(eq(kybVerifications.id, verificationId));

    return {
      success: true,
      message: "KYB verification approved",
    };
  }
}

/**
 * Example usage scenarios:
 * 
 * // Scenario 1: Invalid certificate
 * await KybAdminService.rejectVerification(
 *   verificationId,
 *   KYB_REJECTION_CODES.INVALID_CERTIFICATE,
 *   "The incorporation certificate appears to be expired. Please upload a current certificate dated within the last 6 months.",
 *   adminUserId
 * );
 * 
 * // Scenario 2: Mismatched information
 * await KybAdminService.rejectVerification(
 *   verificationId,
 *   KYB_REJECTION_CODES.MISMATCHED_INFORMATION,
 *   "The business name on the certificate doesn't match the registration number. Please ensure all documents are for the same entity.",
 *   adminUserId
 * );
 * 
 * // Scenario 3: Unreadable documents
 * await KybAdminService.rejectVerification(
 *   verificationId,
 *   KYB_REJECTION_CODES.UNREADABLE_DOCUMENTS,
 *   "The uploaded documents are too blurry to verify. Please upload clear, high-resolution scans or photos.",
 *   adminUserId
 * );
 */
