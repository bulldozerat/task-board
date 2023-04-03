import BoardContainer from 'features/Board/BoardContainer'
import MainModalContainer from 'features/MainModal/MainModalContainer'
import TopNavigationContainer from 'features/TopNavigation/TopNavigationContainer'

function App() {
  return (
    <div className="app">
      <TopNavigationContainer />
      <BoardContainer />
      <MainModalContainer />
    </div>
  )
}

export default App
