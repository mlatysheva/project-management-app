import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskProps } from '../../store/reducers/taskSlice';

export const Task = (props: TaskProps) => {
  return (
    <Card className="card" sx={{ minWidth: 275, minHeight: 150, marginBottom: 1.5 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.description}
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
