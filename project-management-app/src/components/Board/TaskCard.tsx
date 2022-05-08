import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete'

export const TaskCard = () => {
  return (
    <Card className="card" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Title
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Description
        </Typography>
        <Typography variant="body2">
          Responsible person
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="Delete task">
          <DeleteIcon />
        </Tooltip>
      </CardActions>
    </Card>
  )
};
