/*import { useContext } from "react";
import DataContext from "./context/DataContext";*/
import Feed from "./Feed";
import { useStoreState } from "easy-peasy";



const Home = ({/* posts,*/ fetchError, isLoading }) => {
  /*const { searchResults }=useContext(DataContext);*/
  const posts=useStoreState((state)=>state.posts);
  const searchResults =useStoreState((state)=>state.searchResults);
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading post.....</p>}
      {!isLoading &&fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
      {!isLoading && !fetchError && (posts.length ? (
        <Feed posts={searchResults} />) : (
        <p className="statusMsg" style={{ marginTop: "2rem" }}>
          No post to display.
        </p>))}
    </main>
  )
}

export default Home
