import React from 'react';
import { connect } from 'react-redux';
import { 
    userActions,
    registerActions
} from '../actions';
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

class RegisterDialog extends React.Component {

	/**
	 * Passes the properties to the parent, React.Component .
	 * Sets the default state values.
	 * Sets and binds handles to this object.
	 * @param {object} props
	 * @returns void
	 */
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
	 * Returns FALSE to the root reduce as property registerDialogOpen .
	 */
    handleClose = () => {
        this.props.dispatch(registerActions.close());
    };

	/**
     * Sets the value of each named element as a dictionary key and repaints the DOM on the html attribute as the user types.
     * @param {object} event
     * @returns void
     */
    handleChange(event) {
        const {
            name,
            value
        } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering } = this.props;
        const {
            user
        } = this.state;
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Dialog
                    open={this.props.registerDialogOpen ? true : false}
                    TransitionComponent={Transition}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description" >
                    <Paper className={classes.paper} >
                        <Avatar className={classes.avatar} >
                            <LockIcon />
                        </Avatar>
                        <Typography variant="headline" >
                            Register
						</Typography>
                        <form
                            name="RegisterForm"
                            className={classes.form}
                            onSubmit={this.handleSubmit} >
                            <FormControl
                                margin="normal"
                                required
                                fullWidth >
                                <InputLabel htmlFor="firstName" >
                                    First Name
								</InputLabel>
                                <Input
                                    name="firstName"
                                    value={user.firstName}
                                    onChange={this.handleChange}
                                    autoComplete="First Name"
                                    autoFocus />
                            </FormControl>
                            <FormControl
                                margin="normal"
                                required
                                fullWidth >
                                <InputLabel htmlFor="lastName" >
                                    Last Name
								</InputLabel>
                                <Input
                                    name="lastName"
                                    value={user.lastName}
                                    onChange={this.handleChange}
                                    autoComplete="Last Name" />
                            </FormControl>
                            <FormControl
                                margin="normal"
                                required
                                fullWidth >
                                <InputLabel htmlFor="username" >
                                    Username
								</InputLabel>
                                <Input
                                    name="username"
                                    value={user.username}
                                    onChange={this.handleChange}
                                    autoComplete="Username" />
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
                                    value={user.password}
                                    onChange={this.handleChange}
                                    autoComplete="Password" />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="raised"
                                color="primary"
                                className={classes.submit} >
                                Sign in
							</Button>
                            {registering &&
                                <img alt="loading graphic" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                        </form>
                    </Paper>
                </Dialog>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering,
        registerDialogOpen: state.registerDialogOpen
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
RegisterDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

// Pass in the base RegisterDialog to create styles.
const registerDialogWithStyles = withStyles(styles)(RegisterDialog);
// Pass in the RegisterDialog that now has styles to connect with the Redux store.
const connectedRegisterDialog = connect(mapStateToProps)(registerDialogWithStyles);
// Export the connected RegisterDialog to be imported by other areas of the application.
export { connectedRegisterDialog as RegisterDialog };