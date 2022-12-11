import { Dispatch } from "react";

import { useState } from "react";
import { Input, Button, Flex, Heading, Checkbox, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import {useUserContext, DispatchType as UserAction} from "../hooks/LoginContext";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { status, login } = useUserContext();
  const disableUI = status.loading;

  const update =
    (setState: Dispatch<string>): React.ChangeEventHandler<HTMLInputElement> =>
    (e) =>
      setState(e.target.value);

  const submit = () => {
    login(username, password);
  };

  return (
    <Flex p={2} direction="column" alignItems="start" gap={4}>
      <Heading size="md">Login Facebook</Heading>
      <Input
        id="username"
        onChange={update(setUsername)}
        placeholder="Email, phone, ..."
        disabled={disableUI}
      />
      <Input
        id="password"
        type="password"
        onChange={update(setPassword)}
        placeholder="Password"
        disabled={disableUI}
      />
      <Checkbox defaultChecked>Save cookies</Checkbox>
      <Button isLoading={status.loading} onClick={submit} disabled={disableUI}>Login</Button>
      <Alert status="info" borderRadius={5}>
        <AlertIcon />
        <AlertDescription>
          We don't save your username and password.
        </AlertDescription>
      </Alert>
    </Flex>
  );
}

export default LoginForm;
