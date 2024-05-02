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
        description = useRef(),
        host = window.location.host,
        url = `${host.includes('localhost') ? 'http' : 'https'}://${host}/api/contests`
  useEffect(() => {
    fetch(url)
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
    if (window.location.href.includes('contest/')) {
      let contest = window.location.href.split('contest/')[1].split('?')[0]
      setTimeout(()=>document.getElementById(contest)?.click(), 100)
    }
    if (window.location.href.includes('username=')) {
      let username = window.location.href.split('username=')[1]
      document.cookie = `loggedin=true; expires=${(date=>{
        date.setDate(date.getDate()+7)
        return date.toString()
      })(new Date)}; path=/`
      document.cookie = `username=${username}; expires=${(date=>{
        date.setDate(date.getDate()+7)
        return date.toString()
      })(new Date)}; path=/`
    }
    if (document.cookie.includes('username=')) {
      let data = document.cookie.split(';')
      let username = data.find(e=>e.includes('username'))?.split('=')[1]
      if (username) {
        document.querySelectorAll('header .links a')
        .forEach(a=>a.href+=`?username=${username}`)
      }
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
        return <Contest url={url.replace('contests',`contest/${id}`)} id={id} setPage={setPage}/>
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
          <button className='submit' onClick={e=>{
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
