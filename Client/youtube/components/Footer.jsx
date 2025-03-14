import { useCart } from "../src/context/CartContext"

export default function () {
    const { LightMode } = useCart()
    return (
        <footer className={`px-3 pt-4 lg:px-9 border-t-2 max-md:mb-16 ${LightMode ? "bg-dark text-white" : "bg-gray-100 text-dark"}`}>
            <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">

                <div className="sm:col-span-2">
                    <a href="#" className="inline-flex items-center">
                        <img src={`${LightMode ? "https://img.icons8.com/?size=100&id=44112&format=png&color=000000" : "https://www.svgrepo.com/show/447858/youtube-play.svg"}`} alt="logo" className="h-12 w-12" />
                        <span className={`ml-2 text-xl font-bold tracking-wide text-${LightMode ? "white" : "gray-800"}`} >Youtube E-com</span>
                    </a>
                    <div className="mt-6 lg:max-w-xl">
                        <p className={`text-sm  text-${LightMode ? "white" : "gray-800"}`}>
                            We are a small business dedicated to helping clients enhance their digital presence through beautifully designed thumbnails and high-quality stock videos. Our creative team works closely with you to understand your vision and deliver customized visuals that captivate and engage your audience.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 text-sm">
                    <p className={`text-base font-bold tracking-wide text-${LightMode ? "white" : "gray-900"}`}>Popular Courses</p>
                    <a href="#">Thumbnail Designing</a>
                    <a href="#">Podcast Making</a>
                    <a href="#">Video Search Optimization</a>
                </div>

                <div>
                    <p className={`text-base mb-3 font-bold tracking-wide text-${LightMode ? "white" : "gray-900"}`}>OUR COMPANY IS ALSO AVAILABLE ON</p>
                    <div className="flex items-center gap-1 px-2">
                        <a href="#" className="w-full min-w-xl">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png" alt="Playstore Button"
                                className="h-10" />
                        </a>
                        <a className="w-full min-w-xl" href="https://www.youtube.com/channel/UCo8tEi6SrGFP8XG9O0ljFgA">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg" alt="Youtube Button"
                                className="h-12" />
                        </a>
                    </div>
                    <div className="mt-2">
                        <p className={`text-base font-bold tracking-wide text-${LightMode ? "white" : "gray-900"}`}>Contacts</p>
                        <p className={`mr-1 text-${LightMode ? "white" : "gray-800"}`}>Email: <a href="#" title="send email">youtubeEcom@gmail.com</a></p>

                    </div>
                </div>

            </div>

            <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
                <p className={`text-sm text-${LightMode ? "white" : "gray-600"}`}>&copy;Copyright {new Date().getFullYear()} Company. All rights reserved.</p>
                <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                    <li>
                        <a href="#"
                            className={`text-sm text-${LightMode ? "white" : "gray-800"} transition-colors duration-300 hover:text-deep-purple-accent-400`}>Privacy
                            &amp; Cookies Policy
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            className={`text-sm text-${LightMode ? "white" : "gray-600"} transition-colors duration-300 hover:text-deep-purple-accent-400`}>Disclaimer
                        </a>
                    </li>
                </ul>
            </div>

        </footer>
    )
}