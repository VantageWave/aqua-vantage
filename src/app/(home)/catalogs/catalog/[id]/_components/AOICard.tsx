import * as React from 'react';
import { Card, CardHeader, Avatar, CardMedia, CardContent, CardActions, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Delete from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { AOICardProps } from './types';

export default function AOICard({ id, name, description, long, lat }: AOICardProps) {
  const router = useRouter();

  return (
    <Card sx={{ maxWidth: 345, marginTop: 4 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/map.png"
        alt="Map"
        sx={{ cursor: 'pointer' }}
        // onClick={() => router.push(`/map?long=${long}&lat=${lat}&zoom=20`)}
        onClick={() => router.push('/water')}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Delete />
        </IconButton>
        <IconButton
          aria-label="share"
          onClick={() => navigator.clipboard.writeText(`${window.location.origin}/map?long=${long}&lat=${lat}&zoom=20`)}
        >
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
