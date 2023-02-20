import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {VotingSession} from "../../api/Voting/types";
import votingGolangApi from "../../api/Voting";
import {Divider} from "@material-ui/core";
import Candidate from "../../components/Candidate";


// @ts-ignore
export default function VotingPage(props) {
    const {uuid}: { uuid: string } = useParams();

    const [votingSession, setVotingSession] = useState(undefined as VotingSession | undefined);
    const history = useHistory();
    useEffect(() => {
        votingGolangApi.fetchVotingSession(uuid).then(
            (res) => {
                setVotingSession(res.data);
            },
            (error) => {
                console.log(error)
                if (error.response.status === 400) {
                    history.replace("/badrequest");
                } else if (error.response.status === 404) {
                    history.replace("/notfound");
                } else {
                    history.replace("/");
                }
            }
        );
    }, [uuid, history]);
    return (
        <>
            {votingSession && <div>
                <h1>Voting Session: {votingSession.name}</h1>
                <Divider />
                {votingSession.candidates?.map(item => <Candidate key={item.uuid} candidate={item} votingEnable voting={votingSession}/>)}
            </div>}
        </>
    );
}
