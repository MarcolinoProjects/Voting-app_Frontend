import axios, {AxiosInstance} from "axios";
import {CandidatesEntity, VotingSession} from "./types";
const {REACT_APP_API_HOST} = process.env;

export const HOST = REACT_APP_API_HOST ? REACT_APP_API_HOST : "http://localhost:8080/api"

class VotingApi {
    private axiosIstance: AxiosInstance;

    constructor() {
        this.axiosIstance = axios.create({
            baseURL: HOST,
            timeout: 60000,
        });
    }

    createVotingSession(data: VotingSession) {
        return this.axiosIstance.post<VotingSession>("create", data);
    }

    voteOnCandidate(data: VotingSession, candidate: CandidatesEntity) {
        return this.axiosIstance.post(`${data.uuid}/${candidate.uuid}`);
    }

    fetchVotingSession(uuid: string) {
        return this.axiosIstance.get<VotingSession>(`${uuid}`);
    }

    deleteVotingSession(uuid: string) {
        return this.axiosIstance.delete(`${uuid}`);
    }
}

const votingGolangApi = new VotingApi();
export default votingGolangApi;
