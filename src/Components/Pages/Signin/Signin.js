import {
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Stack,
  useBreakpointValue,
  FormControl,
  useDisclosure,
  chakra,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";

import * as React from "react";
import { SiKasasmart } from "react-icons/si";

import { useNavigate } from "react-router";

export const Signin = (props) => {
  const { isOpen } = useDisclosure();

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (data) {
      sessionStorage.setItem("userName", data.email.toLowerCase());
      navigate("/welcome-page", { replace: true });
    } else {
      return false;
    }
  };

  return (
    <Container
      maxW="lg"
      py={{
        base: "12",
        md: "24",
      }}
      px={{
        base: "0",
        sm: "8",
      }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Center>
            <Heading>EXL</Heading>
          </Center>

          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <Heading
              size={useBreakpointValue({
                base: "xs",
                md: "sm",
              })}
            >
              Log in to your account
            </Heading>
          </Stack>
        </Stack>
        <chakra.form onSubmit={handleSubmit(onSubmit)} {...props}>
          <Stack spacing="6">
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                {...register("email", { required: true })}
                type="email"
                autoComplete="email"
                required
              />
            </FormControl>
            <FormControl id="password">
              <InputGroup>
                <Input
                  name="password"
                  type={isOpen ? "text" : "password"}
                  autoComplete="current-password"
                  {...register("password", { required: true })}
                  required
                  {...props}
                />
              </InputGroup>
            </FormControl>
            <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
              Sign in
            </Button>
          </Stack>
        </chakra.form>
      </Stack>
    </Container>
  );
};
