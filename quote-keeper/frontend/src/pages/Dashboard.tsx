import Quote from "../components/Quote"

const Dashboard = () => {
  return (
    <div className="flex flex-col px-4 mt-4 h-screen bg-[#F0F4F8] text-[#223849]">
        <h1 className="font-bold text-xl">Hi user, welcome to your dashboard</h1>
        <p>Access your favourite quotes here</p>
        <div className="mt-8 flex flex-wrap justify-center items-center">
            <Quote />
            <Quote />
            <Quote />
            <Quote />
            <Quote />
        </div>
    </div>
  )
}

export default Dashboard