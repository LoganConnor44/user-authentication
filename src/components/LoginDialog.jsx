import React from 'react';
import { connect } from 'react-redux';
import { userActions, loginActions } from '../Actions';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Slide from '@material-ui/core/Slide';
import LockIcon from '@material-ui/icons/LockOutlined';

class LoginDialog extends React.Component {

    /**
     * Resets the login status.
     * Sets the new current state values.
     * Sets and binds handles to this object.
     * @param {object} props Properties of the React component.
     * @returns void
     */
    constructor(props) {
        super(props);
        this.props.dispatch(userActions.logout());
        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	/**
	 * Returns FALSE to the root reduce as property loginDialogOpen .
	 */
    handleClose = () => {
        this.props.dispatch(loginActions.close());
    };

    /**
     * Sets the value of each named element as a dictionary key and repaints the DOM on the html attribute as the user types.
     * @param {object} event
     * @returns void
     */
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    /**
     * Prevents the default behaviour of the passed in event object.
     * Repaints the DOM with submitted value set as true.
     * Sets username and password based on this.state.
     * If username AND password has a value attempt to login via Redux dispatch.
     * @param {object} event
     * @returns void
     */
    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            submitted: true
        });
        const {
            username,
            password
        } = this.state;
        const { dispatch } = this.props;

        if (username && password) {
            dispatch(userActions.login(username, password));
        }
        this.clearFormData();
    }

	/**
	 * Resets the username and password in the login dialog.
	 * @returns void
	 */
    clearFormData() {
        this.setState({
            username: '',
            password: ''
        });
    }

    /**
     * Sets logginIn from the React this.props .
     * Sets username, password, and submitted from the current this.state of LoginDialog .
     * Renders the given html tags to the page based on the previously set variables.
     * @returns HTML
     */
    render() {
        const {
            username,
            password
        } = this.state;
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Dialog
                    open={this.props.loginDialogOpen ? true : false}
                    TransitionComponent={Transition}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description" >
                    <Paper className={classes.paper} >
                        <Avatar className={classes.avatar} >
                            <LockIcon />
                        </Avatar>
                        <Typography variant="headline" >
                            Sign in
						</Typography>
                        <form
                            name="LoginForm"
                            className={classes.form}
                            onSubmit={this.handleSubmit} >
                            <FormControl
                                margin="normal"
                                required
                                fullWidth >
                                <InputLabel htmlFor="username" >
                                    Username
								</InputLabel>
                                <Input
                                    name="username"
                                    value={username}
                                    onChange={this.handleChange}
                                    autoComplete="username"
                                    autoFocus />
                            </FormControl>
                            <FormControl
                                margin="normal"
                                required
                                fullWidth >
                                <InputLabel htmlFor="password" >
                                    Password
								</InputLabel>
                                <Input
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                    type="password"
                                    id="password"
                                    autoComplete="current-password" />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="raised"
                                color="primary"
                                className={classes.submit} >
                                Sign in
							</Button>
                        </form>
                    </Paper>
                </Dialog>
            </React.Fragment>
        );
    }
}

/**
 * Sets the React state of the LoginDialog class.
 * @param {object} state 
 */
function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
        loginDialogOpen: state.loginDialogOpen
    };
}

/**
 * Animation provided by the material-ui framework.
 * @param {*} props 
 */
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

/**
 * Stles for the Login Dialog given to the material-ui framework.
 */
const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

/**
 * A check that styles was given - throws an error if styles were forgotten.
 */
LoginDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

// Pass in the base LoginDialog to create styles.
const loginDialogWithStyles = withStyles(styles)(LoginDialog);
// Pass in the LoginDialog that now has styles to connect with the Redux store.
const connectedLoginDialog = connect(mapStateToProps)(loginDialogWithStyles);
// Export the connected LoginDialog to be imported by other areas of the application.
export { connectedLoginDialog as LoginDialog };