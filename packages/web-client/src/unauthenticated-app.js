/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";

import {
  Input,
  Button,
  Spinner,
  FormGroup,
  ErrorMessage,
} from "./components/lib";
import { Modal, ModalContents, ModalOpenButton } from "./components/modal";
import { Logo } from "./components/logo";
import { useAuth } from "./context/auth-context";
import { useAsync } from "./hooks/hooks";

function LoginForm({ onSubmit, submitButton }) {
  const { isLoading, isError, error, run } = useAsync();
  function handleSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;

    run(
      onSubmit({
        username: username.value,
        password: password.value,
      })
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        "> div": {
          margin: "10px auto",
          width: "100%",
          maxWidth: "300px",
        },
      }}
    >
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>
        {React.cloneElement(
          submitButton,
          { type: "submit" },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null
        )}
      </div>
      {isError ? <ErrorMessage error={error} /> : null}
    </form>
  );
}

function AuthScreen() {
  const { login } = useAuth();
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Logo width="80" height="80" />
      <h1>Form Builder</h1>
      <Modal>
        <ModalOpenButton>
          <Button variant="primary">Login</Button>
        </ModalOpenButton>
        <ModalContents aria-label="Login form" title="Login">
          <LoginForm
            onSubmit={login}
            submitButton={<Button variant="primary">Login</Button>}
          />
        </ModalContents>
      </Modal>
    </div>
  );
}

export default AuthScreen;
