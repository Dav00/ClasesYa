import { useState } from "react"
import {
  FormControl,
  Input,
  FormLabel,
  CircularProgress,
  IconButton,
} from "@chakra-ui/react"
import axios from "../lib/axios"
import AdList from "./adList"
import { HiSearch } from "react-icons/hi"

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const [ads, setAds] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const fetchAds = async (loadMore=false) => {
    if (query.length < 3) return

    if (!loadMore) (setAds())

    const { data } = await axios.post(`/ads/search?take=10&skip=${ads ? ads.length : 0}`, { query })
    
    setAds(ads?.length ? [...ads, ...data] : data)
    if(data.length < 10) setHasMore(false)
  }

  return (
    <>
      <div className="flex items-center gap-x-4">
        <FormControl>
          <FormLabel>Search Advertisments</FormLabel>

          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchAds()}
          />
        </FormControl>

        <IconButton colorScheme="blue" onClick={fetchAds} className="self-end">
          <HiSearch size="1.4rem" />
        </IconButton>
      </div>

      {ads === null ? (
        <></>
      ) : !ads ? (
        <CircularProgress />
      ) : (
        <AdList ads={ads} onLoadMore={()=>fetchAds(true)} Actions={() => <></>} hasMore={hasMore}/>
        
      )}
    </>
  )
}

export default SearchBar
