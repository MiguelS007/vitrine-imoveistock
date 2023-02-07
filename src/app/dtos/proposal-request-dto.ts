export abstract class ProposalRequestDto {
    type: string;
    rentAmount?: number;
    suggestedRentAmount?: number;
    iptuAmount?: number;
    condominiumAmount?: number;
    rentAmountTotal?: number;
    saleAmount?: number;
    suggestedSaleAmount?: number;
    saleAmountTotal?: number;
    saleCarAsPaymentAmount?: number;
    salePropertyAsPaymentAmount?: number;
    saleDirectInstallmentAsPaymentAmount?: number;
    saleFinancingAsPaymentAmount?: number;
    changes?: ProposalChangesRegisterRequestDto[];
    announcementId?: string
}

class ProposalChangesRegisterRequestDto {
    types: string;
    description: string;
}