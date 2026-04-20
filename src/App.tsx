import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Birthday from "@/pages/Birthday";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Birthday} />
      <Route path="*">
        <Birthday />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
