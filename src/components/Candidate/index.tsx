import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {CandidatesEntity, VotingSession} from "../../api/Voting/types";
import votingGolangApi from "../../api/Voting";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Candidate({voting, candidate, votingEnable=false}: { voting: VotingSession, candidate: CandidatesEntity, votingEnable?: boolean }) {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(false)
    const voteHandler = () => {
        setLoading(true)
        votingGolangApi.voteOnCandidate(voting,candidate).then(res=>{
            console.log(res.status)
        }, err=>{
            console.log(err)
        }).finally(
            ()=>{
                setLoading(false)
            }
        )
    }
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    candidate:
                </Typography>
                <Typography variant="h5" component="h2">
                    {candidate.name}
                </Typography>
                {!votingEnable && <>
                    <Typography className={classes.pos} color="textSecondary">
                        Votes:
                    </Typography>
                    <Typography variant="body2" component="p">
                        {candidate.votes} votes!
                    </Typography>
                </>}
            </CardContent>
            {votingEnable && <CardActions>
                <Button size="small" onClick={voteHandler}>Vote here!</Button>
            </CardActions>}
        </Card>
    );
}
