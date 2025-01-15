import axios from 'axios';
import { useEffect, useState } from 'react';
import { ICharacter } from '../CharacterConstants/CharacterConstants';

function useCharacter() {
  const [data, setData] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get<{ results: ICharacter[] }>('https://rickandmortyapi.com/api/character');
        setData(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error', error);
        setLoading(false);
        setData([]);
      }
    };
    fetch();
  }, []);
  return { data, loading, setData };
}

export default useCharacter;
