import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import Icon from './icon'
import dotenv from 'dotenv'

dotenv.config()

const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)

    const handleSubmit = () => {

    }

    const handleChange = () => {

    }

    const handleShowPassword = () => {
      setShowPassword((prev) => !prev)
    }

    const switchMode = () => {
      setIsSignup((prev) => !prev)
      handleShowPassword(false)
    }

    const googleSuccess = async (res) =>  {
      console.log(res)
    }

    const googleFailure = (error) => {
      console.log({error})
      console.log("Google Sign In was unsuccessful. Try again later")
    }

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h6'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {
                isSignup && (
                  <>
                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                    <Input name='firstName' label='First Name' handleChange={handleChange} half />
                  </>
                )
              }
              <Input name='email' label='EMail Address' handleChange={handleChange} type='email' />
              <Input name='password' label='Password' handleChange={handleChange} 
                     type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              { isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' /> }
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
            <GoogleLogin 
              clientId='732732546818-8jq4in4mon7cmqma3cpk4ej3s1fiot2h.apps.googleusercontent.com'
              render={(renderProps) => (
                <Button className={classes.googleButton} color='primary' fullWidth 
                        onClick={renderProps.onClick} disabled={renderProps.disabled}
                        startIcon={<Icon />} variant='contained'
                        >
                          Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy='single_host_origin'
            />
            <Grid container justify='flex-end'>
              <Grid item>
                <Button onClick={switchMode}>
                  { isSignup? 'Already have an acount? Sign In' : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
        </form>

      </Paper>
    </Container>
  )
}

export default Auth