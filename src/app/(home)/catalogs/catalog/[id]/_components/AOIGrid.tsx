'use client';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react';
import AOICard from './AOICard';
import { AOICardProps } from './types';
import { getCatalogUrl } from '@/utils/clientUrls';
import useSWR from 'swr';
import Loading from '@/app/components/PageContainer/loading';

const Grid = Grid2;

const AOIGrid = ({ id }: { id: string }) => {
  const { data, error } = useSWR<AOICardProps[], Error>(getCatalogUrl(id), async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  });

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <Grid container columns={16}>
      <Grid xs={0} sm={0} md={1} lg={2} xl={2} />
      <Grid container xs={16} sm={16} md={14} lg={12} xl={12} spacing={1}>
        {[data[0]].map((cardData) => (
          <Grid xs={16} sm={8} md={5} lg={5} xl={4} key={cardData.id}>
            <AOICard {...cardData} />
          </Grid>
        ))}
      </Grid>
      <Grid xs={0} sm={0} md={1} lg={2} xl={2} />
    </Grid>
  );
};

export default AOIGrid;
