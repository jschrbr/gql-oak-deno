import { React, ReactDOMServer } from "../deps.ts";

const loadingEl = React.createElement("h1", null, "Loading...");
export const loading = ReactDOMServer.renderToString(loadingEl);

const App = () => {
  const [count, setCount] = React.useState(0);
  const [paddingGarden, setPadding] = React.useState("37px");

  const garden = {
    height: "auto",
    fontSize: "50px",
    padding: paddingGarden,
    width: "100%",
    alignSelf: "center",
  };

  return (
    <div className="pure-g pure-u center-align">
      <h2>My DenoReact App</h2>
      <a
        className="waves-effect waves-light btn"
        onClick={() => {
          setCount(count + 1);
          setPadding("0px");
        }}
      >
        Add a 🦕 in your garden!
      </a>

      <div className="row left-align">
        <div className="col s12 m2"></div>
        <div className="col s12 ml8">
          <div className="card green darken-1">
            <div className="card-content white-text">
              <p style={garden}>
                {Array(count).fill(<span>🦕</span>)}
              </p>
            </div>
          </div>
        </div>
        <div className="col s12 m2"></div>
      </div>
    </div>
  );
};

export default App;
