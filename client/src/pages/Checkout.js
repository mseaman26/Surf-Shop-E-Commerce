import * as React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/Review';
import { useCartContext } from '../utils/cartContext';
import { QUERY_ITEMS_BY_NAMES } from '../utils/queries';
import { ADD_ORDER } from '../utils/mutations';

import Auth from '../utils/auth'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  console.log((Date.now()))
  if(!Auth.loggedIn()){
    window.location.assign('/login')
}

  //convert cart object into order object
  const { cart } = useCartContext()

    const itemNameList = []
    for(let key in cart){
        itemNameList.push(key)
    }

    const { loading, data } = useQuery(QUERY_ITEMS_BY_NAMES, {
        variables: {names: itemNameList}
    })
    const [addOrder, {error, orderData}] = useMutation(ADD_ORDER)
    
    const items = data?.itemsByNames || []

    let total = 0
    for(let i = 0; i < items.length; i++){
        total += items[i].price * cart[items[i].name]
    }

    const itemPrices = []
    const itemQuantities = []
    const itemNames = []
    const itemImages = []

    items.map((item) => {
      itemPrices.push(item.price)
      itemQuantities.push(cart[item.name])
      itemNames.push(item.name)
      itemImages.push(item.image)
      console.log(itemImages)
    })

  const [activeStep, setActiveStep] = React.useState(0);
  const { clearCart } = useCartContext()

  const handleNext =  () => {
    const date = Date.now()
    console.log(JSON.stringify(date))
    if(activeStep === steps.length - 1) {
      try{
        const { data } =  addOrder({
          variables: {
            email: (localStorage.getItem('email')),
            itemNames: itemNames,
            itemPrices: itemPrices,
            itemQuantities: itemQuantities,
            itemImages: itemImages,
            createdAt: JSON.stringify(Date.now())
          }
        })
      }catch(e){
        console.error(e)
      }
      clearCart()
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}