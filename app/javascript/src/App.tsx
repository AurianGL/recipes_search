import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import pages from "./pages";
import { PAGES } from "./constants/routes";
import { RecipeProvider } from "./contexts/recipe_context";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <div className="w-screen min-h-screen h-full bg-slate-900 text-slate-200">
      <Router>
        <NavBar/>
        <RecipeProvider>
          <Routes >
            {PAGES.map((page, index) => {
              const PageComponent = pages[page.Component];
              return (
                <Route key={index} path={page.url} element={<PageComponent />} />
              );
            })}
          </Routes>
        </RecipeProvider>
      </Router>
    </div>
  );
}

export default App;
