import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import pages from "./pages";
import { PAGES } from "./constants/routes";
import { RecipeProvider } from "./contexts/recipe_context";

function App() {
  return (
    <div className="w-full h-full bg-slate-900 text-slate-200">
      <Router>
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
