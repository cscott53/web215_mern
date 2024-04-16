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
    fetch(`https://${window.location.host}/api/contests`)
    .then(res=>{
      if (!res.ok) throw new Error('An error occured with the response') //in case it couldn't fetch the data
      return res.json()
    })
    .then(obj=>{
      setData(obj)
    })
    .catch(console.log)
  }, [id])
  useEffect(() => {
    window.onpopstate = ({state}) => {
      let newPage = state?.contestId ? 'contest' : 'contestList'
      setPage(newPage)
      setId(state?.contestId)
    }
    document.body.style.minHeight = '100vh' //had to set it with js since setting it with css caused  a bug where it wouldnt set the style until i opened/closed the  js console
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
            fetch(`https://${window.location.host}/api/contests`,{
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
      {['',setTimeout(()=>{
        let links = Array.from(document.querySelectorAll('.links'))
        links?.slice(0,links.length-1)?.forEach(e=>e.outerHTML+=' ')
        // just puts a whitespace character between each <span class="links"> element
      },250)][0]/*just returns an empty string*/}
    </div>
  )
}

export default App
