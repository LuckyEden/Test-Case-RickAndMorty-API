import fetcher from './fetcher'


const BASE_URL = import.meta.env.VITE_RICK_AND_MORTY_API_URL; 
class Client {
  headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  getRandomCharactersData(count: number = 12) {
    return fetcher<any>(`${BASE_URL}/rick-and-morty/random?count=${count}`, {
      headers: this.headers,
    })
  }

  getCharactersOptions() {
    return fetcher<any>(`${BASE_URL}/rick-and-morty/characters/options`, {
      headers: this.headers
    })
  }

  getCharacter(id: string | undefined) {
    if (!id) {
      return new Promise((resolve) => resolve({}))
    }
    return fetcher<any>(`${BASE_URL}/rick-and-morty/characters/${id}`, {
      headers: this.headers
    })

  }

  filterCharacters(query: string, skip: number = 0, limit: number = 12) {
    if (query === "") {
      return new Promise((resolve) => resolve([]))
    }
    return fetcher<any>(`${BASE_URL}/rick-and-morty/characters?${query}&skip=${skip}&limit=${limit}`, {
      headers: this.headers
    })
  }

  searchAll(query: string) {
    if (query === "") {
      return null
    }
    return fetcher<any>(`${BASE_URL}/rick-and-morty/search?query=${query}`, {
      headers: this.headers
    })
  }

  getEpisodes(skip: number = 0, limit: number = 12) {
    return fetcher<any>(`${BASE_URL}/rick-and-morty/episodes?skip=${skip}&limit=${limit}`, {
      headers: this.headers
    })
  }

  getEpisode(id: string | undefined) {
    if (!id) {
      return new Promise((resolve) => resolve({}))
    }
    return fetcher<any>(`${BASE_URL}/rick-and-morty/episodes/${id}`, {
      headers: this.headers
    })
  }

  handleHealthCheck() {
    console.log('BASE_URL', BASE_URL)
    return fetcher<any>(`${BASE_URL}/health-check`, {
      headers: this.headers
    })
  }
}

const client = new Client()

export { client }
