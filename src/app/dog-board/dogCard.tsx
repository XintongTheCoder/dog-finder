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
import { Dog, HasFavourite } from '../common/types';
import { useAppDispatch } from '@/lib/redux/hooks';
import { toggleFavoriteDog } from '@/lib/redux/slices/dogBoardSlice';

interface Props {
  dog: Dog & HasFavourite;
  isDialog: boolean;
}

export default function DogCard({ dog, isDialog }: Props): ReactElement {
  const dispatch = useAppDispatch();
  if (isDialog) {
    console.log('@@@', dog.zipCode);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={dog.name}
        action={
          !isDialog && (
            <IconButton
              aria-label="add to favorites"
              color={dog.favorite ? 'primary' : 'default'}
              onClick={() => {
                dispatch(toggleFavoriteDog(dog.id));
              }}
            >
              <FavoriteIcon />
            </IconButton>
          )
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
      {!isDialog && (
        <div className="flex justify-end gap-x-2">
          <FacebookShareButton url="http://www.facebook.com">
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <PinterestShareButton url="https://www.pinterest.com/pin/create/button/" media="">
            <PinterestIcon size={32} round />
          </PinterestShareButton>
        </div>
      )}
    </Card>
  );
}
