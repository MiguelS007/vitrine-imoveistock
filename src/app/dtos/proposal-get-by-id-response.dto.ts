import { ProposalGetResponseDto } from "./proposal-get-response.dto";

export abstract class ProposalGetByIdResponseDto {
    proposal: ProposalGetResponseDto;
    counterProposal: ProposalGetResponseDto; 
}