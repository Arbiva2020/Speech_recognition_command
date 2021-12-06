import React, { useState } from "react";
import "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import Blog from "./Blog";
import NewBlogPost from "./NewBlogPost";
// import { BrowserRouter, Routes, Route, Link, Navigate, Router } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '../App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

function App() {
//the voice commands are an array of objects:
const commands = [{
  command: ["Go to *", "Open *"],
  callback: (redirectPage) => setRedirectUrl(redirectPage),
},

{
  command: "change background colour to *",
  callback: (color) => {
    document.body.style.backgroundColor = color;
  },
},

{
  command: "reset background colour",
  callback: () => {
    document.body.style.backgroundColor = `rgb(241, 241, 226)`;
  },
},
];
//astriks - where we want to go to (voice command)
const {transcript} = useSpeechRecognition({commands});
const {resetTranscript} = useSpeechRecognition();

//and as the state is concerned, for changing the route according to the voice command:
const [redirectUrl, setRedirectUrl] = useState("");
const [backgroundColor, setBackgroundColor] = useState("rgb(241, 241, 226)");

const pages = ["home", "blog", "new blog post", "contact"];

const urls = {
home: "/",
blog: "/blog",
contact: "/contact",
"new blog post": "/newBlogPost",
};

const colors = ["red", "blue", "yellow", "white", "green", "purple", "orange", "pink", "gray"];

const rgbs = {
  red: "rgb(214,28,28)",
  blue: "rgb(14,14,226)",
  yellow: "rgb(243,243,26)",
  white: "rgb(214,28,28)",
  green: "rgb(75,216,75)",
  purple: "rgb(129,25,129)",
  orange: "rgb(247,180,55)",
  pink: "rgb(255,192,203)",
  gray: "rgb(182,179,179)",
};

//because not all brousers support speech recognition, we dond whant our
//app to breake if our browser cant support the plugin, 
//so we ask it to return "null" if not supported:
if(!SpeechRecognition.browserSupportsSpeechRecognition) {
  return null;
}

let redirect = "";

if(redirectUrl) {
  if(pages.includes(redirectUrl)){
    redirect = <Redirect to={urls[redirectUrl]} />
  } else {
    redirect = <p>Could not find page: {redirectUrl.slice(0, length-1)}</p>;
  }
}



let colorChange = "";

if(backgroundColor) {
  if(colors.includes(backgroundColor)){
    colorChange = document.body.style.background(rgbs[backgroundColor]) 
  } else {
    colorChange = <p>Could not find color: {backgroundColor}</p>;
  }
}


  return (
    <div className="app">
<Router>
<div id="links">
  <Link to="/">Home</Link>
  <Link to="/contact">Contact</Link>
  <Link to="/blog">Blog</Link>
  <Link to="/newBlogPost">New blog post</Link>
  </div>
  <Switch>
  <Route path="/" exact component={Home} />
  <Route path="/home" component={Home} />
  <Route path="/newBlogPost" component={NewBlogPost} />
  <Route path="/blog" exact component={Blog} />
  <Route path="/contact" component={Contact} />
  </Switch>
  {redirect}
  </Router>

  <p id="transcript">Transcript container: {transcript.slice(0, length-1)}</p>
    
    <button onClick={SpeechRecognition.startListening}>Start</button>
    <button onClick={SpeechRecognition.stopListening}>Stop</button>
    </div>
  );
}

export default App;
