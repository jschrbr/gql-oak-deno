import { React, ReactDOMServer } from "./deps.ts";
// // @deno-types="https://servestjs.org/@v1.1.0/types/react-dom/server/index.d.ts"
// import { Paper } from "https://cdn.pika.dev/@material-ui/core@^4.10.2";

// const NavBar = (): JSX.Element => {
//   return (
//     <Paper>
//       poop
//     </Paper>
//   );
// };
// declare global {
//   namespace JSX {
//     interface Elements {}
//     interface IntrinsicElements {
//       button: React.DetailedHTMLProps<
//         React.ButtonHTMLAttributes<HTMLButtonElement>,
//         HTMLButtonElement
//       >;
//       div: any;
//       h1: any;
//       h2: any;
//       p: any;
//       span: any;
//     }
//   }
// }

const loadingEl = React.createElement("h1", null, "Loading...");
export const loading = ReactDOMServer.renderToString(loadingEl);

const App = () => {
  const [count, setCount] = React.useState(0);

  const garden = {
    backgroundColor: "green",
    height: "auto",
    fontSize: "30px",
    maxWidth: "400px",
    padding: "20px 5px",
    width: "100%",
  };

  return (
    <div className="pure-g pure-u">
      <h2>My DenoReact App</h2>
      <button className="pure-button" onClick={() => setCount(count + 1)}>
        Add a 🦕 in your garden!
      </button>
      <p style={garden}>
        {Array(count).fill(<span>🦕</span>)}
      </p>
    </div>
  );
};

export default App;
