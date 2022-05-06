import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';

const styles = {
  box: {
    display: 'inline-block', 
    mx: '2px', 
    transform: 'scale(0.8)',
  },
  card: {
    minWidth: 275,
  }
}

const bull = (
  <Box
    component="span"
    style={styles.box}
  >
    •
  </Box>
);

export const TaskCard = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Task <title></title>
        </Typography>
        <Typography variant="h5" component="div">
          Title
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Description
        </Typography>
        <Typography variant="body2">
          Responsible person
          <br />
          {'"victim"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
};
