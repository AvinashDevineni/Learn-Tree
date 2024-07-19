import { useRef, useState } from 'react';

import UrlSubmit from './UrlSubmit.jsx';
import UrlError from './UrlError.jsx';
import Generation from './Generation.jsx';
import LearnTree from './LearnTree.jsx';
import apiUrl from './constants.js';

import './App.css';

export default function App() {
  const [isUrlSubmitVisible, setIsUrlSubmitVisible] = useState(true);
  const [isUrlErrorVisible, setIsUrlErrorVisible] = useState(false);
  const [isGenerationVisible, setIsGenerationVisible] = useState(false);
  const [isLearnTreeVisible, setIsLearnTreeVisible] = useState(false);

  const [videoTopics, setVideoTopics] = useState([]);
  
  const ytVideoUrl = useRef('');
  const hasSentRequest = useRef(false);

  return (
    <>
      <h1 id='mainTitle'>Learn Tree</h1>
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
            if (hasSentRequest.current)
              return;
            hasSentRequest.current = true;

            fetch(`${apiUrl}?url=${ytVideoUrl.current}`)
            .then(res => res.json()).then(res => {
              setIsGenerationVisible(false);
              setIsLearnTreeVisible(true);

              setVideoTopics(res.topics);
              hasSentRequest.current = false;
            }).catch(error => console.error(error));
          }}/>
        </>
      }
      {
        isLearnTreeVisible &&
        <>
          <LearnTree topics={videoTopics}/>
        </>
      }
    </>
  );
}