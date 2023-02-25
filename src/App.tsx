import Router from "./router";
import { StyledProvider } from "@team-return/design-system"

function App() {
  return (
    <>
      <StyledProvider>
        <Router />
      </StyledProvider>
    </>
  );
}

export default App;
