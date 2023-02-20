import React from 'react';
import './App.css';
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import VotingPage from "./pages/voting";
import ResultPage from "./pages/result";
import {Button} from "@material-ui/core";
import CreatePage from "./pages/create";

function App() {
    const history = useHistory()
    return (
        <div className="debug">
            <Switch>

                <Route path="/voting/:uuid" exact>
                    <VotingPage/>
                </Route>
                <Route path="/result/:uuid" exact>
                    <ResultPage/>
                </Route>
                <Route path="/" exact>
                    <Redirect to="/index"/>
                </Route>
                <Route path="/index" exact>
                    <Button variant="contained" color="primary" onClick={()=>{
                        history.push("/create")
                    }}>
                        New Voting!
                    </Button>
                </Route>
                <Route path="/create" exact>
                    <CreatePage/>
                </Route>
                <Route path="*">
                    <h1>Not Found!</h1>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
