import ContestPreview from "./ContestPreview";
import Header from "./Header";

export default function ContestList({data, onContestClick}) {
    return (
        <>
        <Header message='Naming Contests'/>
        <div className='contestList'>
        {data.map(contest=>(
            <ContestPreview contest={contest} onClick={onContestClick}/>
            ))}
        </div>
        </>
    )
}