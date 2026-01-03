// 1. Make the function async
export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    
    // 2. Await the params object
    const resolvedParams = await params;
    const id = resolvedParams.id;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>profile</h1>
            <hr />
            <p className="text-4xl">Profile page 
                <span className="p-2 rounded bg-orange-500 text-black">{id}</span>
            </p>
        </div>
    );
}