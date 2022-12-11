import "./App.css";
import { Grid, GridItem } from "@chakra-ui/react";
import { useUserContext } from "./hooks/LoginContext";
import LoginForm from "./components/LoginForm";
import SuccessLogin from "./components/SuccessLogin";

function App() {
  const { status } = useUserContext();
  return (
    <div id="App">
      <Grid gridTemplateColumns="1fr 3fr" gap={4} height="100vh">
        <GridItem>{status.login ? <SuccessLogin /> : <LoginForm />}</GridItem>
        <GridItem bg="papayawhip"></GridItem>
      </Grid>
    </div>
  );
}

export default App;
