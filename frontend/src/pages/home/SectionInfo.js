import { Grid, Typography } from "@mui/material";

export default function SectionInfo() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" className="text__bold--big" gutterBottom>
          Misión
        </Typography>
        <Typography align="justify">
          Buscamos desarrollar una acción Educativa Integral en los niveles de Educación Primaria, integrando a partir del año escolar 2017 – 2018 una Escuela Técnica, cuya misión es la formación de niños y adolescentes mediante el desarrollo de destrezas y capacidades a la luz de la exploración y orientación educativa y vocacional. Así como estimular el deseo de saber y desarrollar la capacidad de ser de cada individuo.
				</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" className="text__bold--big" gutterBottom>
          Visión
        </Typography>
        <Typography align="justify">
          Se tiene como visión la educación progresiva e integral de sus estudiantes, una enseñanza humana cristiana de calidad, con una investigación y actualización científica y pedagógica permanente que permita la inserción de los egresados en forma efectiva dentro de la sociedad, proponiendo a Jesús como referencia de sentido, valores, y forma de vivir.
				</Typography>
      </Grid>
    </Grid>
  )
}
