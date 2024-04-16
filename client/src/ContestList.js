import ContestPreview from "./ContestPreview";
import Header from "./Header";

export default function ContestList({data, onContestClick}) {
    return (
        <>
        <Header/>
        <h2 className='header'>Naming Contests</h2>
        <div className='contestList'>
        {data.map(contest=>(
            <ContestPreview contest={contest} onClick={onContestClick}/>
            ))}
        </div>
        </>
    )
}
