import { useState, type ChangeEvent } from "react"

const Quote = () => {
    const [quoteImgUrl, setQuoteImgUrl] = useState("/placeholder.svg")

    const handleQuoteImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setQuoteImgUrl(URL.createObjectURL(file));
        }
    };
    

  return (
    <div className="p-4 rounded-2xl shadow-lg bg-white m-2 md:w-[45%] lg:w-[30%]">
        <div className="relative">
            <button>
                <label htmlFor="image-upload" className="cursor-pointer">
                    <img src={quoteImgUrl} alt="Quote image" className="rounded-full mb-4 w-12 h-12 object-cover" />
                </label>
                <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleQuoteImgChange} />
            </button>
        </div>
        <h2 className="font-semibold text-lg">My Dearest</h2>
        <p className="text-gray-600 mt-2">All I need is Gil Chae. I will be by your side from now on. Even if you push me away, i will be here. Even if you get tired of me, i will be here.</p>
    </div>
  )
}

export default Quote