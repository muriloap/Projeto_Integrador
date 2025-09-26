import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Container } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function Home(){

  return(
    <Container maxWidth="sm">

    <Box display="flex" flexDirection="column" alignItems="center" gap={20} mt={4}>

      <AccountCircleIcon sx={{ fontSize: 100, color: 'Black' }} />
  

    <Container maxWidth="sm">
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={4}>
    
    <Box component="form"
      sx={{ '& > :not(style)': { m: 1, width: '50ch' } }}
      noValidate
      autoComplete="off">
      <TextField id="outlined-basic" label="Email" variant="outlined" />
    </Box>

    <Box component="form"
      sx={{ '& > :not(style)': { m: 1, width: '50ch' } }}
      noValidate
      autoComplete="off">
      <TextField id="outlined-basic"  label="Email" type="password" variant="outlined" />
    </Box>
    </Box>
    
    </Container>
    </Box>
    </Container>


)
}
    
    
  