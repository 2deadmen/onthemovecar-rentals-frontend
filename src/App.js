import Layout from "./components/Layout/Layout";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <Layout />
    </DataProvider>
  );
}

export default App;
