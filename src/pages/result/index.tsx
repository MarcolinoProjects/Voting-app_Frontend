import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import votingGolangApi from "../../api/Voting";
import {VotingSession} from "../../api/Voting/types";
import Candidate from "../../components/Candidate";
import {Divider} from "@material-ui/core";
import socketIO from "../../api/Events";


// @ts-ignore
export default function ResultPage(props) {
    const {uuid}: { uuid: string } = useParams();

    const [votingSession, setVotingSession] = useState(undefined as VotingSession | undefined);
    const history = useHistory();
    useEffect(() => {
        socketIO.listenToEvent(uuid, (dataFromServer: any) => {
            if (typeof dataFromServer == "string") {
                setVotingSession(JSON.parse(dataFromServer) as VotingSession)
            }

        })
    }, [uuid])

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
                <h1>Voting Session Result: {votingSession.name}<br/> vote <a href={`/voting/${votingSession.uuid}`}>here</a>!
                </h1>
                <Divider/>
                <h1>Results:</h1>
                {votingSession.candidates?.map(item => <Candidate key={item.uuid} candidate={item}
                                                                  voting={votingSession}/>)}
            </div>}
        </>
    );
}
