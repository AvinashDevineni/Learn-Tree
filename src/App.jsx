import { useRef, useState } from 'react';

import UrlSubmit from './pages/0_UrlInput/UrlSubmit.jsx';
import UrlError from './pages/0_UrlInput/UrlError.jsx';
import Generation from './pages/1_Generation/Generation.jsx';
import LearnTree from './pages/2_LearnTree/LearnTree.jsx';

import API_URL from './constants.js';

import './App.css';

export default function App() {
  const [isUrlSubmitVisible, setIsUrlSubmitVisible] = useState(true);
  const [isUrlErrorVisible, setIsUrlErrorVisible] = useState(false);
  const [isGenerationVisible, setIsGenerationVisible] = useState(false);
  const [isLearnTreeVisible, setIsLearnTreeVisible] = useState(false);

  const [videoTopics, setVideoTopics] = useState([]);
  
  const ytVideoUrl = useRef('');
  const abortController = useRef();

  return (
    <>
      {!isLearnTreeVisible && <h1 id='mainTitle'>Learn Tree</h1>}
      {
        isUrlSubmitVisible &&
        <>
          <UrlSubmit isValidUrl={url => new RegExp(/(https:\/\/)?(www\.)?youtube\.com\/watch\?v=.+/).test(url)}
          onValidSubmit={url => {
            setIsUrlSubmitVisible(false);
            setIsGenerationVisible(true);
            ytVideoUrl.current = url;
          }} onInvalidSubmit={_ => setIsUrlErrorVisible(true)}/>
        </>
      }
      {isUrlErrorVisible && <UrlError onOkClick={() => setIsUrlErrorVisible(false)}/>}
      {
        isGenerationVisible &&
        <>
          <Generation onInit={() => {
            let finalUrl = `${API_URL}?url=${ytVideoUrl.current}`;
            abortController.current = new AbortController();
            const signal = abortController.current.signal;

            fetch(finalUrl, {signal}).then(res => res.json())
            .then(res => {
              setIsGenerationVisible(false);
              setIsLearnTreeVisible(true);

              let topics = [];
              for (let topic of res.topics)
                topics.push(topic);

              setVideoTopics(topics);
            }).catch(error => console.error(error));
          }}
          onInitCleanup={() => abortController.current.abort()}/>
        </>
      }
      {
        isLearnTreeVisible &&
        <>
          <LearnTree videoUrl={ytVideoUrl.current} topics={videoTopics} nodeWidth={150}
           onRegenerate={() => {
            setIsLearnTreeVisible(false);
            setIsGenerationVisible(true);
           }}
           onReset={() => {
            setIsLearnTreeVisible(false);
            setIsUrlSubmitVisible(true);
           }}/>
        </>
      }
    </>
  );
}