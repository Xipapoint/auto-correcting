import { useState } from 'react'
import SearchBar from './Input/SearchBar';
import { calculate_distances } from '../../features/Wagner-Fisher';
import { words } from '../../dictionary';
import AutoCorrectingWord from './Word/AutoCorrectingWord';
import { WORD_TYPE } from './types';
import styles from './Search.module.scss'

function Search() {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    function lev_distance_total(s1: string, s2: string): number {
        const matrix = calculate_distances(s1, s2);
        return matrix[s1.length][s2.length];
    }
    function defineWordLanguage(word: string): WORD_TYPE[]{
        let type: WORD_TYPE[];
        if(/[a-zA-Z]/i.test(word)) type = ['English']
        else if(/[іІїЇєЄґҐ']/i.test(word)) type = ['Ukrainian']
        else type = ['Russian', 'Ukrainian']
        return type
    }   
    const findCorrections = (word: string) => {
        const distances: { word: string, distance: number }[] = [];
        const languages: WORD_TYPE[] = defineWordLanguage(word)
    
        words.get(languages[0])?.forEach((isCorrect, correctWord) => {
          const distance = lev_distance_total(word, correctWord);
          if(correctWord[0] === word[0]) distances.push({ word: correctWord, distance });
        });
        words.get(languages[1])?.forEach((isCorrect, correctWord) => {
            const distance = lev_distance_total(word, correctWord);
            if(correctWord[0] === word[0]) distances.push({ word: correctWord, distance });
        });
    
        distances.sort((a, b) => a.distance - b.distance);
        return distances.slice(0, 3).map(item => item.word);
      };
    
      const handleQueryChange = (query: string) => {
        if (query) {
          const corrections = findCorrections(query);
          setSuggestions(corrections);
        } else {
          setSuggestions([]);
        }
      };
      const handleWordSelect = (correction: string) => {
        setInputValue(correction)
        setSuggestions([])
      }

  return (
    <div className={styles.searchBox}>
        <SearchBar value={inputValue} onQueryChange={handleQueryChange} placeholder='Type a word'></SearchBar>
        <div className={styles.correction}>
            {suggestions.map((suggestion, index) => (
                <AutoCorrectingWord onClick={handleWordSelect} key={index} correction={suggestion} />
            ))}
        </div>

    </div>


  )
}

export default Search
