async function OrderDetailPage( {params} : { params: Promise<{slug: string}> }) {

    const slug = (await params).slug;
    
    return(
        <>
            <h1>
                Order Detail Page
                <p>
                {slug}
                </p>
            </h1>
        </>
    )
}

export default OrderDetailPage;