import { FC } from "react";
import { CssBaseline, Grid, Paper } from "@mui/material";
import { AuthPageCarousel } from "./components/carousel";
import { AuthPageForm } from "./components/form";
type Props = {};

export const AuthPage: FC<Props> = ({}) => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className="overflow-hidden">
        <AuthPageCarousel />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <AuthPageForm
          onRememberMeChecked={(checked) => console.log(checked)}
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      </Grid>
    </Grid>
  );
};
