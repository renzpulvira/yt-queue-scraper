import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import Search from "./views/Search";
import Nav from "./components/Nav/Nav";
import WebFont from "webfontloader";
import Player from "./components/Player/Player";
import { data } from "autoprefixer";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Inter"],
      },
    });
  }, []);

  const dummy = [
    {
      uuid: 9822,
      url: "https://www.youtube.com/watch?v=BdnoZLFUVMU",
      title: "Bakit Di Ako Pinutok sa Kumot? (NANG/NG EXAM)",
      channel: "PaoLUL",
    },
    {
      uuid: 8492,
      url: "https://www.youtube.com/watch?v=wt8ES0ffy_o",
      title: "Rangle Talks: Redux Creator Dan Abramov",
      channel: "Rangle.io",
    },
    {
      uuid: 8909,
      url: "https://www.youtube.com/watch?v=NePLRa7Eh5k",
      title: "Disaster Food Reviews",
      channel: "penguinz0",
    },
    {
      uuid: 2232,
      url: "https://www.youtube.com/watch?v=Ntx_8_N6rUQ",
      title: "How Riot Beat Blizzard.",
      channel: "Atrioc",
    },
  ];

  const searchDummy = [
    {
      uuid: 8711,
      url: "https://www.youtube.com/watch?v=LoziivfAAjE",
      title: "Intro To Web Scraping With Node.js & Cheerio",
      channel: "Traversy Media",
    },
    {
      uuid: 2200,
      url: "https://www.youtube.com/watch?v=dXjKh66BR2U",
      title: "A Guide to Web Scraping With Node.js",
      channel: "Fireship",
    },
    {
      uuid: 9909,
      url: "https://www.youtube.com/watch?v=-3lqUHeZs_0",
      title: "Build a Web Scraper (super simple!)",
      channel: "Code with Ania Kubów",
    },
  ];

  const [queues, setQueues] = useState(null);

  useEffect(() => {
    setQueues(dummy);
  }, []);

  const handleNextQueue = () => {
    if (queues.length < 1) return;
    const copy = [...queues];
    copy.shift();
    setQueues(copy);
  };

  const removeInQueue = (index) => {
    if (queues.length < 1) return;
    const copy = [...queues];
    copy.splice(index, 1);
    setQueues(copy);
  };

  const handleMoveNext = (index) => {
    if (queues.length < 1) return;
    const copy = [...queues];
    const itemToMove = copy.splice(index, 1);
    const newCopy = [...itemToMove, ...copy];
    setQueues(newCopy);
  };

  const addNewQueue = (item) => {
    const copy = [...queues];
    copy.push(item);
    setQueues(copy);
  };

  console.log("loaded");

  return (
    <div className="App font-sans">
      <div className="md:container md:mx-auto sm:w-12/12 md:w-930 rounded-lg bg-white border-slate-500 mt-5 shadow-zinc-300 shadow-md">
        <Router>
          {/* <Player playing={queues[0]} handleNextQueue={handleNextQueue} /> */}
          <Nav handleNextQueue={handleNextQueue} playing={queues} />
          <Switch>
            <Route exact path="/">
              {queues === null ? (
                <p className="p-5">Loading...</p>
              ) : (
                <Home
                  data={queues}
                  removeInQueue={removeInQueue}
                  handleMoveNext={handleMoveNext}
                />
              )}
            </Route>
            <Route path="/search">
              <Search searchDummy={searchDummy} />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
