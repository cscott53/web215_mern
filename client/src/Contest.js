import { useEffect, useRef, useState } from "react"
import Header from "./Header"
export default function Contest({id,setPage}) {
    const [contest,setContest] = useState({}),
          input = useRef()
    useEffect(() => {
        fetch(`https://${window.location.host}/api/contest/${id}`).then(res=>res.json()).then(setContest).catch(console.log)
    }, [id])
    setTimeout(()=>window.contest=contest,200)
    return (
        <>
            <Header/>
            <h2 className='header'>{contest.contestName}</h2>
            <div className='contestDetail'>
                <h2 className='title'>Contest description</h2>
                <div className='description'>{contest.description}</div>
                <h2 className='title'>Proposed Names</h2>
                <div className='names'>
                    {contest.names?.length >= 1 ? (
                        <div className='list'>
                            {contest.names.map(({name,id})=>(
                                <div key={id} className='item'>
                                    <span className='name'>{typeof name == 'string' ? name : JSON.stringify(name)}</span>
                                    <span className='buttons'>
                                        <button className='update' id={`update-${id}`}>✏️</button>
                                        <button className='delete' id={`delete-${id}`}>🗑️</button>
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : 'No names proposed yet'}
                </div>
                <h2 className='title'>Propose a new name</h2>
                <form>
                    <input type='text' ref={input} id='newName' placeholder='New name here...'/>
                    <br/>
                    <button id='submit' className='submit' onClick={e=>{
                        e.preventDefault()
                        let {value} = input.current
                        fetch(`https://${window.location.host}/api/contest/${id}`,{
                            method: 'POST',
                            headers: {
                                'Content-Type':'application/json',
                                source: 'frontend'
                            },
                            body: JSON.stringify({value})
                        }).then(async res=>{
                            if (res.ok) {
                                let text = await res.text(),
                                    names = [...contest.names],
                                    updatedContest = {...contest}
                                names.push({name:value})
                                updatedContest.names = names
                                console.log(contest)
                                console.log(updatedContest)
                                setContest(updatedContest)
                                return text
                            } else {
                                console.error('Network request error')
                            }
                        })
                        .then(()=>{}).catch(console.error)
                    }}>Submit</button>
                </form>
            </div>
            <a href='/' style={{
                marginTop:'20px',
                display: 'inline-block'
            }} onClick={()=>{
                window.history.pushState({},'','/')
                setPage('contestList')
            }}>Back to contest list</a>
        </>
    )
}