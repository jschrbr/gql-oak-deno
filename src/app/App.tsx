import { React, ReactDOMServer } from "../deps.ts";

const loadingEl = React.createElement("h1", null, "Loading...");
export const loading = ReactDOMServer.renderToString(loadingEl);

const App = () => {
  const [count, setCount] = React.useState(1);
  const [paddingGarden, setPadding] = React.useState("37px");
  const [dinos, setDinos] = React.useState(<span></span>);

  const garden = {
    height: "auto",
    fontSize: "50px",
    padding: paddingGarden,
    width: "100%",
    alignSelf: "center",
  };

  const getParts = async (): Promise<void> => {
    console.log("hello");
    const url = "/graphql";
    const resolver = `    {
      getParts{
              name
              id
              quantity
          }
  }`;
    const query = { query: resolver };
    const data = await (await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    })).json();
    console.log(data);
  };

  const getDinos = async () => {
    const dinos = Array(count).fill(0);
    return dinos.map((din, i) => {
      console.log("poop");

      return (
        <span key={i}>🦕</span>
      );
    });
  };
  return (
    <div className="pure-g pure-u center-align">
      <h2>My DenoReact App</h2>
      <a
        className="waves-effect waves-light btn"
        onClick={async () => {
          setCount(count + 1);
          setPadding("0px");
          getParts();
          setDinos(await getDinos() as any);
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
                {dinos}
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
