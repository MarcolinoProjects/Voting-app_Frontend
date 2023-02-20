import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import {VotingSession} from "../../api/Voting/types";
import votingGolangApi from "../../api/Voting";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
        },
    }),
);

export default function CreatePage() {
    const [isLoading, setLoading] = useState(false)
    const classes = useStyles();
    const history = useHistory();
    const [state, setState] = useState({
        votingSession: {
            touched: false,
            value: ""
        },
        candidate1: {
            touched: false,
            value: ""
        },
        candidate2: {
            touched: false,
            value: ""
        }
    })
    const handleSubmission = () => {
        const VotingSession: VotingSession = {
            name: state.votingSession.value,
            candidates: [
                {name: state.candidate1.value}, {name: state.candidate2.value}
            ]
        } as VotingSession
        votingGolangApi.createVotingSession(VotingSession).then(res=>{
            console.log(res.data)
            window.open('/voting/'+res.data.uuid,'_newtab');
            history.push('/result/'+res.data.uuid)
        }, err=>{
            console.log(err)
        }).finally(
            ()=>{
                setLoading(false)
            }
        )
    }
    return (
        <div className={classes.root}>
            <h2>Give a name for the candidates and for the voting session!</h2>
            <TextField
                id="outlined-full-width"
                label="Label"
                style={{margin: 8}}
                placeholder="Cat or Dog?"
                // helperText="Full width!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setState({
                            ...state,
                            votingSession: {touched: true, value: event.target.value}
                        }
                    );
                }}
                error={state.votingSession.touched && !state.votingSession.value}
            />
            <TextField
                id="outlined-full-width"
                label="Candidate 1"
                style={{margin: 8}}
                placeholder="Cat"
                // helperText="Full width!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setState({
                            ...state,
                            candidate1: {touched: true, value: event.target.value}
                        }
                    );
                }}
                error={state.candidate1.touched && !state.candidate1.value}
            />
            <TextField
                id="outlined-full-width"
                label="Candidate 2"
                style={{margin: 8}}
                placeholder="Dog"
                // helperText="Full width!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setState({
                            ...state,
                            candidate2: {touched: true, value: event.target.value}
                        }
                    );
                }}
                error={state.candidate2.touched && !state.candidate2.value}
            />
            <Button variant="contained" size="large"
                    startIcon={<SaveIcon/>} color="primary"
                    disabled={!state.candidate2.value || !state.candidate1.value || !state.votingSession.value}
                    onClick={handleSubmission}>
                Create Voting Session
            </Button>
        </div>
    );
}
