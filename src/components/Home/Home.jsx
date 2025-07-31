import './home.css';


const Home = () => {
    return (
        <section id="home" className="banner"> 
             <div className="text-center text-white">
                        <h1 className="text-2xl font-bold">EXPERT CARE FOR YOUR AIRCON NEEDS,</h1>
                        <h2 className="text-4xl font-bold mt-2">THAT’S OUR JOB!</h2>
                    </div> 
            <div className="flex flex-col items-center h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('./src/assets/background1.jpg')", opacity: 1,  }}>
                <div className="w-full bg-[#5A1A1A] py-4"> 
                </div>
            </div>
        </section>
    );
};

export default Home;
