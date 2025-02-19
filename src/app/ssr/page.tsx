import {fetchData} from "@/api/ssr/fetchData"

export interface IPost{
    userId: number;
    id: number;
    title:string;
    body: string;
}

export default async function SSRPage(){
    const posts = await fetchData<IPost[]>();
    return(
        <>
          {  posts?.map((post: IPost, index: number) =>{
                return(
                    <h1 key={index}>
                        {post?.title}
                    </h1>
                )
            })}
        </>
    )
}