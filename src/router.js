import Demo1 from "./pages/Demo1";
import Demo2 from "./pages/Demo2";
import Demo3 from "./pages/Demo3";
import Demo4 from "./pages/Demo4";
import Index from "./pages/Index";

const routes = [
    { 
      path: "/",
      element: <Index />,
    },
    { 
      path: "/demo1",
      element: <Demo1 />,
    },
    { 
      path: "/demo2",
      element: <Demo2 />,
    },
    { 
      path: "/demo3",
      element: <Demo3 />,
    },
    { 
      path: "/demo4",
      element: <Demo4 />,
    }
];
export default routes