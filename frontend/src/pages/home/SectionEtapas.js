import { Grid, Paper, Typography } from "@mui/material";

const papers = [
  {
    title: 'Centro taller artesanal',
    subtitle: '6° grado',
    classes: {
      backgroundColor: '#DC7F9B',
      height: 150,
      marginLeft: 1,
      marginRight: 1,
    }
  },
  {
    title: 'Educación primaria',
    subtitle: 'Desde 1° hasta 6° Grado',
    classes: {
      backgroundColor: '#2F2F2F',
      height: 150,
      marginLeft: 1,
      marginRight: 1,
    }
  },
  {
    title: 'Educación Media General',
    subtitle: 'Desde 1° hasta 3° Año',
    classes: {
      backgroundColor: '#6B8DD6',
      height: 150,
      marginLeft: 1,
      marginRight: 1,
    }
  },
  {
    title: 'Educación Media Técnica en Informática',
    subtitle: 'Desde 4° hasta 6° Año',
    classes: {
      backgroundColor: '#55A2A2',
      height: 150,
      marginLeft: 1,
      marginRight: 1,
    }
  },
  {
    title: 'Educación Media Técnica en Contabilidad',
    subtitle: 'Desde 4° hasta 6° Año',
    classes: {
      backgroundColor: '#FC8948',
      height: 150,
      marginLeft: 1,
      marginRight: 1,
    }
  },
  {
    title: 'Educación Media Técnica Administración en Financias',
    subtitle: '6° grado',
    classes: {
      backgroundColor: '#9055A2',
      height: 150,
      marginLeft: 1,
      marginRight: 1,
    }
  },
]

export default function SectionEtapas() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" className="text__bold--big" gutterBottom>
					Etapas educativas
				</Typography>
      </Grid>

      {papers.map((data, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Paper sx={papers[index].classes}>
            <Grid container direction='column' justifyContent='center' alignItems='center' height='100%'>
              <Typography align='center' sx={{color: '#ffffff'}}>
                {papers[index].title}
              </Typography>
              <Typography 
                variant='body2' 
                align='center'
                sx={{color: '#ffffffc4'}}
              >
                {papers[index].subtitle}
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
