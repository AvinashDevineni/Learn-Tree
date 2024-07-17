import { useRef, useState } from 'react'

import UrlSubmit from './UrlSubmit';
import UrlError from './UrlError';

import './App.css'

export default function App() {
  const [pageIdx, setPageIdx] = useState(0);
  const [isUrlErrorVisible, setIsUrlErrorVisible] = useState(false);
  
  const pages = useRef([
    <>
      <UrlSubmit isValidUrl={url => new RegExp(/(https:\/\/)?(www\.)?youtube\.com\/watch\?v=.+/).test(url)}
      onValidSubmit={url => setPageIdx(1)} onInvalidSubmit={url => setIsUrlErrorVisible(true)}/>
    </>,
    <>
      <h1>
        WIP
      </h1>
    </>
  ]);

  return (
    <>
      {pages.current[pageIdx]}
      {isUrlErrorVisible && <UrlError/>}
    </>
  )
}