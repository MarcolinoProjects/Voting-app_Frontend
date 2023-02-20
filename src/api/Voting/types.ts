export type SignInResponse = {
    access_token?: string;
    email?: string;
}

export interface VotingSession {
    uuid: string;
    name: string;
    candidates?: (CandidatesEntity)[] | null;
}
export interface CandidatesEntity {
    uuid: string;
    name: string;
    votes: number;
}
