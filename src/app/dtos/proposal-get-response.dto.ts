import { AnnouncementGetResponseDto } from "./announcement-get-response.dto";
import { UserGetResponseDto } from "./user-get-response.dtos";

export abstract class ProposalGetResponseDto {
    _id: string;

    type?: string;

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

    changes?: ProposalChangesModel[];

    status?: string;

    announcement?: AnnouncementGetResponseDto;

    user?: UserGetResponseDto;

    parentProposal?: ProposalGetResponseDto;

    hasChild: boolean;

}
class ProposalChangesModel {
    type: string;
    description: string;
}