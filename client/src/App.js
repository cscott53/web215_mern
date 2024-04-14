import { useState, useEffect, useRef } from 'react'
import './App.css'
import Footer from './Footer'
import ContestList from './ContestList'
import Contest from './Contest'
function App() {
  const [data,setData] = useState([]),
        [page,setPage] = useState('contestList'),
        [id,setId] = useState(''),
        [formSHowing,showForm] = useState(false),
        newName = useRef(),
        category = useRef(),
        description = useRef()
  useEffect(() => {
    fetch('http://localhost:3000/api/contests')
    .then(res=>res.text())
    .then(obj=>{
      setData(JSON.parse(obj))
    })
    .catch(console.log)
  }, [id])
  useEffect(() => {
    window.onpopstate = ({state}) => {
      let newPage = state?.contestId ? 'contest' : 'contestList'
      setPage(newPage)
      setId(state?.contestId)
    }
  }, [])
  useEffect(()=>{
    if (window.location.href.includes('contest/')) {
      let contest = window.location.href.split('contest/')[1]
      setTimeout(()=>document.getElementById(contest)?.click(), 100)
    }
  },[])
  function pageContent(){
    switch (page) {
      case 'contestList':
        return <ContestList data={data} onContestClick={contestId=>{
          window.history.pushState({contestId},'',`/contest/${contestId}`)
          setPage('contest')
          setId(contestId)
        }} />
      case 'contest':
        return <Contest id={id} setPage={setPage}/>
    }
  }
  return (
    <div className='App'>
      {pageContent()}
      {formSHowing ? (
        <form>
          <input type='text' placeholder='Contest name' ref={newName}/>
          <br/>
          <input type='text' placeholder='Contest category' ref={category}/>
          <br/>
          <textarea placeholder='Contest description' ref={description}/>
          <br/>
          <button onClick={e=>{
            e.preventDefault()
            fetch('http://localhost:3000/api/contests',{
              method: 'POST',
              headers: {
                'Content-Type':'application/json',
                source: 'frontend',
              },
              body: JSON.stringify({
                name: newName.current.value,
                category: category.current.value,
                description: description.current.value
              })
            }).then(console.log).catch(console.error)
            showForm(false)
          }}>Submit</button>
        </form>
      ) : page == 'contestList' && <a href='/' onClick={e=>{
        e.preventDefault()
        showForm(true)
      }}>Add new contest</a>}
      <Footer/>
    </div>
  )
}

export default App
