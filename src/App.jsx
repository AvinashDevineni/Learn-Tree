import { useEffect, useRef, useState } from 'react'

import UrlSubmit from './UrlSubmit';
import UrlError from './UrlError';
import Generation from './Generation';
import LearnTree from './LearnTree';
import apiUrl from './constants';

import './App.css'

export default function App() {
  const [pageIdx, setPageIdx] = useState(0);
  const [isUrlErrorVisible, setIsUrlErrorVisible] = useState(false);
  const [videoTopics, setVideoTopics] = useState([]);
  
  const ytVideoUrl = useRef('');
  const hasSentRequest = useRef(false);

  const pages = useRef([
    <>
      <UrlSubmit isValidUrl={url => new RegExp(/(https:\/\/)?(www\.)?youtube\.com\/watch\?v=.+/).test(url)}
      onValidSubmit={url => {
        setPageIdx(1);
        ytVideoUrl.current = url;
      }} onInvalidSubmit={url => setIsUrlErrorVisible(true)}/>
    </>,
    <>
      <Generation onInit={() => {
        if (hasSentRequest.current)
          return;

        hasSentRequest.current = true;

        fetch(`${apiUrl}?url=${ytVideoUrl.current}`)
        .then(res => res.json()).then(res => {
          setVideoTopics(res.topics);
          hasSentRequest.current = false;
          setPageIdx(2);
        }).catch(error => console.error(error));
      }}/>
    </>,
    <>
      <LearnTree topics={videoTopics}/>
    </>
  ]);

  return (
    <>
      {pages.current[pageIdx]}
      {isUrlErrorVisible && <UrlError/>}
    </>
  )
}