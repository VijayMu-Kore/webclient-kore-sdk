import React from "react";

import "./app.styles.scss";
import "../web-kore-sdk/UI/dist/kore-ai-sdk.min.css";
import("../web-kore-sdk/UI/dist/kore-ai-sdk.min.js").then((rawModule) =>
 {
   let scriptTag = document.createElement("script");
   scriptTag.textContent = rawModule.default;
   document.head.appendChild(scriptTag);
 }
);


class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        Webpack 5 boilerplate for react using babel, sass, with a hot dev server
        and an optimized production build.
      </div>
    );
  }
}
export default App;
