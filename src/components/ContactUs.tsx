import Footer from './Footer';
import { styled } from '@mui/system';
import { Container, Box, Typography, Button, TextField } from '@mui/material';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';

const StyledContainer = styled(Container)({
  background: 'linear-gradient(180deg, #28A197 0%, #0F3B37 100%)',
  padding: '4rem 2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  color: 'white',
});

const Heading = styled(Typography)({
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '2rem',
  color: '#ffffff',
});

const ContactInfo = styled(Box)({
  padding: '1rem',
  '& p': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    fontSize: '1.1rem',
  },
  '& svg': {
    marginRight: '0.5rem',
    color: '#5DEBD7',
  },
});

const WhiteBackgroundBox = styled(Box)({
  backgroundColor: 'white',
  padding: '1rem',
  borderRadius: '8px',
  color: '#0F3B37',
  marginBottom: '2rem',
});

const ContactForm = styled(Box)({
  padding: '1rem',
  '& button': {
    marginTop: '1rem',
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#5DEBD7',
  color: 'white',
  '&:hover': {
    backgroundColor: '#4ac6b2',
  },
});

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#5DEBD7',
    },
    '&:hover fieldset': {
      borderColor: '#4ac6b2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#5DEBD7',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#5DEBD7',
  },
});

const ContactUsPage = () => {
  return (
    <>
      <StyledContainer>
        <Heading variant="h4">Contact Us</Heading>
        <Container maxWidth="md">
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
            <ContactInfo flex={1}>
              <WhiteBackgroundBox>
                <Typography variant="h6">Let's discuss something <span style={{ color: '#5DEBD7' }}>cool</span> together</Typography>
              </WhiteBackgroundBox>
              <p><Email /> SaulDesign@gmail.com </p>
              <p><Phone /> +123456789</p>
              <p><LocationOn /> 123 Street 456 House</p>
            </ContactInfo>
            <ContactForm flex={1}>
              <Typography variant="h6">I'm interested in...</Typography>
              <Button variant="outlined" sx={{ color: 'white', borderColor: '#5DEBD7', margin: '0.5rem' }}>Be Partner</Button>
              <Button variant="outlined" sx={{ color: 'white', borderColor: '#5DEBD7', margin: '0.5rem' }}>Advertise</Button>
              <Button variant="outlined" sx={{ color: 'white', borderColor: '#5DEBD7', margin: '0.5rem' }}>Complaint</Button>
              <Button variant="outlined" sx={{ color: 'white', borderColor: '#5DEBD7', margin: '0.5rem' }}>Careers</Button>
              <Button variant="outlined" sx={{ color: 'white', borderColor: '#5DEBD7', margin: '0.5rem' }}>Other</Button>
              <CustomTextField
                fullWidth
                variant="outlined"
                margin="normal"
                placeholder="Your name"
              />
              <CustomTextField
                fullWidth
                variant="outlined"
                margin="normal"
                placeholder="Your email"
              />
              <CustomTextField
                fullWidth
                variant="outlined"
                margin="normal"
                placeholder="Your message"
                multiline
                rows={4}
              />
              <StyledButton variant="contained" startIcon={<Send />}>Send Message</StyledButton>
            </ContactForm>
          </Box>
        </Container>
      </StyledContainer>
      <Footer />
    </>
  );
}

export default ContactUsPage;
