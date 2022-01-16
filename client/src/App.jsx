import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import Search from "./views/Search";
import Nav from "./components/Nav/Nav";
import WebFont from "webfontloader";
import Player from "./components/Player/Player";
import { data } from "autoprefixer";
import { io } from "socket.io-client";
import { dummy, searchDummy } from "./data";

// const socket = io.connect("http://localhost:1337/");
const socket = io.connect("http://localhost:1337");

function App() {
  const [queues, setQueues] = useState(null);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Inter"],
      },
    });
    setQueues(dummy);

    socket.on("connect", () => {
      console.log(`user connected with id: ${socket.id}`);
    });

    socket.on("naniyo", (msg) => {
      console.log(msg);
    });

    socket.on("nice", (msg) => {
      alert(msg);
    });
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

  const emitSomething = () => {
    socket.emit("ohyonk", "nanidesu");
  };

  const addNew = () => {
    socket.emit("added-new", {
      uuid: 1234,
      url: "https://www.youtube.com/watch?v=wt8ES0ffy_o",
      title: "Build a Simple Chat App With Socket.io and React",
      channel: "Darwin Tech",
    });
  };

  return (
    <div className="App font-sans">
      <div className="md:container md:mx-auto sm:w-12/12 md:w-930 rounded-lg bg-white border-slate-500 mt-5 shadow-zinc-300 shadow-md">
        <Router>
          {/* <Player playing={queues[0]} handleNextQueue={handleNextQueue} /> */}
          <button onClick={() => emitSomething()}>Emit This Button</button>
          <br />
          <button onClick={() => addNew()}>Add New Item</button>
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
