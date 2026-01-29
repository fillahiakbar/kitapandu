"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";

import CustomTextField from "@/app/dashboard/components/forms/theme-elements/CustomTextField";
import { apiFetch } from "@/lib/api";

const AuthLogin = ({ title, subtitle, subtext }: any) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // ⬇️ SIMPAN TOKEN KE COOKIE
      document.cookie = `access_token=${res.data.token}; path=/;`;

      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <Stack>
        <Box>
          <Typography fontWeight={600} mb="5px">
            Email
          </Typography>
          <CustomTextField
            fullWidth
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </Box>

        <Box mt="25px">
          <Typography fontWeight={600} mb="5px">
            Password
          </Typography>
          <CustomTextField
            type="password"
            fullWidth
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </Box>

        <Stack direction="row" justifyContent="space-between" my={2}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup>
        </Stack>
      </Stack>

      <Button
        fullWidth
        size="large"
        variant="contained"
        disabled={loading}
        onClick={handleLogin}
      >
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      {subtitle}
    </>
  );
};

export default AuthLogin;
