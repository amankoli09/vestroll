/**
 * Example: Frontend KYB Rejection Handler
 * 
 * This component demonstrates how to use KYB rejection codes to provide
 * specific feedback to users. This is a reference implementation.
 */

import { 
  KYB_REJECTION_CODES, 
  KYB_REJECTION_MESSAGES, 
  KYB_REJECTION_FIELD_MAP,
  type KybRejectionCode 
} from "@/types/kyb";

interface KybStatusResponse {
  status: "not_started" | "pending" | "verified" | "rejected";
  rejectionReason: string | null;
  rejectionCode: KybRejectionCode | null;
  submittedAt: string | null;
}

export function useKybRejectionHandler(status: KybStatusResponse) {
  if (status.status !== "rejected" || !status.rejectionCode) {
    return null;
  }

  const code = status.rejectionCode;
  const fieldToHighlight = KYB_REJECTION_FIELD_MAP[code];
  const defaultMessage = KYB_REJECTION_MESSAGES[code];

  return {
    code,
    fieldToHighlight,
    message: status.rejectionReason || defaultMessage,
    defaultMessage,
  };
}

/**
 * Example usage in a component:
 * 
 * function KybForm() {
 *   const { data: kybStatus } = useQuery({
 *     queryKey: ['kyb-status'],
 *     queryFn: async () => {
 *       const res = await fetch('/api/kyb/status');
 *       return res.json();
 *     }
 *   });
 * 
 *   const rejection = useKybRejectionHandler(kybStatus?.data);
 * 
 *   return (
 *     <form>
 *       <FileInput
 *         name="incorporationCertificate"
 *         label="Incorporation Certificate"
 *         error={rejection?.fieldToHighlight === 'incorporationCertificate' ? rejection.message : undefined}
 *         className={rejection?.fieldToHighlight === 'incorporationCertificate' ? 'border-red-500' : ''}
 *       />
 *       
 *       <FileInput
 *         name="memorandumArticle"
 *         label="Memorandum & Articles"
 *         error={rejection?.fieldToHighlight === 'memorandumArticle' ? rejection.message : undefined}
 *         className={rejection?.fieldToHighlight === 'memorandumArticle' ? 'border-red-500' : ''}
 *       />
 *       
 *       {rejection && !rejection.fieldToHighlight && (
 *         <Alert variant="error">
 *           {rejection.message}
 *         </Alert>
 *       )}
 *     </form>
 *   );
 * }
 */
