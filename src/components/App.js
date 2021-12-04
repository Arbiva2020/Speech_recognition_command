import react, { useState } from "react";
import Home from "./Home";
import Contact from "./Contact";
import Blog from "./Blog";
import NewBlogPost from "./NewBlogPost";
import { BrowserRouter, Routes, Route, Link, Navigate, Router } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '../App.css';
// import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

function App() {
//the voice commands are an array of objects:
const commands = [{
  command: ["Go to *", "Open *"],
  callback: (redirectPage) => setRedirectUrl(redirectPage),
},
];
//astriks - where we want to go to (voice command)
const {transcript} = useSpeechRecognition({commands});
//and as the state is concerned, for changing the route according to the voice command:
const [redirectUrl, setRedirectUrl] = useState("");

const pages = ["home", "blog", "new blog post", "contact"];

const urls = {
home: "/",
blog: "/blog",
contact: "/contact",
"new blog post": "/newBlogPost",
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
    redirect = <Navigate to={urls[redirectUrl]} />
  } else {
    redirect = <p>Could not find page: {redirectUrl}</p>
  }
  console.log(redirectUrl)
}


  return (
    <div className="app">
<BrowserRouter>
<div id="links">
  <Link to="/">Home</Link>
  <Link to="/contact">Contact</Link>
  <Link to="/blog">Blog</Link>
  <Link to="/newBlogPost">New blog post</Link>
  </div>
  <Routes>
  <Route path="/" exact component={Home} />
  <Route path="/home" component={Home} />
  <Route path="/newBlogPost" component={NewBlogPost} />
  <Route path="/blog" exact component={Blog} />
  <Route path="/contact" component={Contact} />
  </Routes>
  {redirect}
  </BrowserRouter>

  <p id="transcript">Transcript container: {transcript}</p>
    
    <button onClick={SpeechRecognition.startListening}>Start</button>

    </div>
  );
}

export default App;
