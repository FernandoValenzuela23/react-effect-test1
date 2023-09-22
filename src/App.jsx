import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'

const CAT_RANDOM_FACT_URL = 'https://catfact.ninja/fact'
const CAT_IMAGE_URL = 'https://cataas.com/cat/says/'

export const App = () => {
    const [fact, setFact] = useState('');
    const [imgUrl, setImgUrl] = useState('');

    /* TODO EN UN SOLO EFFECT
    useEffect(() => {
      // happy path
        //   fetch(CAT_RANDOM_FACT_URL)
        //   .then(res => res.json())
        //   .then(data => setFact(data.fact))
    

      // With async/await
      async function getRandomFact() {
        const res = await fetch(CAT_RANDOM_FACT_URL);
        const json = await res.json();
        const {fact} = json;
        setFact(fact);

        //const firstWord = fact.split(' ').slice(0, 3).join(' ')  //Three initial words OR
        //const firstWord = fact.split(' ', 3).join(' ') 
        const firstWord = fact.split(' ')[0]

        const res2 = await fetch(`${CAT_IMAGE_URL}${firstWord}`)
        const {url} = res2; 
        setImgUrl(url)
        console.log(imgUrl)

      }

      getRandomFact();

    }, []);
    */

    useEffect(() => {

        async function getRandomFact() {
          const res = await fetch(CAT_RANDOM_FACT_URL);
          const json = await res.json();
          const {fact} = json;
          setFact(fact);
        }
  
        getRandomFact();
  
      }, []);


    useEffect(() => {
        async function getCatImage() {
            if(!fact) return;
            const firstWord = fact.split(' ')[0]
  
            const res2 = await fetch(`${CAT_IMAGE_URL}${firstWord}`)
            const {url} = res2; 
            setImgUrl(url)
            console.log(imgUrl)
        }

        getCatImage();
          
    }, [fact]);
    

  return (
    <main className='main'>
        <h1>App testing</h1>
        { fact && <p><strong>Fact:</strong> {fact}</p> }
        {imgUrl && imgUrl !== '' && <img src={imgUrl} alt={imgUrl} />}
    </main>
  )
}

