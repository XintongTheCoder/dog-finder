import React, { ReactElement } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Dog } from '../common/types';

interface Props {
  dog: Dog;
}

export default function DogCard({ dog }: Props): ReactElement {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={dog.name}
        action={
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        }
      />
      <CardMedia component="img" height="194" image={dog.img} alt="dog image" />
      <CardContent>
        <ListItem key="breed" component="div">
          <ListItemText primary={`breed: ${dog.breed}`} />
        </ListItem>
        <ListItem key="age" component="div">
          <ListItemText primary={`age: ${dog.age}`} />
        </ListItem>
        <ListItem key="zip" component="div">
          <ListItemText primary={`zip code: ${dog.zipCode}`} />
        </ListItem>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
