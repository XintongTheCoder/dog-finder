import React, { ReactElement } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FacebookShareButton, FacebookIcon, PinterestShareButton, PinterestIcon } from 'next-share';
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
          <IconButton aria-label="add to favorites" color="primary">
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
      <div className="flex justify-end gap-x-2">
        <FacebookShareButton url="http://www.facebook.com">
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <PinterestShareButton url="https://www.pinterest.com/pin/create/button/" media="">
          <PinterestIcon size={32} round />
        </PinterestShareButton>
      </div>
    </Card>
  );
}
