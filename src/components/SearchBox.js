import Turnstone from 'turnstone'
import recentSearchesPlugin from 'turnstone-recent-searches'

const styles = {
  input: 'w-full border py-2 px-4 text-lg outline-none rounded-md',
  listbox: 'bg-neutral-900 w-full text-slate-50 rounded-md',
  highlightedItem: 'bg-neutral-800',
  query: 'text-oldsilver-800 placeholder:text-slate-600',
  typeahead: 'text-slate-500',
  clearButton:
    'absolute inset-y-0 text-lg right-0 w-10 inline-flex items-center justify-center bg-netural-700 hover:text-red-500',
  noItems: 'cursor-default text-center my-20',
  match: 'font-semibold',
  groupHeading: 'px-5 py-3 text-pink-500',
}

const listbox = {
  displayField: 'characters',
  data: async (query) => {
    const res = await fetch(
      `https://voithy-dev-v1.azurewebsites.net/api/v1/general/search?name=${query}`
    )
    const data = await res.json()
    console.log(data.data.data)
    return data.data.data
  },
  searchType: 'startsWith',
}

const Item = ({ item }) => {
  console.log(item)
  return (
    <div className='flex items-center cursor-pointer px-5 py-4'>
      <p>{item.GenericName}</p>
    </div>
  )
}

const SearchBox = () => {
  return (
    <Turnstone
      id='search'
      name='search'
      autoFocus={true}
      typeahead={true}
      clearButton={true}
      debounceWait={250}
      listboxIsImmutable={true}
      maxItems={6}
      noItemsMessage="We couldn't find any character that matches your search"
      placeholder='Search for any med'
      listbox={listbox}
      styles={styles}
      Item={Item}
      plugins={[recentSearchesPlugin]}
     
    />
  )
}

export default SearchBox
