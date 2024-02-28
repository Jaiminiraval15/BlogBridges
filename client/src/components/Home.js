
export default function Home(){

    return (
        <>
        <section className="section bg-light">
        <div className="container">
            <div className="row align-items-stretch retro-layout">
                <div className="col-md-4">
                    <div className="h-entry mb-30 v-height gradient">
                        <div className="featured-img" style={{backgroundImage: `url(images/img_6_horizontal.jpg)`}}></div>
                        <div className="text">
                            <span className="date">Apr. 14th, 2022</span>
                            <h2>AI can now kill those annoying cookie pop-ups</h2>
                        </div>
                    </div>
                    <div className="h-entry v-height gradient">
                        <div className="featured-img" style={{backgroundImage: `url(images/img_5_horizontal.jpg)`}}></div>
                        <div className="text">
                            <span className="date">Apr. 14th, 2022</span>
                            <h2>Don’t assume your user data in the cloud is safe</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="h-entry img-5 h-100 gradient">
                        <div className="featured-img" style={{backgroundImage: `url(images/img_1_vertical.jpg)`}}></div>
                        <div className="text">
                            <span className="date">Apr. 14th, 2022</span>
                            <h2>Why is my internet so slow?</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="h-entry mb-30 v-height gradient">
                        <div className="featured-img" style={{backgroundImage: `url(images/img_3_horizontal.jpg)`}}></div>
                        <div className="text">
                            <span className="date">Apr. 14th, 2022</span>
                            <h2>Startup vs corporate: What job suits you best?</h2>
                        </div>
                    </div>
                    <div className="h-entry v-height gradient">
                        <div className="featured-img" style={{backgroundImage: `url(images/img_4_horizontal.jpg)`}}></div>
                        <div className="text">
                            <span className="date">Apr. 14th, 2022</span>
                            <h2>Thought you loved Python? Wait until you meet Rust</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div className="section bg-light">
    <div className="container">


        <div className="row align-items-stretch retro-layout-alt">

            <div className="col-md-5 order-md-2">
                <div className="hentry img-1 h-100 gradient">
                    <div className="featured-img" style={{backgroundImage: "url('images/img_2_vertical.jpg')"}}></div>
                    <div className="text">
                        <span>February 12, 2019</span>
                        <h2>Meta unveils fees on metaverse sales</h2>
                    </div>
                </div>
            </div>

            <div className="col-md-7">

                <div className="hentry img-2 v-height mb30 gradient">
                    <div className="featured-img" style={{backgroundImage: "url('images/img_1_horizontal.jpg')"}}></div>
                    <div className="text text-sm">
                        <span>February 12, 2019</span>
                        <h2>AI can now kill those annoying cookie pop-ups</h2>
                    </div>
                </div>

                <div className="two-col d-block d-md-flex justify-content-between">
                    <a className="hentry v-height img-2 gradient">
                        <div className="featured-img" style={{backgroundImage: "url('images/img_2_sq.jpg')"}}></div>
                        <div className="text text-sm">
                            <span>February 12, 2019</span>
                            <h2>Don’t assume your user data in the cloud is safe</h2>
                        </div>
                    </a>
                    <a  className="hentry v-height img-2 ms-auto float-end gradient">
                        <div className="featured-img" style={{backgroundImage: "url('images/img_3_sq.jpg')"}}></div>
                        <div className="text text-sm">
                            <span>February 12, 2019</span>
                            <h2>Startup vs corporate: What job suits you best?</h2>
                        </div>
                    </a>
                </div>  

            </div>
        </div>

    </div>
</div>

</>
    )
}
