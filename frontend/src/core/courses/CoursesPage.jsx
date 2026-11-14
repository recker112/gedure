/**
 * MUI
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";

/**
 * Components
 */
import PanelPage from "../../components/ui/panel/PanelPage";
import { useMockRole } from "../../hooks/app/useMockRole";
import { COURSES, LEVELS, TEACHER_COURSE_IDS, TEACHER_SUBJECTS, courseLabel } from "./mockData";

function CourseCard({ course, subjects }) {
  const pct = Math.round((course.boletas / course.students) * 100);
  return (
    <Card component="article" aria-label={courseLabel(course)} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="overline" color="secondary">
          {course.level}
        </Typography>
        <Typography variant="h6" component="h3">
          {courseLabel(course)}
        </Typography>
        <Stack spacing={0.5} sx={{ mt: 1.5 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", color: "text.secondary" }}>
            <GroupsOutlinedIcon fontSize="small" aria-hidden />
            <Typography variant="body2">{course.students} estudiantes</Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", color: "text.secondary" }}>
            <PersonOutlineIcon fontSize="small" aria-hidden />
            <Typography variant="body2">Guía: {course.tutor}</Typography>
          </Stack>
        </Stack>
        {subjects && (
          <Stack direction="row" spacing={0.75} useFlexGap sx={{ mt: 1.5, flexWrap: "wrap" }}>
            {subjects.map((s) => (
              <Chip key={s} label={s} size="small" variant="outlined" />
            ))}
          </Stack>
        )}
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="textSecondary">
            Boletas 1.er lapso: {course.boletas}/{course.students}
          </Typography>
          <LinearProgress variant="determinate" value={pct} aria-label={`Boletas de ${courseLabel(course)}: ${pct}%`} sx={{ mt: 0.5, height: 6, borderRadius: 3 }} />
        </Box>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button size="small">Ver estudiantes</Button>
        <Button size="small">Horario</Button>
      </CardActions>
    </Card>
  );
}

/**
 * Cursos y secciones (admin: todos por etapa; profesor: "Mis cursos"). En
 * la Gedure anterior estaba dentro de Configuración (cursos_*).
 */
export default function CoursesPage() {
  const { role } = useMockRole();
  const isTeacher = role === "profesor";

  if (isTeacher) {
    const mine = COURSES.filter((c) => TEACHER_COURSE_IDS.includes(c.id));
    return (
      <PanelPage title="Mis cursos" description="Secciones en las que das clase este año escolar.">
        <Grid container spacing={2.5}>
          {mine.map((c) => (
            <Grid key={c.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <CourseCard course={c} subjects={TEACHER_SUBJECTS[c.id]} />
            </Grid>
          ))}
        </Grid>
      </PanelPage>
    );
  }

  return (
    <PanelPage
      title="Cursos y secciones"
      description={`${COURSES.length} secciones y ${COURSES.reduce((s, c) => s + c.students, 0)} estudiantes en el año escolar 2026-2027.`}
      actions={
        <Button variant="contained" startIcon={<AddIcon />}>
          Nueva sección
        </Button>
      }
    >
      {LEVELS.map((level) => (
        <Box key={level} component="section" aria-labelledby={`nivel-${level}`}>
          <Typography id={`nivel-${level}`} variant="h6" component="h2" sx={{ mb: 1.5 }}>
            {level}
          </Typography>
          <Grid container spacing={2.5}>
            {COURSES.filter((c) => c.level === level).map((c) => (
              <Grid key={c.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <CourseCard course={c} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </PanelPage>
  );
}
