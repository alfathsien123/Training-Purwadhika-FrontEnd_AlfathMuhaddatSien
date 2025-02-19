import Link from 'next/link';
// import './globals.css';
import ListData from '@/components/ListData';

function Page() {
  return(
    <> 
      <h1 style={{color: 'red', fontSize:"200px"}}>Hello World</h1>
      <Link href="/dashboard" className='text-color-blue'>
        Go to Dashboard
      </Link>
      <ol>
        <ListData fruit="Mangga" price={12000}/>
        <ListData fruit="Sunkis" price={17000}/>
        <ListData fruit="Apel" price={23000}/>
      </ol>  
    </>
  )
}

export default Page;