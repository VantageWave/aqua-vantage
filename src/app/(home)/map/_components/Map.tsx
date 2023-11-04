//@ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import { FeatureGroup, MapContainer, TileLayer } from 'react-leaflet';
import { useRouter } from 'next/navigation';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { EditControl } from 'react-leaflet-draw';
import { useSearchParams } from 'next/navigation';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { createNewAOIInCatalog } from '@/app/utils/MapUtils';
import { AreasTable } from './AreasTable';
import { AreasTableActions } from './AreasTableActions';
import Area from '../../../data/Area';
import { NewAreaDialog } from './NewAreaDialog';
import { AreaEdit } from './AreaEdit';
import { useTheme } from '@mui/material/styles';

const Map = () => {
  const theme = useTheme();
  const router = useRouter();

  const [map, setMap] = useState(null);
  const [drawnAreas, setDrawnAreas] = useState<Area[] | []>([]);
  const [newArea, setNewArea] = useState<Area | null>(null);
  const [newAreaModalOpen, setNewAreaModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedArea, setEditedArea] = useState<Area | null>(null);
  const [recentLayer, setRecentLayer] = useState(null);

  const searchParams = useSearchParams();
  const lat = searchParams?.get('lat') || '21.0';
  const long = searchParams?.get('long') || '52.23';
  const zoom = searchParams?.get('zoom') || 10;

  const position = [long, lat];

  useEffect(() => {
    if (map) {
      setInterval(function () {
        map.invalidateSize();
      }, 100);
    }
  }, [map]);

  const onAreaCreated = (e: any) => {
    const { layer } = e;
    const { _northEast, _southWest } = layer._bounds;
    const newArea = new Area(
      { lat: _northEast.lat, lng: _northEast.lng },
      { lat: _southWest.lat, lng: _southWest.lng },
      0,
      'Area'
    );
    setNewAreaModalOpen(true);
    setNewArea(newArea);
    setRecentLayer(layer);
  };

  const onAreaAdded = () => {
    if (newArea) {
      setDrawnAreas([...drawnAreas, newArea]);
      setNewAreaModalOpen(false);
      setNewArea(null);
      setIsEditing(true);
      setEditedArea(newArea);
      if (recentLayer) {
        recentLayer.on('click', () => {
          setEditedArea(newArea);
          setIsEditing(true);
        });
      }
      setRecentLayer(null);
    }
  };

  const onAreaDiscarded = () => {
    setNewAreaModalOpen(false);
    if (recentLayer) recentLayer.remove();
    setRecentLayer(null);
  };

  const handleEdit = (id: string) => {
    const area = drawnAreas.find((area) => area.id === Number.parseInt(id));
    if (area) {
      setIsEditing(true);
      setEditedArea(area);
    }
  };

  const handleDelete = (id: string) => {
    const area = drawnAreas.find((area) => area.id === Number.parseInt(id));
    if (area) {
      setDrawnAreas(drawnAreas.filter((area) => area.id !== Number.parseInt(id)));
    }
  };

  const handleSubmit = () => {
    createNewAOIInCatalog(drawnAreas, 'container-1');
  };

  return (
    <Grid container spacing={2}>
      <NewAreaDialog isOpen={newAreaModalOpen} handleClose={() => onAreaDiscarded()} handleAdd={() => onAreaAdded()} />
      <Grid item xs={7}>
        <Paper
          style={
            theme.palette.mode === 'dark'
              ? { filter: 'invert(100%) hue-rotate(180deg) brightness(85%) contrast(95%)' }
              : {}
          }
        >
          <MapContainer

            center={position}
            zoom={zoom}
            scrollWheelZoom
            style={{ height: 'calc(100vh - 85px)', width: '100%' }}
            whenCreated={setMap}
          >
            <FeatureGroup>
              <EditControl
                position="topright"
                onEdited={() => { }}
                onCreated={onAreaCreated}
                onDeleted={() => { }}
                onMounted={() => { }}
                onEditStart={() => { }}
                onEditStop={() => { }}
                onDeleteStart={() => { }}
                onDeleteStop={() => { }}
                draw={{
                  rectangle: true,
                  circle: false,
                  circlemarker: false,
                  polyline: false,
                  polygon: false,
                  marker: false,
                }}
              />
            </FeatureGroup>
            <TileLayer
              //@ts-ignore
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </Paper>
      </Grid>
      <Grid item xs={5} >
        <Grid container flexDirection="column" flexWrap="nowrap" spacing={3} style={{ height: '100%', width: "100%" }}>
          <Grid item>
            <Grid item display="flex" justifyContent="space-between" flexDirection="row" alignItems="center">
              <Typography variant="h4" component="div" sx={{ flexGrow: 1, display: { sm: 'block' }, marginTop: "25px" }}>
                Areas
              </Typography>
              <Button size="small" variant="outlined" onClick={() => router.push('/catalogs/catalog/3')} 
              style={{marginTop: "auto", paddingLeft: "32px", display: "block"}}>
                <span style={{fontSize: 28, position: "absolute", left: 4, top: -10}}>+</span>Add areas to the catalog
              </Button>

            </Grid>
          </Grid>
          <Grid item >
            <AreasTable
              areas={drawnAreas}
              onEdit={(id: string) => handleEdit(id)}
              onDelete={(id: string) => handleDelete(id)}
            />
          </Grid>
          {isEditing && (
            <Grid item>
              <Paper>
                <AreaEdit
                  area={editedArea!}
                  handleClose={() => {
                    setIsEditing(false);
                  }}
                  handleSave={() => {
                    setDrawnAreas([...drawnAreas]);
                    setIsEditing(false);
                  }}
                />
              </Paper>
            </Grid>
          )}
          <Grid item style={{ alignSelf: 'flex-end' }}>
            <AreasTableActions onSubmit={() => handleSubmit()} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Map;
