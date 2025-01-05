import { useEffect, useState } from 'react'
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Details from './pages/Details';
const routes = [
  {
    path: "/",
    element: <Home />
  },{
    path: "/Details/:Title",
    element: <Details />
  }
]

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});
function App() {
 return (
  <div>
    <div>
      <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
      />
    </div>
  </div>
)}
export default App;
