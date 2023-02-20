import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import {Link} from "@material-ui/core";

interface Props {
    window?: () => Window;
    children: React.ReactElement;
    title: string;
}

function HideOnScroll(props: Props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({target: window ? window() : undefined});

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function HideAppBar(props: Props) {
    // const history = useHistory()
    // const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();
    return (
        <React.Fragment>
            <CssBaseline/>
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6">
                            <Link href="/" color="inherit">
                                {props.title}
                            </Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar/>
            <Container className="min-height-max-vh">
                <Box my={2}>
                    {props.children}
                </Box>
            </Container>
        </React.Fragment>
    );
}
