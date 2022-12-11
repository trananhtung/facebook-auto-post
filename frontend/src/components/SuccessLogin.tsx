
import { Button, Flex, Heading, Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import { useUserContext } from "../hooks/LoginContext";

function SuccessLogin() {
  const { logout } = useUserContext();
  return (
    <Flex p={2} direction="column" alignItems="start" gap={4}>
      <Heading size="md">Welcome</Heading>
      <Alert status="success" borderRadius={5}>
        <AlertIcon />
        <AlertDescription>
          You login successfully.
        </AlertDescription>
      </Alert>
      <Button onClick={logout}>Logout</Button>
    </Flex>
  );
}

export default SuccessLogin;
