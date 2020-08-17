/** @jsx jsx */
import { jsx } from "@emotion/core";

import { Link as RouterLink } from "react-router-dom";
import styled from "@emotion/styled/macro";
import { keyframes } from "@emotion/core";
import * as colors from "styles/colors";
import * as mq from "styles/media-queries";
import { Dialog as ReachDialog } from "@reach/dialog";
import { FaSpinner } from "react-icons/fa";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

const CircleButton = styled.button({
  borderRadius: "30px",
  padding: "0",
  width: "40px",
  height: "40px",
  lineHeight: "1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: colors.base,
  color: colors.text,
  border: `1px solid ${colors.gray10}`,
  cursor: "pointer",
});

const ListUL = styled.ul({
  listStyle: "none",
  display: "grid",
  gridTemplateRows: "repeat(auto-fill, minmax(100px, 1fr))",
  gridGap: "1em",
  padding: "0",
});

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});
Spinner.defaultProps = {
  "aria-label": "loading",
};

const buttonVariants = {
  primary: {
    background: colors.indigo,
    color: colors.base,
  },
  secondary: {
    background: colors.gray,
    color: colors.text,
  },
};
const Button = styled.button(
  {
    padding: "10px 15px",
    margin: "5px",
    border: "0",
    lineHeight: "1",
    borderRadius: "3px",
  },
  ({ variant = "primary" }) => buttonVariants[variant]
);

const Select = styled.select({
  borderRadius: "3px",
  background: "#f1f2f7",
  padding: "12px 12px",
  border: "0",
});

const inputStyles = {
  border: "1px solid #f1f1f4",
  background: "#f1f2f7",
  padding: "8px 12px",
};

const Input = styled.input({ borderRadius: "3px" }, inputStyles);
const InputOutlined = styled.input({
  borderRadius: "3px",
  border: "2px solid #3f51b5",
  padding: "8px 12px",
  marginBottom: "5px",
});
const Textarea = styled.textarea(inputStyles);

const Dialog = styled(ReachDialog)({
  maxWidth: "450px",
  borderRadius: "3px",
  paddingBottom: "3.5em",
  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
  margin: "20vh auto",
  [mq.small]: {
    width: "100%",
    margin: "10vh auto",
  },
});

const FormGroup = styled.div({
  display: "flex",
  flexDirection: "column",
});

const Card = styled.div({
  border: "1px solid #dadce0",
  borderRadius: "8px",
  marginBottom: "12px",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
});

const WrapperCenter = styled.div({
  margin: "auto",
  maxWidth: "90vw",
  width: "640px",
  padding: "20px",
});

function FullPageSpinner() {
  return (
    <div
      css={{
        fontSize: "4em",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner />
    </div>
  );
}

const Link = styled(RouterLink)({
  color: colors.indigo,
  ":hover": {
    color: colors.indigoDarken10,
    textDecoration: "underline",
  },
});

const errorMessageVariants = {
  stacked: { display: "block" },
  inline: { display: "inline-block" },
};

function ErrorMessage({ error, variant = "stacked", ...props }) {
  return (
    <div
      role="alert"
      css={[{ color: colors.danger }, errorMessageVariants[variant]]}
      {...props}
    >
      <span>There was an error: </span>
      <pre
        css={[
          { whiteSpace: "break-spaces", margin: "0", marginBottom: -5 },
          errorMessageVariants[variant],
        ]}
      >
        {error.message}
      </pre>
    </div>
  );
}

function FullPageErrorFallback({ error }) {
  return (
    <div
      role="alert"
      css={{
        color: colors.danger,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  );
}

export {
  FullPageErrorFallback,
  ErrorMessage,
  CircleButton,
  ListUL,
  Card,
  WrapperCenter,
  Select,
  Spinner,
  Button,
  Input,
  InputOutlined,
  Textarea,
  Dialog,
  FormGroup,
  FullPageSpinner,
  Link,
};
