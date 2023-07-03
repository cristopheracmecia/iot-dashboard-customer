import { FC } from "react";
import {
  Grid,
  Avatar,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Button,
  Link,
  Checkbox,
} from "@mui/material";
import AcmeIcon from "../../../assets/AICON.png";
import * as yup from "yup";
import { useFormValidation } from "../../../hooks/validation";

type Form = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: (values: Form) => void;
  onRememberMeChecked: (checked: boolean) => void;
};

export const AuthPageForm: FC<Props> = ({ onSubmit, onRememberMeChecked }) => {
  const { updateData, errors, valid, formData } = useFormValidation<Form>(
    yup.object({
      email: yup
        .string()
        .required("Ingresa un email")
        .email("Ingresa un email válido"),
      password: yup.string().required("Ingresa una contraseña"),
    }),
    { email: "", password: "" }
  );
  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "transparent" }}>
        <img src={AcmeIcon} />
      </Avatar>
      <Typography component="h1" variant="h5">
        Iniciar Sesión
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) onSubmit(formData);
        }}
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Correo electrónico"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={updateData}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={updateData}
          error={!!errors.password}
          helperText={errors.password}
        />
        <FormControlLabel
          onChange={(e) => {
            console.log(e);
          }}
          control={
            <Checkbox
              value="remember"
              color="primary"
              onChange={(e) => onRememberMeChecked(e.target.checked)}
            />
          }
          label="Mantener sesión iniciada"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!valid}
        >
          Iniciar Sesión
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              ¿Olvidaste tu contraseña? Click aquí
            </Link>
          </Grid>
        </Grid>
        <Typography
          variant="overline"
          display="block"
          gutterBottom
          className="mt-3"
        >
          ACME & CIA 2023
        </Typography>
      </Box>
    </Box>
  );
};
